module.exports = function (app, express) {
    var router = express.Router();

    // we are here: /
    router.get('*', function (req, res, next) {
        console.log("protected")
        res.render('client/protected.html');
    });

    return router;
}