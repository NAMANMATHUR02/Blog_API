const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');
const HttpError = require('./utils/http-error');

//configuration statements
const port = 3001;
app.use(bodyParser.json());

// Routing
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error Handling
app.use((req,res,next) => {
    const error = new HttpError('Page not found',404);
    throw error;
  });
  
  app.use((error, req, res, next) => {
    res.status(error.code);
    res.json({message: error.message || 'Unknown error occured' , code: error.code });
  });

//Database connect  

mongoose.connect('<Enter your connection string here>',
{
  useUnifiedTopology:true,
  useNewUrlParser: true
}).then(() => {
  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
  });
}).catch(err => {
  console.log(err);
});