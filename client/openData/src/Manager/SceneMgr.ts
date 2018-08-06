export class SceneMgr{
    private _ins:SceneMgr;
    constructor(){

    }

    public get I():SceneMgr{
        return this._ins || new SceneMgr();
    }
}