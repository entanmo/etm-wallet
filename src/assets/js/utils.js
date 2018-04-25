export function timestampToTime(timestamp) {
    var addZero = function (num) {
        if (num <= 9) {
            return '0' + num;
        }
        return num;
    }
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = addZero(date.getDate()) + ' ';
    let h = addZero(date.getHours()) + ':';
    let m = addZero(date.getMinutes()) + ':';
    let s = addZero(date.getSeconds());
    return Y + M + D + h + m + s;
}