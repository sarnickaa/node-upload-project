'use strict'
// get file from cli
// Verify with console.log
// call upload script


const s3Upload = require('../lib/aws-s3-upload.js')
const emoji = require('node-emoji')

// const fileToUpload = process.argv[2]
const file = {
  path: process.argv[2],
  name: process.argv[3]
}

// invokes3upload() PROMISE HANDLED WITH .THEN .CATCH
s3Upload(file)
  .then((data) => console.log(emoji.get("trophy") + emoji.get("fire") + " success! Oh So Awesome!", data))
  .catch((err) => console.log(emoji.get("x") + " Oh no! Epic Fail!", err))
