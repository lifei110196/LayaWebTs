export  {Ui}
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module Ui {
    export class rankItemUI extends View {
		public x1:Laya.Image;
		public uHead:Laya.Image;
		public uName:Laya.Label;
		public uScore:Laya.Label;
		public mcLabel:Laya.Label;
		public mingci:Laya.Image;
		public x2:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":534,"height":76},"child":[{"type":"Image","props":{"y":-7,"x":0,"var":"x1","skin":"comp/x1.png"}},{"type":"Box","props":{"y":0,"x":8,"width":518,"height":76},"child":[{"type":"Image","props":{"y":13,"x":42,"width":50,"var":"uHead","height":50}},{"type":"Label","props":{"y":26,"x":113,"var":"uName","valign":"middle","text":"label","fontSize":24,"font":"SimHei","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":26,"x":463,"var":"uScore","valign":"middle","text":"label","fontSize":24,"font":"SimHei","color":"#ffffff","align":"right"}},{"type":"Label","props":{"x":0,"width":36,"var":"mcLabel","valign":"middle","top":0,"text":"1","fontSize":26,"font":"SimHei","color":"#ffffff","bottom":0,"align":"center"}},{"type":"Image","props":{"y":23,"x":7,"var":"mingci","skin":"comp/1.png"}}]},{"type":"Image","props":{"y":-1,"x":4,"var":"x2","skin":"comp/x2.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(Ui.rankItemUI.uiView);

        }

    }
}

module Ui {
    export class rankListUI extends View {
		public myList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"top":0,"right":0,"mouseEnabled":true,"left":0,"height":1334,"bottom":0},"child":[{"type":"List","props":{"var":"myList","repeatX":1,"height":608,"centerY":-45,"centerX":2},"child":[{"type":"rankItem","props":{"renderType":"render","runtime":"Ui.rankItemUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Ui.rankItemUI",Ui.rankItemUI);

            super.createChildren();
            this.createView(Ui.rankListUI.uiView);

        }

    }
}

module Ui {
    export class rankViewUI extends View {
		public myList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"child":[{"type":"List","props":{"width":391,"var":"myList","spaceX":21,"repeatY":1,"repeatX":4,"height":82,"centerY":236,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":82,"renderType":"render","height":82}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(Ui.rankViewUI.uiView);

        }

    }
}

module Ui {
    export class rankView2UI extends View {
		public myList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"child":[{"type":"List","props":{"width":391,"var":"myList","spaceX":21,"repeatY":1,"repeatX":4,"height":82,"centerY":-2,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":82,"renderType":"render","height":82}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(Ui.rankView2UI.uiView);

        }

    }
}
