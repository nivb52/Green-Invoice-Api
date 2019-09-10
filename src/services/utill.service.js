export default {
    isTokenValide
}
function isTokenValide (myDate){
    const ONE_HOUR = 60 * 60  // <-- secs  // * 1000; /* <-- ms */
    const ans = ((new Date) - myDate) < ONE_HOUR
    return ans
}
