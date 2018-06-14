import { MyUtils } from "./Utils/StepUtils";
import SocketIO = require('socket.io');
import http = require('http');
import express = require('express');
import mongoDb = require('mongodb');
var client = mongoDb.MongoClient;
var app = express();
var server = http.createServer(app);
server.listen(8087);
var io = SocketIO(server);
io.on('connection',(socket:SocketIO.Socket)=>{
    socket.emit('sbhugao',{data:'this is a message'});
})

function doSmoeThings(t:Function,f:Function):void{//异步执行方法
    var random:Number = Math.random()*10000;
    setTimeout(()=>{
        random > 5000 ? t(random):f(random);
    },random)
}
async function myTest(){//顺序执行异步方法
    var a:Number = 0;
    a += await MyUtils.getPlace(doSmoeThings);
    a += await MyUtils.getPlace(doSmoeThings);
    return a;
}
myTest().then(v=>{
    console.log(v);//监听完成
}).catch(e=>{
    console.log(e);//捕捉错误
})

