export const Times = (num)=>{
    var h = parseInt(num/1000/60/60%24)
    var m = parseInt(num/1000/60%60)
    var s = parseInt(num/1000%60)
    m=m<10?'0'+m:m
    if(h>0){
        m=h*60+parseInt(m)
    }
    s=s<10?'0'+s:s
    return m+':'+s;
}