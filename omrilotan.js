#!/usr/bin/env node

const {join} = require('path');
require('colors');

process.on('unhandledRejection', console.error);

const termImg = require('term-img');
const terminalLink = require('terminal-link');

process.stdout.write('\033c');
termImg(join(__dirname, 'cli', 'omri.png'));

console.log(
	[
		'Hi.\nMy name is Omri.'.bold,
		`Most of my projects and projects I contribute to are hosted on ${terminalLink('GitHub', 'https://github.com/omrilotan')} and are available as open-source. I write articles about coding on ${terminalLink('Medium', 'https://medium.com/@omrilotan')}.`,
		`${terminalLink('ci-cd.net', 'https://ci-cd.net/')} is a hosted collection of generic helper shell scripts, which aim to streamline continues integration and delivery processes across services. This project's goal is to include non business logic scripts which can be used out-of-the-box or adapted by arguments. ¶ ${terminalLink('A1vy', 'https://omrilotan.com/mono/a1vy')} is a CLI tool I'm constantly developing because I'm constantly using — It helps development by doing mundane tasks for me, and it'll love to do the same for you. ¶ I created ${terminalLink('Published', 'https://published.js.org/')} to be compatible with NPX runner especially for CI-CD workflows — It's a smart NPM publish tool which decides if and how to publish packages to NPM.`,
		`I maintain several packages and npm based CLI tools in one repo: ${terminalLink('mono', 'https://omrilotan.com/mono/')}, and I'm using ${terminalLink('dont-look-up', 'https://fiverr.github.io/dont_look_up_package/')} to verify encapsulation. Among those packages are ¶ ${terminalLink('Paraphrase', 'https://omrilotan.com/mono/paraphrase/')} — a string template interpolation engine. It's a simple yet powerful little package. ¶ ${terminalLink('Boxt', 'https://omrilotan.com/mono/boxt/')} simply creates boxes around text, which is lovely for printing out messages to the terminal. ¶ ${terminalLink('Markt', 'https://omrilotan.com/mono/markt/')} wraps markdown files as markup, it's extremely useful for projects' readme files and can be run directly via NPX. ¶ ${terminalLink('Upgradable', 'https://omrilotan.com/mono/upgradable/')} was created for my CLI tools — It prompts the user to upgrade with one click when applicable. And a couple more cool ones.`,
		`Short articles I've written include ¶ An illustrated ${terminalLink('guide to SemVer (Semantic Versioning)', 'https://medium.com/p/a5298e2e1798')}. ¶ A walk-through for using ${terminalLink('git submodules', 'https://medium.com/p/ec6210801e07')} as a tool for code re-use. ¶ An example of how to ${terminalLink('automate documentation websites', 'https://medium.com/p/3b9877e42c31')} creation. ¶ And ${terminalLink('more', 'https://medium.com/@omrilotan/latest')}.`,
	].join('\n\n')
);

