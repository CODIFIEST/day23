import express from 'express'
import type { User } from './user';
const users: User[] = [];
const app = express();

app.use(express.json()); // this line lets us get json responses

// GET requests fetch data-user should provide a name and get back the object if it exists
app.get('/user/:name', (req, res) => {
    const user = users.find((us) => us.name === req.params.name);
    console.log("the users array ", users);
    if (user) {
        console.log('user was sent');
        res.send(user);
    }
    else {
        console.log('no user found');
        res.send({});
    }
});
// POST requests send data to be saved. for this route, we want to 
//ceck the 'req' object for a user's name, isAdmin, and roles,
//then create a new user. This user can be fetched with the GET above
//send in a JSON (JavaScript Object Notification), AKA JavaScript Object
//i.e. {name:"winky", isAdmin:false, roles:["pp", "team"]}

app.post('/user', (req, res) => {
    console.log("req body ", req.body)
    let dateTime = new Date()
    //req.body is the incoming JSON, with the user info to be saved
    const user: User = {
      
        name: req.body.name,
        isAdmin: req.body.isAdmin,
        // isGMI: req.body.isGMI,
        roles: req.body.roles,
        createdAt: dateTime
    };
    //after POSTING the data in req.body and saving it as a user,
    //i PUSH it to my users array.
    //on my GET route, I can GET it out fo the "database" of the users array
    users.push(user);
    
    //don't put anything after res.send, it's like RETURN in a function, 
    //everything after it is ignored
    res.send(user);
});


app.listen(3000);