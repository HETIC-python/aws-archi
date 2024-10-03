const { Upload } = require('@aws-sdk/lib-storage');

const  {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');

async function main(filename, mainFile) {
  const s3Client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey
    }
  });

  const bucketName = `paul-the-goat`;

  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: filename,
        Body: mainFile,
        ContentType: 'application/pdf'
      },
      tags: [],
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false
    });

    parallelUploads3.on('httpUploadProgress', (progress) => {
      console.log(progress);
    });

    return parallelUploads3.done();
  } catch (e) {
    console.log(e);
  }

  const { Body } = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: filename
    })
  );

  console.log(await Body.transformToString());
}

exports.module = {
  main
}