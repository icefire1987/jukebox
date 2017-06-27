module.exports = function (app, express,fs) {
    var router = express.Router();

    // we are here: /
    router.get('*', function (req, res, next) {
        console.log("protected")

        res.set({'Content-Type': 'audio/mpeg'});
        var readStream = fs.createReadStream('test.mp3');
        readStream.pipe(res);

    });

    return router;
}