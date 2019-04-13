//khai bao thu vien
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

//khai bao port
server.listen(3000);

//khai bao cac duong dan
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var mangUser = [];

io.on("connection", function(socket){
    // console.log("Co nguoi key noi " + socket.id);
    socket.on("client-send-user", function(data){
        if(mangUser.indexOf(data)>=0){
            //fail
            socket.emit("server-send-dk-thatbai");  
        }
        else{
            //thanh cong
            mangUser.push(data);
            socket.userName = data;
            socket.emit("server-send-dk-thanhcong", data);
            io.sockets.emit("server-send-danhsacu-user", mangUser);
        }
    });

    socket.on("client-send-logout", function(){
        mangUser.splice(
            mangUser.indexOf(socket.userName), 1
        )
        socket.emit("server-send-logout-thanhcong");
        socket.broadcast.emit("server-send-danhsacu-user", mangUser);
    });

    socket.on("client-send-messages", function(data){
        io.sockets.emit("server-send-messages", {"user": socket.userName, "nd": data});
    });

    socket.on("toi-dang-go-chu", function(){
        let s = socket.userName +" dang go chu";
        io.sockets.emit("co-nguoi-go-chu", s);
    })
    socket.on("toi-het-go-chu", function(){
        io.sockets.emit("het-nguoi-go-chu");
    })
});
app.get("/", function(req, res){
    res.render("trangchu");
});