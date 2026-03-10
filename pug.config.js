import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export default {
	filters: {
		md: (text) => md.render(text),
	},
};
