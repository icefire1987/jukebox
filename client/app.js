console.log("app.js")

var socket = io.connect('http://127.0.0.1:8081');
socket.on('message', function (data) {
    // HERE IS THE PROBLEM
    context.decodeAudioData(data, decodeHandler, function(e) { console.log(e); });
});