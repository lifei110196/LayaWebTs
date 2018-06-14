import {WebGL,Stage,Event} from './LayaAir';
import { MyUtils } from './Utils/MyUtils';
import { GameBord } from './Game/2048/GameBord';
import * as ioClient  from 'socket.io-client'
var chat = ioClient.connect('http://localhost:8087')
    // , news = ioClient.connect('http://localhost:8087/news');
  
  chat.on('connect', function () {
    chat.emit('hi!',{data:"hello server"});
  });
  
//   news.on('news', function () {
//     news.emit('woot');
//   });
  chat.on("sbhugao",(dt:any)=>{
    console.log(dt,1);
  })
//   news.on("item",(dt:any)=>{
//     console.log(dt,2);
//   })
function main():void{
    Laya.init(640,1010,WebGL);//初始化引擎
    Laya.stage.scaleMode = Stage.SCALE_FIXED_HEIGHT;//固定高度
    Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
    Laya.stage.alignH = Stage.ALIGN_CENTER;
    Laya.stage.alignV = Stage.ALIGN_MIDDLE;
    Laya.stage.bgColor = "#000000";
    // Laya.stage.addChild(new GameBord);
    Laya.stage.on(Event.CLICK,this,()=>{
        console.log(MyUtils.calcDirByDelta(Laya.stage.mouseX-320,Laya.stage.mouseY-505));
    })
}
main();

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
