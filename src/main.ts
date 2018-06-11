import * as $ from 'jquery';
import {Sprite,WebGL,Event,Handler} from './LayaAir';
import { Ui } from './ui/layaUI.max.all';
import { TestPageView } from './View/TestPageView';

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

Laya.loader.load("../bin/res/atlas/comp.atlas",Handler.create(this,()=>{
    var t:TestPageView = new TestPageView();
    Laya.stage.addChild(t);
}))
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
