const express = require('express');
const mongoose = require('./db'); 
const app = express();
const cors  = require ('cors');
const authRoutes = require ('./routes/authRoutes.js');
require ('../functions/db.js');


app.use(express.json()); 
app.use(cors());



app.get('/ok',(req,res)=> {
  res.json('server is running');
});

app.use('/api', authRoutes);




module.exports=app;

