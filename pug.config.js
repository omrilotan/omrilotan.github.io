const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

module.exports = {
	filters: {
		md: text => md.render(text)
	}
};
