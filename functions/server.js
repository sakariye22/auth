const express = require('express');
const mongoose = require('./db'); 
const authRoutes = require('./routes/authRoutes');
const app = express();
const rideRoutes = require('./routes/rideRoutes');
const cors  = require ('cors');



app.use(express.json()); 
app.use(cors());

app.use('/api', authRoutes); 
//app.use('/on', rideRoutes);
app.get('/ok',(req,res)=> {
  res.json('server is running');
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//module.exports=app;