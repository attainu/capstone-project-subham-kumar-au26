const express = require('express');
const app = express();
const errorMiddelware = require('./middleware/error')

// const path = require('path');

app.use(express.json())


/*<--Route Import-->*/
const product = require('./routes/productRoute')
app.use('/api/v1',product);

const user = require('./routes/userRoute')
app.use('/api/v1',user);


/*<--middelware Error-->*/
app.use(errorMiddelware);



module.exports=app;
