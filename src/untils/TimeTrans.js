 export const Time = (num)=>{
    var time = new Date(num)
    return(time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate())
 }