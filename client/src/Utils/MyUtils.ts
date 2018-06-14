import {Promise} from 'es6-promise'
export class MyUtils{
    //180 / Math.PI
    public static RadianToAngle:number = 57.29577951308232;
    //Math.PI / 180
    public static AngleToRadian:number = 0.017453292519943295;
    constructor(){

    }
    /**
     * 
     * @param fuc 要执行的步骤 至少接收两个参数 成功(t) 失败(f)
     */
    public static getPlace(fuc:Function):any{
        return new Promise((t,f)=>{
            fuc(t,f);
        })
    }
    /**
     * 5 6 7
     * 4   0
     * 3 2 1     
     * @param deltaX 当前位置与目标点差值x
     * @param deltaY 当前位置与目标点差值y
     * @param dNum   默认八方向
     * return 方向index
     */
    public static  calcDirByDelta(deltaX:number, deltaY:number,dNum:number = 8):number
    {
        var angle = MyUtils.calcAngleByDelta(deltaX,deltaY);
        return 0|(angle / (360/dNum));
    }

    public static calcAngleByDelta(deltaX:number, deltaY:number):number{
        var radians:number = Math.atan2(deltaY, deltaX);
        var angle:number = radians * MyUtils.RadianToAngle;
		return Math.round((angle + 360) % 360);
    }
}