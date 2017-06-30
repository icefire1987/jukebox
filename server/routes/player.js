module.exports = function (app, express,io,fs,path) {
    var router = express.Router();
    var ss = require('socket.io-stream');

    var clients = [];
    io.sockets.on('connect', function (client) {
        console.log('client connect');

        clients.push(client);

        console.log(clients.length);
        client.on('disconnect', function(){
           clients.splice(clients.indexOf(client),1);
        });

        client.on("askingForStream", function(data){
            console.log("client asks for stream")
            var stream = ss.createStream();
            var filename = 'test.mp3';
            ss(client).emit('audio-stream', stream, { name: filename });
            fs.createReadStream(filename).pipe(stream);
        });
    });


    router.get('*', function (req, res, next) {
        console.log("player")


        res.render('client/player.html');

    });

    return router;
}