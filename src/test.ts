import {Sprite,WebGL,Event} from './LayaAir';
export class myTest{
    name:string;
    age:number;
    constructor(n:string,a:number){
        this.name = n;
        this.age = a;
        console.log(this.name,this.age);
    }
    /**
     * hello
     */
    public hello():any {
        var sp = new Sprite();
    }
}