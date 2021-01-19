const express = require('express');
const path = require('path');

const app = express();


// First render
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes --->
app.use('/api', require('./Routes/Api').route);

// app.get('/', (req, res) => (res.send("Fuvk World!")));

app.listen('8000', () => console.log("Server started at http://localhost:8000"));