import express from 'express'
import type { User } from './user';
const users: User[] = [];
const app = express();

app.use(express.json());

//user should provide a name and get back the object if it exists
app.get('/user/:name', (req, res) => {
    const user = users.find((us) => us.name === req.params.name)
    console.log("the users array ", users)
    if (user) {
        console.log('user was sent')
        res.send(user)
    }
    else {
        console.log('no user found')
        res.send({})
    }
});

app.post('/user', (req, res) => {
    console.log("req body ", req.body)
    let dateTime = new Date()
    const user: User = {
        name: req.body.name,
        isAdmin: req.body.isAdmin,
        // isGMI: req.body.isGMI,
        roles: req.body.roles,
        createdAt: dateTime
    }
    // res.send()
    users.push(user)
    res.send(user)
})


app.listen(3000)