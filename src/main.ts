import * as $ from 'jquery';
import * as haha from './test';
import hehe = haha.myTest;
import {Sprite,WebGL,Event} from './LayaAir';
Laya.init(1280,720,WebGL);
var sp = new Sprite();
sp.graphics.drawRect(0,0,100,100,"red");
sp.size(100,100);
sp.on(Event.MOUSE_DOWN,this,()=>{
    sp.startDrag();
})
sp.on(Event.MOUSE_UP,this,()=>{
    sp.stopDrag();
})
Laya.stage.addChild(sp);
var a:JQuery = $("#gg");
function doSmoeThings(t:Function,f:Function):void{
    var random:Number = Math.random()*10000;
    setTimeout(()=>{
        random > 5000 ? t(random):f(random);
    },random)
}

function getPlace(fuc:Function):any{
    return new Promise((t,f)=>{
        fuc(t,f);
    })
}
async function myTest(){
    var a:Number = 0;
    a += await getPlace(doSmoeThings);
    a += await getPlace(doSmoeThings);
    return a;
}
myTest().then(v=>{
    console.log(v);
}).catch(e=>{
    console.log(e);
})
var x:hehe = new hehe("李飞",28)

export{Sprite,Event};
