const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

const auth = require('./middleware/authorization')
app.use(cors())

const login = require('./login')
const encoder = require('./encoder')

app.use(express.json())
app.post('/login', login)

app.use(auth)

app.post('/encoder', auth, encoder)
module.exports = app