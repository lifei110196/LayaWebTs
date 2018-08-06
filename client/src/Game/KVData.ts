export class KVData {
    public key:string;
    public value:string;
    constructor() {
        
    }
}

export class KVValueBase {
    public wxgame: WxGameData = new WxGameData()
    constructor() {

    }
}

export class WxGameData {
    public score:number
    public update_time:number
    constructor() {
        
    }
}