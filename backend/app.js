const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000
const auth = require('./middleware/authorization');
app.use(cors())

const login = require('./login')
const encoder = require('./encoder')

app.use(express.json())
app.post('/login', login)

app.use(auth)
app.get('/encoder', function(req, res) {
    console.log("USPJEHHHHH");
})
app.post('/encoder', auth, encoder)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))