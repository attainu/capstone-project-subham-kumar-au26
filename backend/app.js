const express = require('express');
const app = express();
const errorMiddelware = require('./middleware/error')

// const path = require('path');

app.use(express.json())


/*<--Route Import-->*/
const product = require('./routes/productRoute.js')
app.use('/api/v1',product);


/*<--middelware Error-->*/
app.use(errorMiddelware);



module.exports=app;
