const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cors = require('cors');
const {Protected} = require('./modules/Auth');

const taskRoute = require('./router/TaskRoute'); 
const bodyParser = require('body-parser');
const userController = require('./handlers/User');


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
app.use(taskRoute); 
app.post('/user', userController.createUser);
app.post('/signin', userController.signin);

//listening
app.listen(3001, () => {
  console.log('welcome express');
});