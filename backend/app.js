const express = require('express')
const app = express()
const port = 3000

const login = require('./login')
const encoder = require('./encoder')

app.use(express.json())

app.post('/login', login)
app.post('/encoder', encoder)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))