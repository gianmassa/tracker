const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express()

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Api initialized success in port ${port}`)
})
