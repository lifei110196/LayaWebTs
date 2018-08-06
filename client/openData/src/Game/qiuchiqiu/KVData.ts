export class KVData {
    public key:string;
    public value:string;
    constructor() {
        
    }
}

export class KVValueBase {
    public wxgame:WxGameData = new WxGameData()
    constructor() {

    }
}

export class WxGameData {
    public score:number
    public update_time:number
    constructor() {
        
    }
}

export class FriendCloudStorage {
    public errMsg:string;
    public data: Array<FriendCloudData>;
    constructor() {}
}

export class FriendCloudData {
    /**玩家头像 */
    public avatarUrl:string;
    /**玩家昵称 */
    public nickname:string;
    /**用户的openid */
    public openid:string;
    /**用户的序列化后的游戏数据 */
    public buffer:string;
    /**排行名次（需要自己赋值) */
    public index:number;
    /**keyVal */
    public KVDataList: Array<KVData>;
    /** */
    public scoreVal:number;
    constructor() {}
}