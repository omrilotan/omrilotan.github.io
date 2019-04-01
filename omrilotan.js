#!/usr/bin/env node

const {join} = require('path');
require('colors');

process.on('unhandledRejection', console.error);

const img = require('term-img');
const link = require('terminal-link');

process.stdout.write('\033c');
try {
	img(join(__dirname, 'cli', 'omri.png'));
} catch (error) {
	// ignore
}

console.log(
	[
		'Hi.\nMy name is Omri.'.bold,
		`Most of my projects and projects I contribute to are hosted on ${link('GitHub', 'https://github.com/omrilotan')} and are available as open-source.`,
		`I write articles about coding on ${link('Medium', 'https://medium.com/@omrilotan')}. And maintain ${link('a small website', 'https://omrilotan.com')} with more information.`,
	].join('\n')
);

