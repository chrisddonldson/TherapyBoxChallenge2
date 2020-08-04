const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const routes = require('./routes/api');


const uri =  process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection established")
})

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.use((req, res, next)=>{
    const error = new Error('Not found :(');
    error.status=404;
    next(error);
})

app.use((error, req,res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));