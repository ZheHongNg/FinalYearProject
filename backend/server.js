const express = requrie('express');
const mongoose = require('mongoose');
const connection = require('./config/databaseSetup');

const app = express();

app.listen(1337,()=>{
    console.log("Server start!");
});