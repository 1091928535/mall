export default {
    // 传递的参数不是state 是全局的context(上下文)
    addCart(context, payload) {
        // let oldPrice = null
        // for (let item of state.cartList) {
        //     if (item.iid == payload.iid) {
        //         oldPrice = item
        //     }
        // }

        // 2.查找购物车中是否有该商品
        //find方法里面的函数形参是查找当前里面的对象，由此可以判断和传递过来的payload是否相等，然后返回当前的item
        // let oldPrice = context.state.cartList.find(function(item) {
        //         return item.iid === payload.iid
        //     })
        // 使用箭头函数
        let oldPrice = context.state.cartList.find(item => item.iid === payload.iid);
        // 如果相等则在返回的item上.count+1
        if (oldPrice) {
            // 这里的修改需要commit传递到mutation里面修改
            // oldPrice.count += 1
            context.commit('addCounter', oldPrice);
        } else {
            payload.count = 1;
            // 不相等则在新payload上.count=1
            //这里的同上
            // context.state.cartList.push(payload)
            context.commit('addToCart', payload);
        }
    }
}