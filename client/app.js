var myJukebox = angular.module('myJukebox', []);

myJukebox.controller('playerCtrl', function(){
        var vm=this;

        vm.title =" JUKE-BOX";
        vm.playlist = [];

        vm.socket = io.connect('http://127.0.0.1:3001');

        vm.socket.on('connect', function(data){
            console.log("Conn");
        });
        vm.socket.on('message', function (data) {
            // HERE IS THE PROBLEM
            console.log("message")
        });

    });