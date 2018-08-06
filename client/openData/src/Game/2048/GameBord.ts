import { Sprite, Tween, Handler, Stat, Text } from "../../LayaAir";
import { GameCell } from "./GameCell";

export class GameBord extends Sprite{ 
    private cw:number = Laya.stage.width;
    private ch:number = Laya.stage.height;
    private startX:number = null;
    private startY:number = null;
    private endX:number = null;
    private endY:number = null;
    private cells:Array<Array<GameCell>> = [];
    private newFlag:boolean = false;
    private gameOver:Array<boolean> = [true,true,true,true];
    constructor(){
        super();
        this.init();
    }
    init():void{
        var s = this;
        s.y = s.ch
        console.log(s.ch)
        this.createBord();
        this.addEvent();
        var text:Text = new Text();
        text.text="小键盘上下左右控制游戏";
        text.color = "#ffffff";
        text.fontSize = 40;
        text.width = s.cw;
        text.y = s.ch*0.05
        text.align = "center";
        text.valign = "middle";
        Laya.stage.addChild(text);
    }
    isGameOver():boolean{
        var s = this;
        var flag = false;
        for (var i in s.gameOver)
        {
            if(s.gameOver[i] == true)
            {
                flag = true;
                break;
            }
        }
        return flag;
    }
    chkOne():void{
        var s = this;
        s.removeTopNil();
        s.addTop();
        s.gameOver[0] = s.newFlag;
        s.isGameOver();
    }

    chkTwo():void{
        var s = this;
        s.removeBottomNil();
        s.addBottom();
        s.gameOver[1] = s.newFlag;
        s.isGameOver();
    }

    chkThree():void{
        var s = this;
        s.removeLeftNil();
        s.addLeft();
        s.gameOver[2] = s.newFlag;
        s.isGameOver();
    }

    chkFour():void{
        var s = this;
        s.removeRightNil();
        s.addRight();
        s.gameOver[3] = s.newFlag;
        s.isGameOver();
    }

    playGame(codeNum:number):void{
        switch(codeNum){
            case 38:
            this.chkOne();
            break;
            case 40:
            this.chkTwo();
            break;
            case 37:
            this.chkThree();
            break;
            case 39:
            this.chkFour();
            break;
            default:
            break;
        }
    }
    
