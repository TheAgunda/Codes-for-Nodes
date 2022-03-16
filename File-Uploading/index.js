const express = require("express");
const multer = require("multer");
const app = express();
var fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
ffmpeg.setFfmpegPath(ffmpegInstaller.path)

const public_dir = 'public/files';
const localStorage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, public_dir);
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: localStorage }).single('image');

app.get('/upload', upload, (req, res) => {
    const request_file = req.file.originalname.split(".");
    const request_file_ext = request_file[request_file.length - 1];

    const random_id = Math.floor(1000000000 + Math.random() * 900000000);
    ffmpeg(req.file.path, { timeout: 432000 }).addOptions([
        '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
        '-level 3.0',
        // '-s 1180x1136',          // 640px width, 360px height output video dimensions
        '-start_number 0',     // start the first .ts segment at index 0
        '-hls_time 10',        // 10 second segment duration
        '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
        '-f hls'               // HLS format
    ]).output(`${public_dir}/hls/${random_id}.m3u8`).on('end', () => {
        fs.unlink(req.file.path, function (err) {
            if (err) {
                return console.log(err)
            }
            console.log('file deleted successfully');
        });
    }).run();

    fs.readdir(`${public_dir}/hls/`, (err, files) => {
        if (err) {
            return console.log('Failed to list directory: ' + err);
        }
        files.forEach(file => {
            const params = {
                Body: fs.createReadStream('uploads/video/' + file),
                Bucket: "5am5pm",
                Key: file
            }
            console.log(params);
            // s3.upload(params, (err, data) => {
            //     if (err) {
            //         console.log(err)
            //     } else {
            //         console.log(data)
            //     }
            // });
        });
    });
});

app.listen(3000, () => {
    console.log("Server is Running");
})