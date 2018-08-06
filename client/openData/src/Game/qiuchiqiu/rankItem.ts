import { Ui } from "../../Ui/layaUI.max.all";
import { FriendCloudData } from "./KVData";

export class rankItem extends Ui.rankItemUI {
    constructor() {
        super();
    }

    set dataSource (val:FriendCloudData) {
        this._dataSource = val;
        if(!val) return;
        this.mcLabel.text = val.index + '';
        this.x1.visible = false;
        this.x2.visible = true;
        if (val.index == 1){
            this.x1.visible = true;
            this.x2.visible = false;
        }
        this.uHead.skin = ""
        this.uHead.skin = val.avatarUrl;
        this.uScore.text = val.scoreVal +'';
        this.uName.text = val.nickname;
        if (val.index <=3){
            this.mingci.skin = "comp/" + val.index+".png"
            this.mingci.visible = true;
            this.mcLabel.visible = false;
        }else{
            this.mingci.visible = false;
            this.mcLabel.visible = true;
        }
    }
}