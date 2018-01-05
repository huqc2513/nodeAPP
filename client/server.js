var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req,res){

  fs.readFile('./test.html',function(error,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    let obj = {code:1,msg:'dd'};
    res.json(obj);
    res.end(data,'utf-8');
  });

}).listen(3000,"127.0.0.1");

console.log('Server running at http://127.0.0.1:3000/');

var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){


    io.sockets.on('connection',function(socket){
        socket.broadcast.emit('message','你的好某XXX上线了');

    });

      socket.on('disconnect',function(){
        console.log('User disconnected');
      });


});
