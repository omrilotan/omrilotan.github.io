const { get } = require('https');

get('https://dev.to/feed/omrilotan', response => {
	const chunks = [];
	response.on('data', chunk => chunks.push(chunk));
	response.on('end', chunk => console.log(chunks.join()));
});
