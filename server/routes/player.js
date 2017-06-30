module.exports = function (app, express,io,fs,path) {
    var vm = this;

    var router = express.Router();
    var ss = require('socket.io-stream');

    vm.addRandomSong = function(obj){
        playlist.push(songs[Math.floor(Math.random()*songs.length)]);
    };

    vm.vote = {};
    vm.vote.init = function(){
        vm.vote.songs = [];
        vm.vote.votes = {};
    };

    var stream = ss.createStream();

    var filename = '';

//fs.createReadStream(filename).pipe(stream);

    var playlist = [];
    var currentIndex = 0;
    var songs = ['1.mp3','2.mp3','3.mp3'];


    var clients = [];
    io.sockets.on('connect', function (client) {
        console.log('client connect');

        clients.push(client);
        console.log(clients.length);


        client.on('disconnect', function(){
           clients.splice(clients.indexOf(client),1);
        });

        client.on('askingForStream', function(){
            client.join('/radio');
        });

        client.on('getNextSong', function(data){
            console.log("next")
            vm.addRandomSong();
            io.in('/radio').emit('playNextSong',playlist[playlist.length - 1]);
        });


    });

    setInterval(function(){
        io.in('/radio').emit("message","Verbunden")
    }, 5000);





    /*var playback = true;
    var filename = 'test.mp3';
    var chunk_limit = 1024;
    var chunk_counter = 0;
    var readStream = fs.createReadStream(filename,{highWaterMark: 1024})
        readStream.pipe(stream);
    readStream.on('data', function(chunk){

            chunk_counter++;
            console.log(chunk_counter);
            //this.pipe(stream);
            //ss(io.sockets.in('radio')).emit('audio-stream', chunk, { name: filename });


    });*/

    router.get('*', function (req, res, next) {
        console.log("player")


        res.render('client/player.html');

    });

    return router;
}