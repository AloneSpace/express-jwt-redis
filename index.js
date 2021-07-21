const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: '2mb'}))

//* Set up router
require('./routes/index')({express, app})

//* Listen port
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})