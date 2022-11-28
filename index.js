require('dotenv').config()
const express = require('express')
const app = express()
const port = 4117
// const port = "165.22.51.224"
const bodyParser = require('body-parser')
const router = require('./routes')
const cors = require('cors')
const path = require('path')
app.use(cors({
  // origin: 'http://localhost:3000'
  // origin: ['http://localhost:3000', 'http://tickitz.netlify.app']
})) //dapat diakses public

app.use(bodyParser.json())
//www-url-form-encoded
app.use(bodyParser.urlencoded({ extended: true }))
//form-data (multer)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/v1', router)


app.listen(port, () => {
  console.log(`Cic Backend listening on port ${port}`)
})