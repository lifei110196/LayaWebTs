import {Promise} from 'es6-promise'
import { FriendCloudData, WxGameData, FriendCloudStorage } from '../Game/qiuchiqiu/KVData';
let wx: any = (window as any)["wx"];
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

    public static getRandomColor():string {
        return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
    }
    /**
     * 
     * @param data 要排序的数据 通过 wx.getFriendCloudStorage接口取到
     * @param key 根据哪个属性排序 需要与wx.getFriendCloudStorage填写的一样
     * @param orderType 排序类型 1降序  -1升序   默认降序 高的在前
     */
    public static sortDataByKey(data: Array<FriendCloudData>, key: string, orderType:number = 1):Array<FriendCloudData> {
        data = data.sort((a: FriendCloudData, b: FriendCloudData) => {
            var dt1 = a.KVDataList[0];
            var obj1: any = JSON.parse(dt1.value).wxgame;
            var dt2 = b.KVDataList[0];
            var obj2: any = JSON.parse(dt2.value).wxgame;
            if (obj1['score'] < obj2['score'])
                return orderType;
            else
                return -orderType;
        })
        var nData = data.map((obj: FriendCloudData, index: number) => {
            obj.index = index + 1;
            var wDt: WxGameData = JSON.parse(obj.KVDataList[0].value).wxgame;
            obj.scoreVal = wDt.score
            return obj;
        })
        return nData;
    }
    public static async  getFriendCloudStorageSync(key:string) {
        return MyUtils.getPlace((t: Function, f: Function) => {
          wx.getFriendCloudStorage({
            keyList: [key],
            success: (res: FriendCloudStorage) => {
                t(MyUtils.sortDataByKey(res.data,key));
            },
            fail: (res: any) => {
                t([]);
            },
            complete: (res: any) => {}
          });
        });
    }

    public static async getUserInfoByOpenId (){
        return MyUtils.getPlace((t:Function,f:Function) => {
            wx.getUserInfo({
                openIdList: ['selfOpenId'],
                lang: 'zh_CN',
                success: (res:any) => {
                    t(res.data)
                },
                fail: (res:any) => {
                    t([])
                }
            })
        })
        
    }

}
(window as any)["MyUtils"] = MyUtils;