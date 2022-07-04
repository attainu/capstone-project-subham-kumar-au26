const express = require('express');
const app = express();
const errorMiddelware = require('./middleware/error')
const path = require('path');
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())


/*<--Route Import-->*/
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')

app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);


/*<--middelware Error-->*/
app.use(errorMiddelware);



module.exports=app;
