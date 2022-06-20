const ErrorHandler = require('../utils/errorHandler')



module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Fault";

    // If input in api is not valid
    if(err.name === 'CastError'){
        const message = `Invalid input. Invalid: ${err.path}`
    }

    res.status(err.statusCode).json({
        success: false,
        error:err,
    });
};