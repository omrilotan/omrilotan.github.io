process.on('unhandledRejection', error => console.error(error));

const {readdir, readFile, writeFile} = require('fs').promises;
const {resolve} = require('path');
const read = async file => (await readFile(file)).toString();
const phrase = require('paraphrase/double');
const reduce = require('await-reduce');
const marked = require('marked');
const {minify} = require('uglify-js');
const {transform} = require('babel-core');
const {promisify} = require('util');
const tocss = async(data) => (
	await promisify(
		require('node-sass').render
	)({data})
).css.toString();
const {processString} = require('uglifycss');

const {NODE_ENV = 'production'} = process.env;
const test = NODE_ENV.toLowerCase().startsWith('test');
const processors = {
	js: test ? [transform] : [transform, minify],
	css: test ? [tocss] : [tocss, processString],
};

const DESTINATION = resolve('./docs/index.html');

build();

const {createMonitor} = require('watch');

test && createMonitor(
	'.',
	{
		ignoreDotFiles: true,
		ignoreUnreadableDir: true,
		ignoreNotPermitted: true,
		ignoreDirectoryPattern: /^\.|^docs/,
	},
	monitor => {
    monitor.on('created', build)
	    .on('changed', build)
	    .on('removed', build);
	}
);


async function build() {
	const template = await read('./template.html');

	const data = await reduce(
		(await readdir('./chunks')).filter(name => !name.startsWith('.')),
		async(accumulator, slide) => Object.assign(
			accumulator,
			{
				[slide.replace(/^\d-/, '').replace(/.(\w*)$/, '')]: (await (async() => {
					const content = await read(`./chunks/${slide}`);

					switch (slide.split('.').pop()) {
						case 'md':
							return await marked(content, {});
						case 'js':
							return processors.js.reduce(
								(input, fn) => fn(input).code,
								content
							);
						case 'scss':
							return await reduce(
								processors.css,
								async(input, fn) => await fn(input),
								content
							);
						default:
							return content;
					}
				})()).trim()
			}
		),
		{}
	);

	await writeFile(
		DESTINATION,
		phrase(template, data)
	);

	console.info('Created at', DESTINATION);
};
