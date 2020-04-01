const fs = require('fs');

const requestHandler = (req, res) => {
	const url = req.url;
	const method = req.method;
	if (url === '/') {
		res.write('<html>');
		res.write('<head><title>Enter Msg</title></head>');
		res.write(
			'<body><form action="/message" method="POST" ><input type="text" name="message" /><button type="submit">fuck me</button></form></body>'
		);
		res.write('</html>');
		return res.end();
	}
	if (url === '/message' && method === 'POST') {
		const body = [];
		req.on('data', (data) => {
			console.log(data);
			body.push(data);
		});
		return req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			const message = parsedBody.split('=')[1];
			fs.writeFile('message.text', message, (err) => {
				res.statusCode = 302;
				res.setHeader('Location', '/');
				return res.end();
			});
		});
	}
	res.setHeader('Content-Type', 'text/html');
	res.write('<html>');
	res.write('<head><titile>My first page</title></head>');
	res.write('<body><h1>Yo fuck me right?!</h1></body>');
	res.write('</html>');
	res.end();
};

module.exports = requestHandler;
