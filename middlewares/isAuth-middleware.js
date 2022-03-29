
module.exports = function (err, req, res, next) {
    if(req.session.userId)
        return next()
    res.render("unauth")
};