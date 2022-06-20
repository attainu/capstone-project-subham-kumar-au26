const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db')

/*<--Handling Uncaught Exception-->*/
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});


/*<--Congif-->*/
dotenv.config({ path: 'backend/config/config.env' })



/*<--Database-->*/
connectDatabase()



/*<--Cloudinary Connection-->*/




app.listen(process.env.PORT, () => {
    console.log(`server is working over port no: ${process.env.PORT}`)
})



/*<--Unhandled Promise Rejection-->*/
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
