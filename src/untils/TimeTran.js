export const Times = (num)=>{
    var date = new Date(num)
    var m = date.getMinutes()
    m=m<10?'0'+m:m
    var s= date.getSeconds()
    s=s<10?'0'+s:s
    return m+':'+s;
}