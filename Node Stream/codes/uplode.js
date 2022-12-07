import * as aws_sdk from "aws-sdk";
import { AnyLengthString } from "aws-sdk/clients/comprehend";
import { Body, CompletedPart } from "aws-sdk/clients/s3";
import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config();
const s3 = new aws_sdk.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

//All Multipart Uploads must use 3 main core API’s:
(async function () {
    /**First Step 
     * This starts the upload process by generating a unique UploadId.
     */
    const TESTING_ENDPOINT = 'testing/movie.mp4'
    const multipartCreateResult: any = await s3.createMultipartUpload({
        Bucket: 'thehbcubucket',
        Key: TESTING_ENDPOINT,
        ACL: "public-read",
        ContentType: "video/mp4",
        StorageClass: 'STANDARD'
    }).promise();
    console.log("First Step Done ::: ", multipartCreateResult);


    /**Second Step
     * This uploads the individual parts of the file. 
     */

    let chunkCount = 1;
    let filePath = 'public/files/1434659607842-pgv4ql-1563562212902.mp4';
    let CHUNK_SIZE = 10 * 1024 * 1024; //equal to 10000000 bytes = 10MB 
    var readStream = fs.createReadStream(filePath, { highWaterMark: CHUNK_SIZE, encoding: 'utf8' });
    readStream.on('data', async function (chunk) {




    }).on('end', function () {
        console.log('###################');
        console.log('end');
    });




    //TODO Method 1 was not a good stuff.
    // fs.open(filePath, 'r', function (err, fd) {
    //     if (err) throw err;
    //     var bufferSize = fs.fstatSync(fd).size;
    //     var buffer = Buffer.alloc(bufferSize);
    //     console.log(bufferSize);
    //     function readNextChunk() {
    //         fs.read(fd, buffer, 0, CHUNK_SIZE, null, async function (err, nread) {
    //             if (err) throw err;

    //             if (nread === 0) {
    //                 // done reading file, do any necessary finalization steps
    //                 fs.close(fd, function (err) {
    //                     if (err) throw err;
    //                 });
    //                 return;
    //             }

    //             var data: Body;
    //             if (nread < CHUNK_SIZE) {
    //                 data = buffer.slice(0, nread);
    //             }
    //             else {
    //                 data = buffer;
    //             }
    //             // let uploadPromiseResult = await s3.uploadPart({
    //             //     Body: data,
    //             //     Bucket: "thehbcubucket",
    //             //     Key: TESTING_ENDPOINT,
    //             //     PartNumber: chunkCount,
    //             //     UploadId: multipartCreateResult.UploadId,
    //             // }).promise();

    //             // const singlePart: CompletedPart = {
    //             //     PartNumber: chunkCount,
    //             //     ETag: uploadPromiseResult.ETag
    //             // };
    //             // uploadPartResults.push(singlePart);



    //             chunkCount++;
    //             console.log(`Uploade Object Chuck`, uploadPartResults);

    //             readNextChunk();
    //         });
    //     }
    //     readNextChunk();
    //     console.log("done");
    // });












    // let completeUploadResponce = await s3.completeMultipartUpload({
    //     Bucket: "thehbcubucket",
    //     Key: TESTING_ENDPOINT,
    //     MultipartUpload: {
    //         Parts: [
    //             { PartNumber: 1, ETag: '"7b120f4f43a56041a8a0c1273a1622d4"' },
    //             { PartNumber: 2, ETag: '"68daa90f81d0ea2f8c147a443d4f924c"' },
    //             { PartNumber: 3, ETag: '"57d2a691e38a4e54d32878b472a323a8"' },
    //             { PartNumber: 4, ETag: '"beb8189ea39faa8fed46636d2ce4f5d3"' }
    //           ]              
    //     },
    //     UploadId: multipartCreateResult.UploadId
    // }).promise();


    // console.log(`S3 Complete response`, completeUploadResponce);

})();





