module.exports = function (app, express,io) {
    var router = express.Router();

    io.sockets.on('connection', function (socket) {
        console.log('connection established');
    });
    // we are here: /
    router.get('*', function (req, res, next) {
        console.log("player")


        res.render('client/player.html');

    });

    return router;
}