var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// server roads
app.use("/css", express.static("css"));
app.use("/scripts", express.static("scripts"));
app.use("/fonts", express.static("fonts"));
app.use("/videos", express.static("videos"));
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
})
app.get('/remote.html', function(req, res) {
  res.sendFile(__dirname + "/remote.html");
})
app.get('/readme.md', function(req, res) {
  res.sendFile(__dirname + "/readme.md");
})

var roomList=[];
// on connection
io.on('connection', function(socket) {
    // on room request
    socket.on("roomRequest", function(room) {
        // if the room dosent exist and not null
        if(!checkRoom(room) && room != null ) {
            // say yes
            socket.emit("roomAnswer",true);
            // add the room
            roomList.push(room);
            // save the room into the socket object and join it
            socket.join(room);
            socket.roomIn = room;
            // save type of socket
            socket.type = "desktop";
        }
        else {
            // sayno
            socket.emit("roomAnswer",false);
        }
    })
    // on remote request
    socket.on("remoteRequest", function(room) {
        // if room exist
        if(checkRoom(room)) {
            // say yes
            socket.emit("remoteAnswer",true);
            //join and save the room
            socket.join(room);
            socket.roomIn = room;
            // save type
            socket.type = "remote";
        }
        else {
            // say no
            socket.emit("remoteAnswer",false);
        }
    })
    // when remote is ready
    socket.on("remoteReady", function() {
        io.to(socket.roomIn).emit("remoteReady");
    })
    // when database is sent
    socket.on("database", function(tab, indexPlaylist) {
            io.to(socket.roomIn).emit("database", tab, indexPlaylist);
    })

    // events
    socket.on("togglePlay", function() {
        io.to(socket.roomIn).emit("togglePlay");
    })

    socket.on("videoPlay", function() {
        io.to(socket.roomIn).emit("videoPlay");
    })

    socket.on("videoPause", function() {
        io.to(socket.roomIn).emit("videoPause");
    })

    socket.on("autoMode", function() {
        io.to(socket.roomIn).emit("autoMode");
    })

    socket.on("autoModeStatus", function(status) {
        io.to(socket.roomIn).emit("autoModeStatus", status);
    })

    socket.on("goTime", function(direction) {
        io.to(socket.roomIn).emit("goTime",direction);
    })

    socket.on("playlistUpdate", function(direction) {
        io.to(socket.roomIn).emit("playlistUpdate", direction);
    })

    socket.on("soundUpdate", function(direction) {
        io.to(socket.roomIn).emit("soundUpdate", direction);
    })

    socket.on("mute", function() {
        io.to(socket.roomIn).emit("mute");
    })

    socket.on("changeVideo",function(index){
            io.to(socket.roomIn).emit("changeVideo", index);
    })
    socket.on("indexChange", function(index) {
        io.to(socket.roomIn).emit("indexChange", index);
    })

    // on disconnect
    socket.on("disconnect", function() {
        // if the room is in the tab and the disconnect socket is a desktop
        if(roomList.indexOf(socket.roomIn) !=-1 && socket.type=="desktop") {
           roomList.splice(roomList.indexOf(socket.roomIn),1);
           io.to(socket.roomIn).emit("disconnectP");
       }
       // if this is a remote
       else {
           io.to(socket.roomIn).emit("disconnectR");
       }

    })
});

// check if room is in the tab
function checkRoom(room) {
    for(i =0; i<roomList.length; i++) {
        if(room == roomList[i]) {
            return true;
        }

    }
    return false;
}

// server listen on 8080 port
console.log("listen on 8080 port")
http.listen(8080);
