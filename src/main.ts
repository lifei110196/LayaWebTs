import {Sprite,WebGL,Event,Handler,Stage} from './LayaAir';
import { TestPageView } from './View/TestPageView';
import { StepUtils } from './Utils/StepUtils';

function main():void{
    Laya.init(1280,720,WebGL);//初始化引擎
    
    Laya.stage.scaleMode = Stage.SCALE_FIXED_HEIGHT;//固定高度
    Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;//自动横屏

    Laya.loader.load("../bin/res/atlas/comp.atlas",Handler.create(this,()=>{
        var t:TestPageView = new TestPageView();
        Laya.stage.addChild(t);
    }))
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
