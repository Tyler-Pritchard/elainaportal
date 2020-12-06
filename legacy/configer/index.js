const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, '../config/DialogeFlowKey.json')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'Elaina-Prod',
})

module.exports = storage