var axios = require('axios');
var fs = require('fs')
var http = require('http');
const options = {
    port: 1337,
    hostname: 'localhost',
    method: 'POST',
    path: '/'
};
const request = http.request(options);


let CHUNK_SIZE = 10 * 1024 * 1024; //equal to 10000000 bytes = 10MB 
var fileStream = fs.createReadStream('trailer.mp4', { highWaterMark: CHUNK_SIZE, encoding: 'utf8' });
fileStream.on('data', (chunk) => {
    request.write(chunk);
}).on('end', function () {
    console.log('###################');
    request.end();
});

request.on('close', (data) => {
    console.log(data);
});