    addEvent():void{
        var s = this;
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,function () {
            s.startX = Laya.stage.mouseX;
            s.startY = Laya.stage.mouseY;
        });
        Laya.stage.on(Laya.Event.MOUSE_UP,this,function () {
            var moveX = Laya.stage.mouseX - s.startX;
            var moveY = Laya.stage.mouseY - s.startY;
            if(moveY<-100)
            {
                s.playGame(38);
            }
            else if(moveY>100)
            {
                s.playGame(40);
            }
            else if(moveX<-100)
            {
                s.playGame(37);
            }
            else if(moveX>100)
            {
                s.playGame(39);
            }
            if(!s.isGameOver()) alert("GameOver!");
            s.addNewOne();
        })
        document.addEventListener("keydown",function (e) {
            s.playGame(e.keyCode);
            if(!s.isGameOver()) alert("GameOver!");
            s.addNewOne();
        });
    }
    createBord():void{
        var s = this;
        var ctx = s.graphics;
        ctx.drawRect(0,0,s.cw,s.cw,"#bbada0");
        for (var i=0;i<4;i++)
        {
            var cellCol = [];
            for(var j=0;j<4;j++)
            {
                ctx.drawRect(j*(s.cw-20*5)/4+(j+1)*20,i*(s.cw-20*5)/4+(i+1)*20,(s.cw-20*5)/4,(s.cw-20*5)/4,"#ccc0b2");
                var cell = new GameCell();
                cell.x = j*(s.cw-20*5)/4+(j+1)*20 + cell.w/2;
                cell.y = i*(s.cw-20*5)/4+(i+1)*20 + cell.w/2;
                cellCol.push(cell);
            }
            s.cells.push(cellCol);
        }
        s.newFlag = true;
        s.addNewOne();
        s.newFlag = true;
        s.addNewOne();
    }

    addNewOne():void{
        var s = this;
        if(!s.newFlag)
            return;
        s.newFlag = false;
        var ran = 0|Math.random()*1.1;
        var nilCells = [];
        for (var i=0;i<4;i++)
        {
            for (var j=0;j<4;j++)
            {
                if(s.cells[i][j].numVal == 0)
                    nilCells.push(s.cells[i][j]);
            }
        }
        var cell = nilCells[0|Math.random()*nilCells.length];
        cell.numVal = Math.pow(2,ran+1);
        cell.updateSelf(GameCell.NEW);
        s.addChild(cell);
    }

    getCell():void{
        var s = this;
        var nilCells = [];
        for (var i=0;i<4;i++)
        {
            for (var j=0;j<4;j++)
            {
                if(s.cells[i][j].numVal != 0)
                    nilCells.push([i,j]);
            }
        }
        console.log(nilCells);
    }

    removeLeftNil():void{
        var s = this;
        for(var i=0;i<4;i++)
        {
            for (var j=1;j<4;j++)
            {
                var num = j;
                if(s.cells[i][j].numVal != 0)
                {
                    while (num-1>=0 && s.cells[i][num-1].numVal == 0)
                    {
                        s.cells[i][num-1].numVal = s.cells[i][num].numVal;
                        s.cells[i][num].numVal = 0;
                        num--;
                    }
                }
                if(num!=j)
                {
                    var clone = s.cells[i][j].clone();
                    s.cells[i][j].removeSelf();
                    s.addChild(clone);
                    Tween.to(clone,{x:s.cells[i][num].x},100,null,Handler.create(this,function (t:GameCell,tt:GameCell,tx:number) {
                        s.addChild(tt);
                        tt.updateSelf();
                        t.removeSelf();
                        t.x = tx;
                    },[clone,s.cells[i][num],clone.x]));
                    s.newFlag = true;
                }
                else
                {
                }
            }
        }
    }

    addLeft():void{
        var s =this;
        for(var i=0;i<4;i++)
        {
            for (var j=0;j<4;j++)
            {
                if(s.cells[i][j].numVal!=0)
                {
                    if(j+1<4&&s.cells[i][j].numVal == s.cells[i][j+1].numVal)
                    {
                        s.cells[i][j].numVal += s.cells[i][j+1].numVal;
                        s.cells[i][j+1].numVal = 0;
                        var clone = s.cells[i][j+1].clone();
                        s.cells[i][j+1].removeSelf();
                        s.addChild(clone)
                        Tween.to(clone,{x:s.cells[i][j].x},100,null,Handler.create(this,function (t:GameCell,tt:GameCell,tx:number) {
                            t.updateSelf("add");
                            tt.removeSelf();
                            tt.x = tx;
                        },[s.cells[i][j],clone,clone.x]));
                        s.removeLeftNil();
                        s.newFlag = true;
                    }
                }
            }
        }
    }

    removeRightNil():void{
        var s = this;
        for(var i=0;i<4;i++)
        {
            for (var j=2;j>=0;j--)
            {
                var num = j;
                if(s.cells[i][j].numVal != 0)
                {
                    while (num+1<=3 && s.cells[i][num+1].numVal == 0)
                    {
                        s.cells[i][num+1].numVal = s.cells[i][num].numVal;
                        s.cells[i][num].numVal = 0;
                        num++;
                    }
                }
                if(num!=j)
                {
                    var clone = s.cells[i][j].clone();
                    s.cells[i][j].removeSelf();
                    s.addChild(clone)
                    Tween.to(clone,{x:s.cells[i][num].x},100,null,Handler.create(this,function (t:GameCell,tt:GameCell,tx:number) {
                        s.addChild(tt);
                        tt.updateSelf();
                        t.removeSelf();
                        t.x = tx;
                    },[clone,s.cells[i][num],clone.x]));
                    s.newFlag = true;
                }
                else
                {

                }
            }
        }
    }

    addRight():void{
        var s =this;
        for(var i=0;i<4;i++)
        {
            for (var j=3;j>=0;j--)
            {
                if(s.cells[i][j].numVal!=0)
                {
                    if(j-1>=0&&s.cells[i][j].numVal == s.cells[i][j-1].numVal)
                    {
                        s.cells[i][j].numVal += s.cells[i][j-1].numVal;
                        s.cells[i][j-1].numVal = 0;
                        var clone = s.cells[i][j-1].clone();
                        s.cells[i][j-1].removeSelf();
                        s.addChild(clone)
                        s.removeRightNil();
                        Tween.to(clone,{x:s.cells[i][j].x},100,null,Handler.create(this,function (t:GameCell,tt:GameCell,tx:number) {
                            t.updateSelf("add");
                            tt.removeSelf();
                            tt.x = tx;
                        },[s.cells[i][j],clone,clone.x]));
                        s.newFlag = true;
                    }
                }
            }
        }
    }

    removeBottomNil():void{
        var s = this;
        for(var j=0;j<4;j++)
        {
            for (var i=3;i>=0;i--)
            {
                var num = i;
                if(s.cells[i][j].numVal != 0)
                {
                    while (num+1<4 && s.cells[num+1][j].numVal ==0)
                    {
                        s.cells[num+1][j].numVal = s.cells[num][j].numVal;
                        s.cells[num][j].numVal = 0;
                        num++;
                    }
                    if(num!=i)
                    {
                        var clone = s.cells[i][j].clone();
                        s.cells[i][j].removeSelf();
                        s.addChild(clone);
                        Tween.to(clone,{y:s.cells[num][j].y},100,null,Handler.create(this,function (t:GameCell,tt:GameCell,ty:number) {
                            s.addChild(tt);
                            tt.updateSelf();
                            t.removeSelf();
                            t.y = ty;
                        },[clone,s.cells[num][j],clone.y]));
                        s.newFlag = true;
                    }
                    else
                    {

                    }
                }
            }
        }
    }

    addBottom():void{
        var s = this;
        for (var j=0;j<4;j++)
        {
            for (var i = 3;i>=0;i--)
            {
                if(s.cells[i][j].numVal !=0)
                {
                    if(i-1>=0 && s.cells[i][j].numVal == s.cells[i-1][j].numVal)
                    {
                        s.cells[i][j].numVal += s.cells[i-1][j].numVal;
                        s.cells[i-1][j].numVal = 0;
                        var clone = s.cells[i-1][j].clone();
                        s.cells[i-1][j].removeSelf();
                        s.addChild(clone);
                        s.removeBottomNil();
                        Tween.to(clone,{y:s.cells[i][j].y},100,null,Handler.create(this,function (t:GameCell,tt:GameCell,ty:number) {
                            t.updateSelf("add");
                            tt.removeSelf();
                            tt.y = ty
                        },[s.cells[i][j],clone,clone.y]));
                        s.newFlag = true;
                    }
                }
            }
        }
    }

    removeTopNil():void{
        var s = this;
        for(var j=0;j<4;j++)
        {
            for (var i=0;i<4;i++)
            {
                var num = i;
                if(s.cells[i][j].numVal != 0)
                {
                    while (num-1>=0 && s.cells[num-1][j].numVal ==0)
                    {
                        s.cells[num-1][j].numVal = s.cells[num][j].numVal;
                        s.cells[num][j].numVal = 0;
                        num--;
                    }
                    if(num!=i)
                    {
                        var clone = s.cells[i][j].clone();
                        s.cells[i][j].removeSelf();
                        s.addChild(clone)
                        Tween.to(clone,{y:s.cells[num][j].y},100,null,Handler.create(this,function (t:GameCell,tt:GameCell,ty:number) {
                            s.addChild(tt);
                            tt.updateSelf();
                            t.removeSelf();
                            t.y = ty;
                        },[clone,s.cells[num][j],clone.y]));
                        s.newFlag = true;
                    }
                }
            }
        }
    }

    addTop():void{
        var s = this;
        for (var j=0;j<4;j++)
        {
            for (var i = 0;i<4;i++)
            {
                if(s.cells[i][j].numVal !=0)
                {
                    if(i+1<4 && s.cells[i][j].numVal == s.cells[i+1][j].numVal)
                    {
                        s.cells[i][j].numVal += s.cells[i+1][j].numVal;
                        s.cells[i+1][j].numVal = 0;
                        var clone = s.cells[i+1][j].clone();
                        s.cells[i+1][j].removeSelf();
                        s.addChild(clone);
                        s.removeTopNil();
                        Tween.to(clone,{y:s.cells[i][j].y},100,null,Handler.create(this,function (t:GameCell,tt:GameCell,ty:number) {
                            t.updateSelf("add");
                            tt.removeSelf();
                            tt.y = ty
                        },[s.cells[i][j],clone,clone.y]));
                        s.newFlag = true;
                    }
                }
            }
        }
    }


}