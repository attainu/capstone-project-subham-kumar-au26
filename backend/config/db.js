const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect(process.env.ecomdb, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
        console.log(`Database connected with ${data.connection.host}`);
    })
}

module.exports = connectDatabase