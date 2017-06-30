myJukebox.controller('playerCtrl', function(){
        var vm=this;

        vm.title =" JUKE-BOX";
        vm.status = "";
        vm.song = "";
        vm.player = document.getElementById('player');


        vm.playlist = [];

        vm.socket = io.connect('http://127.0.0.1:3001');

        vm.socket.on('connect', function(data){
            console.log("Conn");
        });
        vm.socket.on('message', function (data) {
            // HERE IS THE PROBLEM
            vm.status = data;
        });

        vm.socket.on('playNextSong', function(data){
            console.log("song:" + data)
            vm.song = data;
            vm.player.src = '/server/'+data;
            vm.player.play();

        });


        ss(vm.socket).on('audio-stream', function(stream, data) {
            console.log("server sends stream")
            parts = [];
            stream.on('data', function(chunk){
                console.log(data)
                parts.push(chunk);
            });
            stream.on('end', function () {
                console.log(parts)
                vm.player.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
                vm.player.play();
            });
        });
        vm.askingForStream = function(){
            vm.socket.emit('askingForStream',{});
        };
        vm.playNextSong = function(){
            vm.socket.emit('getNextSong',{});
        };




    });