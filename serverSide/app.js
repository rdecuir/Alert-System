var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('<h1>Alert service is alive</h1>');
});

io.on('connection', function(socket) {
    console.log('Client Conected');
    setInterval(function() {
        socket.emit('alert', {level: 'WARNING', msg: 'Damage found on the hull.', person: 'Jimmy Jon'})
    }, 20000)
    
    
    
    setInterval(function() {
        socket.emit('alert', {level: 'INFO', msg: 'Engineering has men deployed to the area of damage and are investigating the hull.', person: 'Main'})
    }, 7000);
    
    setInterval(function() {
        socket.emit('alert', {level: 'NORM', msg: 'Drones on patrol are reporting no idenified hostiles.', person: 'Security'})
    }, 10000);
    
    setInterval(function() {
        socket.emit('alert', {level: 'COM', msg: 'Officer Joe Deal has connected a call to the mainlands.', person: 'COMS Officer Smith'})
    }, 12000);
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
