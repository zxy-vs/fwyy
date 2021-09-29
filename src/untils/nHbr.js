export const nHbr = (text)=>{
    const space = /\n/g;
    text = text.replace(space, "<br>")
    return text
}