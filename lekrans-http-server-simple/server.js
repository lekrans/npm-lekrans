const HTTP = require('http');

let server = HTTP.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>HTML Response</title>
            </head>
            <body>
                <h1>Serving HTML Text</h1>
                <p>${req.url}</p>
                <p>${req.method}</p>
            </body>
        </html>
    `);
}).listen(3000);

console.log('Server listening on port 3000');