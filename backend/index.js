const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cors = require('cors');

const userRoute = require('./router/UserRoute'); 
const bodyParser = require('body-parser');


//database Connection    




mongoose.connect('mongodb://127.0.0.1:27017/users').then(() => {
  console.log('db connected');
}).catch((error) => {
  console.log(error);
}); 

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors()); //moiddleware
app.use(express.json());

//router
app.use(userRoute); 

//listening
app.listen(3001, () => {
  console.log('welcome express');
});