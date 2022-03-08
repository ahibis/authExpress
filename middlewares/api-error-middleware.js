const { ValidationError } = require('sequelize');
const ApiError = require('../exeptions/api-error');

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors,status:"error"})
    }
    if (err instanceof ValidationError)
    {
        return res.status(400).json({message: err.errors[0].message, errors: [], status:"error"})
    }
    return res.status(500).json({message: 'Unexpected error',status:"error",error:err})
};
