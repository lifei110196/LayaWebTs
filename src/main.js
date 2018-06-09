function doSmoeThings(t,f){
    var random = Math.random()*10000;
    setTimeout(()=>{
        random > 5000 ? t(random):f(random);
    },random)
}
function getPlace(fuc){
    return new Promise((t,f)=>{
        fuc(t,f);
    })
}
async function myTest() {
    var a = 0;
    a += await ttt(a);
    a += await ttt(a);
    a += await ttt(a);
    a += await ttt(a);
    return a;
}
function ttt(a){
    console.log(a);
    return getPlace(doSmoeThings);
}
myTest().then(v=>{
    console.log(v)
}).catch(v=>{
    console.log(v)
})