const express = require("express")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

let updates = [];
// Fill in your request handlers here
app.post("/updates", (request, response) => {
    
})

app.listen(port)