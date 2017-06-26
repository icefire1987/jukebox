module.exports = function (app, express) {
    var router = express.Router();

    // we are here: /
    router.get('*', function (req, res, next) {
        console.log("public")
        res.render('client/public.html');
    });

    return router;
}