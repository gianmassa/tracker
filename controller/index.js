const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const moment = require('moment')
const routerUser = require('../module/user/routes')
const routerTracking = require('../module/tracking/routes')

mongoose.connect('mongodb+srv://admin:admin@cluster0.bjk6w.mongodb.net/tracker?retryWrites=true&w=majority',
{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })

const port = process.env.PORT || 3001

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/user', routerUser)
app.use('/api/tracking', routerTracking)
app.use('/login', routerUser)

app.listen(port, (req, res) => {
  console.log(`Servidor rodando na porta ${port}`)
})
