const express = require('express');
const mongoose = require('./db'); 
const app = express();
const cors  = require ('cors');
const authRoutes = require ('./routes/authRoutes.js');


app.use(express.json()); 
app.use(cors());


app.get('/ok',(req,res)=> {
  res.json('server is running');
});

app.use('/api', authRoutes);


mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});


module.exports=app;

