// Add logic to this script to poll server every second for updated pixels.
let mostRecentServerUpdate = 0;
let timeoutTime = 1000;
// let clientUpdates = [];
   // ^^^ if use this one, get rid of the other here and in the bitmap; however, this version acts slower on each client 

function pollUpdatedPixels() {
    let body = {
        "clientUpdates": clientUpdates,
        "mostRecentServerUpdate": mostRecentServerUpdate
    };
    body = JSON.stringify(body); 
    // console.log(body);
    clientUpdates = []; // reseting clientupdates; makes clientUpdates empty array and doesnt affect value inside body b/c just stringified value which then makes new variable; not send same updates twice 
    // let res = await fetch("/updates", {
    fetch("/updates", {
        method: "POST",
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(objectThing => {
        objectThing.serverUpdates.forEach(update => {
            bitmap.applyUpdatesFromServer(update[0], update[1], update[2])
        });
        setTimeout(pollUpdatedPixels, timeoutTime) ;
    });
};

setTimeout(pollUpdatedPixels, timeoutTime);