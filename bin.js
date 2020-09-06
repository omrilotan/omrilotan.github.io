#!/usr/bin/env node

require('colors');
const link = require('terminal-link');

process.on('unhandledRejection', console.error);

process.stdout.write('\x1Bc'); // \033c
console.log(
	[
		'Hi.\nMy name is Omri.'.bold,
		`Most of my projects and projects I contribute to are hosted on ${link('GitHub', 'https://github.com/omrilotan')} and are available as open-source.`,
		`I write articles about coding on ${link('Dev.to', 'https://dev.to/omrilotan')}. And maintain ${link('a small website', 'https://omrilotan.com')} with more information.`,
	].join('\n')
);
