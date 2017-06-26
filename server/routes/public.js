module.exports = function (app, express,io) {
    var router = express.Router();

    // we are here: /
    router.get('*', function (req, res, next) {
        console.log("public")
        res.render('client/public.html');
    });

    return router;
}