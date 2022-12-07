const axios = require('axios');
var FormData = require('form-data');
var https = require('https');
var fs = require('fs');
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    key: fs.readFileSync('./private.key'),
    cert: fs.readFileSync('./certificate.crt'),
})
var bodyFormData = new FormData();
bodyFormData.append('media', fs.createReadStream('./trailer.mp4'));
bodyFormData.append('content_id', '637db6445c584da68b630ab6');
axios({
    url: 'https://ec2-3-13-213-178.us-east-2.compute.amazonaws.com/api/v1/hbcu-tv/media-content/upload-media',
    method: 'POST',
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: progressEvent => {
        console.log(progressEvent)
    },
    responseType: 'stream',
    httpsAgent: httpsAgent
}).then().catch((data) => {

    console.log("ERRROR %s", data)
})