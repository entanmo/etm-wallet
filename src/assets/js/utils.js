export function timestampToTime(timestamp) {
    let addZero = function (num) {
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

// 比较两个数组对象，找出不同的项组成的新的数组对象
export function compareArrObj(arr1, arr2) {
    let result = [];
    let indexs = [];
    for (let i = 0; i < arr2.length; i++) {
        let obj = arr2[i];
        let num = obj.username;
        let flag = false;
        for (let j = 0; j < arr1.length; j++) {
            let aj = arr1[j];
            let n = aj.username;
            if (n == num) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            result.push(obj);
            indexs.push(i)
        }
    }
    return {
        result,
        indexs
    }
}
// 比较两个数组对象，找出相同项组成的新的数组对象

export function compareEqualArrObj(arr1, arr2) {
    let result = [];
    let indexs = [];
    for (let i = 0; i < arr2.length; i++) {
        let obj = arr2[i];
        let num = obj.username;
        let flag = false;
        for (let j = 0; j < arr1.length; j++) {
            let aj = arr1[j];
            let n = aj.username;
            if (n == num) {
                result.push(obj);
                indexs.push(i)
            }
        }
    }
    return {
        result,
        indexs
    }
}
