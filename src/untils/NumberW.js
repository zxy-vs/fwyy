export const NumberW = (num)=>{
    if(num<=10_000){
        return num
    }else if(num>10_000 && num<=100_000_000){
        return (parseInt(num/10_000)+'万')
    }else if(num>100_000_000){
        return (parseInt(num/100_000_000)+'亿')
    }
}