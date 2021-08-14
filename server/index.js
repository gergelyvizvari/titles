const express = require('express')
const app = express()
const port = 3000

// root path
app.get('/', (req, res) => {
    res.send('hello world')
})

// server main listener
app.listen(port, () => {
    console.log(`Titles server listening on: http://localhost:${port}/`)
})