import { Text, Tween } from "../../LayaAir";
export class GameCell extends Text{
    public cw:number = 640;
    public ch:number = 1010;
    public w:number = (this.cw-20*5)/4;
    public numVal:number = 0;
    public backColors:Array<string> = ["#eeeeee","#ece0c8","#f2b179","#f59563","#f57c5f","#f65d3b","#ead071","#ecc850","#edc53f","#fec400"];
    public static ADD:string = "add";
    public static NEW:string = "new";
    constructor(){
        super();
        this.height = this.w;
        this.width = this.w;
        this.align = "center";
        this.valign = "middle";
        this.pivot(this.w/2,this.w/2);
    }
    getMiNum():number{
        if(this.numVal != 0){
            return this.numVal.toString(2).replace("1","").length;
        }else{
            return this.numVal;
        }
    }
    updateSelf(flag:string = ""):void{
        var s =this;
        var num = s.getMiNum();
        var color = s.backColors[num-1];
        if(s.numVal.toString().length<=2)
            s.fontSize = 80
        else if(s.numVal.toString().length ==3)
            s.fontSize = 65
        else
            s.fontSize = 50
        if(num-1>=s.backColors.length)
            color = "#232628";
        if(!color)
        {
            s.removeSelf();
        }
        else
        {
            s.text = s.numVal.toString();
            s.bgColor = color;
            s.color = "#ffffff";
            if(s.numVal == 2 || s.numVal ==4)
                s.color = "#000000";
            if(flag == GameCell.NEW)
            {
                s.scale(0.01,0.01);
                Tween.to(s,{scaleX:1,scaleY:1},100);
            }
            else if(flag == GameCell.ADD)
            {
                s.scale(1.1,1.1);
                Tween.to(s,{scaleX:1,scaleY:1},100);
            }
        }
    }
    clone():GameCell{
        var s = this;
        var cloneNode = new GameCell();
        cloneNode.text = s.text;
        cloneNode.bgColor = s.bgColor;
        cloneNode.color = s.color;
        cloneNode.x = s.x;
        cloneNode.y = s.y;
        return cloneNode;
    }
}