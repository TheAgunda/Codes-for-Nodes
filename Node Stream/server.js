const http = require('http');
const fs = require("fs");
const server = http.createServer((req, response) => {
    //`req` is an http.IncomingMessage, which is a readable stream.
    // `res` is an http.ServerResponse, which is a writable stream.
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
        console.log(chunk);
    });
    req.on('end', () => {
        try {
            const createFile = fs.createWriteStream('./test.mp4', {
                encoding: 'binary',
            });
            createFile.write(body);
            createFile.on('finish', () => {
                console.log('File Created.');
            });
            createFile.end();
            response.write(body);
            response.end();
        } catch (er) {
            // uh oh! bad json!
            response.statusCode = 400;
            return response.end(`error: ${er.message}`);
        }
    });
});
server.listen(1337);




