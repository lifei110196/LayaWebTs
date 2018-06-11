import {Sprite,WebGL,Event,Handler,Stage} from './LayaAir';
import { TestPageView } from './View/TestPageView';
import { StepUtils } from './Utils/StepUtils';
import { GameBord } from './Game/2048/GameBord';

function main():void{
    Laya.init(640,1010,WebGL);//初始化引擎
    
    Laya.stage.scaleMode = Stage.SCALE_FIXED_HEIGHT;//固定高度
    Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
    Laya.stage.alignH = Stage.ALIGN_CENTER;
    Laya.stage.alignV = Stage.ALIGN_MIDDLE;
    Laya.stage.bgColor = "#000000";
    Laya.stage.addChild(new GameBord);
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
    a += await StepUtils.getPlace(doSmoeThings);
    a += await StepUtils.getPlace(doSmoeThings);
    return a;
}
myTest().then(v=>{
    console.log(v);//监听完成
}).catch(e=>{
    console.log(e);//捕捉错误
})
