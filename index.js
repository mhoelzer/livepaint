const express = require("express")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

let updates = [];
// Fill in your request handlers here
app.post("/updates", (request, response) => {
    if(request.body.clientUpdates.length > 0) {
        request.body.clientUpdates.forEach(update => updates.push(update));
    }
    newUpdates = updates.slice(request.body.lastServerUpdate) // slicing segment off total updates from all clients; taking latest segment that this client hasnt seen based off the # given to client; when server handles req and sees how much the client has seen, so slice updates and send back the stuff you havent seen
    response.send({ "serverUpdates": newUpdates })
})

app.listen(port)