export function debounce(fun, delay) {
    // 1.传递两个参数一个是调用refresh，一个是时间控制
    // 2.定义一个变量接收定时器
    let timer = null
        // 3.返回一个函数
    return function(...args) {
        // 4. 如果timer存在则清理上次的定时器
        if (timer) clearTimeout(timer)
            // 5.每次这个时间内如果有数据刷新都会调用，然后清理定时器，知道最后一个没有数据刷新后就会执行最后这个代码，apply是把数组保存下fun里面
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, delay)
    }
}