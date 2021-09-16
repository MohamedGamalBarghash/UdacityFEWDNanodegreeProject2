// Setup empty JS object to act as endpoint for all routes
projectData = {};

// define the port to launch the server on
const port = 3030;

// Require Express to run server and routes and require body-parser package
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// use post to add the acquired value to the projectData empty variable and send it
app.post('/weather', (req, res)=> {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
});

app.get('/weather', (req,res)=> {
    res.send(projectData);
});

// launch the server and print a statementto check it's working
app.listen(port, ()=> {
    console.log('Server running on port:' + port.toString());
});