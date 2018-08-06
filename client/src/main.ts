import { WebGL, Stage, MiniAdpter, Handler, wx } from './LayaAir';
import { MyUtils } from './Utils/MyUtils';
function main(): void {
    MiniAdpter.init(true, false);
    Laya.init(750, 1334, WebGL); //初始化引擎
    Laya.stage.scaleMode = Stage.SCALE_FIXED_AUTO;
    Laya.stage.alignH = Stage.ALIGN_CENTER;
    Laya.stage.alignV = Stage.ALIGN_MIDDLE;
    Laya.stage.bgColor = "#000000";
    wx.showShareMenu();
    wx.onShareAppMessage(function () {
        return MyUtils.getShareCfg();
    })
    Laya.loader.load('res/atlas/comp.atlas', Handler.create(this, (res: any) => {
        var playerId: any = wx.getStorageSync("playerId");
        var openId: any = wx.getStorageSync("openid");
        if (playerId && openId) {
            // new GameMain();
        } else {
            wx.login({
                success: (res: any) => {
                    MyUtils.request("/user/login", { code: res.code }, (res: any) => {
                        if (!res.code) {
                            wx.setStorageSync("playerId", res.id);
                            wx.setStorageSync("openid", res.openid);
                            // new GameMain();
                        }
                    });
                },
                fail: (res: any) => {

                },
                complete: (res: any) => {

                }
            })
        }

    }))
}
main();