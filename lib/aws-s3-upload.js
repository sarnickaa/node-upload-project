'use strict'
const AWS = require('aws-sdk')
const s3 = new AWS.S3() // s3 object instantiated to work with s3 service
const fs = require('fs')
const emoji = require('node-emoji')
const mime = require('mime')
const path = require('path') // for info about files when sent
const mongoose = require('mongoose')

require('dotenv').load() // gives you access to values in .env file

// pull in upload model
const Upload = require('../app/models/upload.js')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/node-S3-upload-express-development', {
  useMongoClient: true
})

const db = mongoose.connection

const file = {
  path: process.argv[2],
  name: process.argv[3]
}

  const s3Upload = function(file) {
    console.log(`file uploading is ${file.path} ${emoji.get("trophy")}`)

    const contentType = mime.getType(file.path)
    const ext = path.extname(file.path)
    const folder = new Date().toISOString().split('T')[0]

    const stream = fs.createReadStream(file.path)
    // how to get a stream in node?
    // use fs modules
    // use createReadStream to create a readable stream

    const params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_S3_BUCKET_NAME, // ACCESS TO SECRET without having to hardcode it in
      Key: `${folder}/${file.name}${ext}`,
      Body: stream,
      ContentType: contentType
    }
    // console.log(contentType)
    // calling the s3 upload method to actually make the call to s3 bucket
    // callback deals with response and any data returned on success - turn into a promise

    // promisified code: - the s3 bit is the asynch = must be made promise
    return new Promise((resolve, reject) => {
      s3.upload(params, function (err, data) {
        if (err) {
          reject(err)
          // console.log(emoji.get("x") + " Oh no! Epic Fail!", err)
        } else {
          resolve(data)
          // console.log(emoji.get("trophy") + " success! Oh So Awesome!", data)
        }
      })
    })
  }

db.once('open', () => {
  s3Upload(file)
    .then((s3Response) => {
      console.log(emoji.get("trophy") + emoji.get("fire") + 's3 Response is', s3Response)
      return s3Response
    })
    .then((s3Response) => {
      return Upload.create({
        title: file.name,
        url: s3Response.Location
      })
    })
    .then(console.log)
    .catch((error) => {
      console.error(emoji.get("x") + " Oh no! Epic Fail!", error)
    })
    .then(() => {
      db.close()
    })
})

// module.exports = s3Upload
