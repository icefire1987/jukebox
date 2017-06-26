module.exports = function (app, express,io) {
    var router = express.Router();

    // we are here: /
    router.get('*', function (req, res, next) {
        console.log("protected")
        res.render('client/protected.html');
    });

    return router;
}