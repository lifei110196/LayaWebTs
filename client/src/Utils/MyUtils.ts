import {Promise} from 'es6-promise'
let wx: any = (window as any)["wx"];
import { KVData, KVValueBase } from '../Game/KVData';
export class MyUtils {
  //180 / Math.PI
  public static RadianToAngle: number = 57.29577951308232;
  //Math.PI / 180
  public static AngleToRadian: number = 0.017453292519943295;
  public static reqUrl: string = "https://jingling.xiniujoys.com"

  public static dataArr:Array<any> = [
    { title: '宁愿胖的精致，也不愿瘦的雷同！', imageUrl:'comp/1.jpg'},
    { title: '[有人@我]小姐姐都说这太魔性了！', imageUrl: 'comp/2.jpg'},
    { title: '1个球都吃不到，还感谢老铁？', imageUrl:'comp/3.jpg'}
  ];

  public static dataArr1:Array<any> = [];

  constructor() {}
  /**
  *
  * @param fuc 要执行的步骤 至少接收两个参数 成功(t) 失败(f)
  */
  public static getPlace(fuc: Function): any {
    return new Promise((t, f) => {
      fuc(t, f);
    });
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
  public static calcDirByDelta(deltaX: number, deltaY: number, dNum: number = 8): number {
    var angle = MyUtils.calcAngleByDelta(deltaX, deltaY);
    return 0 | (angle / (360 / dNum));
  }

  public static calcAngleByDelta(deltaX: number, deltaY: number): number {
    var radians: number = Math.atan2(deltaY, deltaX);
    var angle: number = radians * MyUtils.RadianToAngle;
    return Math.round((angle + 360) % 360);
  }

  public static getRandomColor(): string {
    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
  }

  public static request(url: string,data:any, success: Function = null, fail: Function = null, complete: Function = null): void {
      wx.request({
        url: MyUtils.reqUrl + url,
        data: data,
        success: (res: any) => {
            success && success(res.data);
        },
        fail: (res: any) => {
            fail && fail(res.data);
        },
        complete: (res: any) => {
            complete && complete(res.data);
        }
      });
  }

  public static async getFlag () {
    return MyUtils.getPlace((t:Function,f:Function) => {
      MyUtils.request("/user/share",{},(res:any) => {
        if(!res.code){
          t(res.state);
        }else{
          t(false)
        }
      },(res:any) => {
        t(false);
      });
    })
  }

  public static setData(key:string,value:number,success:Function = null,fail:Function = null,complete:Function = null) {
    var kvDtArr: Array<KVData> = [];
    var kvDt: KVData = new KVData();
    kvDt.key = key;
    var kvVal: KVValueBase = new KVValueBase();
    kvVal.wxgame.score = value;
    kvVal.wxgame.update_time = new Date().getTime();
    kvDt.value = JSON.stringify(kvVal);
    kvDtArr.push(kvDt);
    wx.setUserCloudStorage({
      KVDataList: kvDtArr,
      success: (res: any) => {
        success && success();
      },
      fail: (res: any) => {
        fail && fail();
      },
      complete: (res: any) => {
        complete && complete();
      }
    });
  }

  public static getShareCfg () {
    if(MyUtils.dataArr1.length == 0){
      MyUtils.dataArr1 = MyUtils.dataArr.concat();
    }
    var ranVal:number = MyUtils.dataArr1.length * Math.random() | 0;
    return MyUtils.dataArr1.splice(ranVal,1)[0];
  }
}
(window as any)["MyUtils"] = MyUtils;