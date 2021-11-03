export const NT = (time) => {
    let num = time.split(':')
    num = parseInt(num[0]) * 60 + parseFloat(num[1])
    return num
}