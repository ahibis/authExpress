const { ValidationError } = require('sequelize');
const ApiError = require('../exeptions/api-error');

module.exports = function (err, req, res, next) {
    res.render("404")
};