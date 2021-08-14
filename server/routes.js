const path = require('path')

module.exports = function(app) {
    app.get('/', (req, res) => {        
        res.redirect('http://localhost:3000/')
    })
}