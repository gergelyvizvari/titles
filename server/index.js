const express = require('express')
const app = express()
const port = 5000

require('./routes')(app)

// server main listener
app.listen(port, () => {
    console.log(`Titles server listening on: http://localhost:${port}/`)
})