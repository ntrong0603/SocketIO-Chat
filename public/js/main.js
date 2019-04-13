//tao bien ket noi server
const socket = io("http://localhost:3000");

socket.on("server-send-dk-thatbai", function(){
    alert("Sai user name, co nguoi dang ky roi");
});

socket.on("server-send-dk-thanhcong", function(data){
    $("#login-form").hide(2000);
    $("#chat-form").show(1000);
    $("#currentUser").html(data);
});
socket.on("server-send-logout-thanhcong", function(){
    alert("Logout thanh cong");
    $("#login-form").show(1000);
    $("#chat-form").hide(2000);
});

socket.on("server-send-danhsacu-user", function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class ='userOnline'>" + i + "</div>");
    });
});

socket.on("server-send-messages", function(data){
    $("#listMessages").append("<div class='ms'>"+data.user+":"+data.nd+"</div>");
});

socket.on("co-nguoi-go-chu", function(data){
    $("#thongbao").html(data);
});
socket.on("het-nguoi-go-chu", function(){
    $("#thongbao").html("");
});

$(document).ready(function(){
    $("#login-form").show();
    $("#chat-form").hide();

    $("#btnRegister").click(function(){
        socket.emit("client-send-user", $("#txtUserName").val());
    });
    $("#btnLogout").click(function(){
        socket.emit("client-send-logout");
    });
    $("#btnSend").click(function(){
        socket.emit("client-send-messages", $("#txtMessgases").val());
    });
    $("#txtMessgases").focusin(function(){
        socket.emit("toi-dang-go-chu");
    });
    $("#txtMessgases").focusout(function(){
        socket.emit("toi-het-go-chu");
    });
});