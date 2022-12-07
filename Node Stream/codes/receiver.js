// Load the necessary modules and define a port
const app = require('express')();
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
app.post('/upload', (req, res) => {
    console.log('test');
    // `req` is an http.IncomingMessage, which is a readable stream.
    // `res` is an http.ServerResponse, which is a writable stream.
    let body = '';
    // Get the data as utf8 strings.
    // If an encoding is not set, Buffer objects will be received.
    req.setEncoding('utf8');

    // Readable streams emit 'data' events once a listener is added.
    req.on('data', (chunk) => {
        // res.write(chunk);
        body += chunk;
    });

    // The 'end' event indicates that the entire body has been received.
    req.on('end', () => {
        try {
            // const data = JSON.parse(body);
            // Write back something interesting to the user:
            res.write(body);
            res.end();
        } catch (er) {
            // uh oh! bad json!
            res.statusCode = 400;
            return res.end(`error: ${er.message}`);
        }
    });
});

// Mount the app to a port
app.listen(port, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});