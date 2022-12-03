// Source from one of my projects to help other developers having issues with uploading large files to object storage.
// It is originally a NestJS project.

const AWS = require("aws-sdk");
const fs = require('fs');
const stream = require('stream');

const s3 = new AWS.S3({
  endpoint: `OBJECT_STORAGE_ENDPOINT_URL`, // e.g. https://eu2.contabostorage.com/bucketname
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  s3BucketEndpoint: true,
});

@Post("uploadFile")
// This code requires express-fileupload.
/*
    That module stands for creating a file on the disk instead of the memory.
    When the file is successfully uploaded on the disk, it reads that as a stream and sends chunks to s3.
    By this we basically can upload any size of files. (This sample for Contabo Object Storage, where it's maximizied to 5TB.)
*/
  async UploadRouter(@Req() req, @Res() res){
    let file = req.files.FileInput;

    function upload(s3) {
      let pass = new stream.PassThrough();
    
      let params = {
        Bucket: "nextgen",
        Key: file.name,
        Body: pass
      };
    
      s3.upload(params, function (error, data) {
        console.error(error);
        console.info(data);
        if(data){
          // fs.unlinkSync(`${file.tempFilePath}`); // When the upload has finished to object storage, you should delete the file from the server.
        }
      });
    
      return pass;
    }
    
    const readStream = fs.createReadStream(`${file.tempFilePath}`);
    readStream.pipe(upload(s3));
  }