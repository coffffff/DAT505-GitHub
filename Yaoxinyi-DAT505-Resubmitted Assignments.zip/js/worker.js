onmessage = function (e) {
    let arr = e.data.array;
    console.log(e.data.msg);
    if (e.data.msg == "arr") {
        //设置定时器
        try {
            arr = arr.sort();
            clearInterval(time2)
        } catch (error) {

        }
        let time1 = setInterval(function () {
            for (let i = 0; i < arr.length; i++) {
                arr[i].y += arr[i].speed;
                if (arr[i].y >= 80) {
                    arr[i].y = -3;
                }
            }

            postMessage(arr);
        }, 1000 / 60);
    } else {
        //设置定时器
        try {
            clearInterval(time1)
            arr = arr.reverse();
        } catch (error) {

        }
        let time2 = setInterval(function () {
            for (let i = 0; i < arr.length; i++) {
                arr[i].y -= arr[i].speed;
                if (arr[i].y <= -3) {
                    arr[i].y = 80;
                }
            }

            postMessage(arr);
        }, 1000 / 60);
    }
};