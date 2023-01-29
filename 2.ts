import express from 'express'
import { Message } from './message'
const messages: Message[] = [];
const app = express();
app.use(express.json());
let i = 0;
//route to post a discord message, push to messages array
//and return with res.send 
app.post('/message', (req, res) => {
    console.log('req body ', req.body)
    let dateTime = new Date();
    const message: Message = {
        user: req.body.user,
        message: req.body.message,
        ID: i,
        keks: 0,
        createdAt: dateTime,
        lastEditAt: dateTime
    }
    messages.push(message);
    res.send(message);
    i++;
    console.log('messages', messages)
})
// route to get discord messages by username
//pass in a username and look through messages array to find all 
//messages from that user and return them.
const userMessages: Message[] = [];
app.get('/message/:username', (req, res) => {
    messages.forEach((msg) => {
        if (msg.user === req.params.username) {
            userMessages.push(msg);
            // console.log('message ', msg)
            // console.log('array of msgs', userMessages)
        }
    });
    if (userMessages) {
        console.log("messages retrieved")
        console.log(userMessages)
        res.send(userMessages)
    }
    else {
        console.log('no messages found')
        res.send({});
    }
});
// a new .put route to edit existing records 
//it should accept an ID of a message in the route name, '/message/:ID'
//the route should find the message by ID in the messages array, and 
//update the tet to the new text

app.put('/message/:ID', (req, res) => {

    let index = messages.findIndex((m => m.ID.toString() === req.params.ID))
    let dateTime = new Date();

    console.log('pre-update', messages[index])

    if (messages[index].user === req.body.user) {
        messages[index].message = req.body.message;
        //should we update date time here?
        messages[index].lastEditAt = dateTime;
        console.log('after update', messages[index])
        res.send(messages);
    }
    else {
        console.log('wrong user or wrong ID')
        res.send({})
    }
})

app.listen(3000)