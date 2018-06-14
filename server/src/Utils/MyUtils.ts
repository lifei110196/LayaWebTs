import {Promise} from 'es6-promise'
export class MyUtils{
    constructor(){

    }
    /**
     * 
     * @param fuc 要执行的步骤 至少接收两个参数 成功(t) 失败(f)
     */
    public static getPlace(fuc:Function):any{
        return new Promise((t,f)=>{
            fuc(t,f);
        })
    }
}