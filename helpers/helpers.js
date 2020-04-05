const {Storage} = require('@google-cloud/storage');
var path = require('path');
const gc = new Storage({
  keyFilename: path.join(__dirname, '../configer/tdt-main-66a7adf662e5.json'),
  projectId: 'tdt-main',
});

const bucket = gc.bucket('tdt_main_deep_bucket'); // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the  bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

exports.uploadFile = function(file) {
    // clean it and return
    console.log(bucket);
}

 // exports.uploadFile = (file) => new Promise((resolve, reject) => {
 //  console.log(bucket);
  // const { originalname, buffer } = file

  // const blob = bucket.file('testingzaman')
  // const blobStream = blob.createWriteStream({
  //   resumable: false
  // })
  // blobStream.on('finish', () => {
  //   const publicUrl = format(
  //     `https://storage.googleapis.com/${bucket.name}/${blob.name}`
  //   )
  //   resolve(publicUrl)
  // })
  // .on('error', () => {
  //   reject(`Unable to upload file, something went wrong`)
  // })
  // .end(buffer)
// })


 exports.getPublicUrl = (fileName) => `https://storage.googleapis.com/tdt_main_deep_bucket/${fileName}`;