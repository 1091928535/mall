export default {
    cartLength(state) {
        // 这里不需要this.store，就是在一个组件里可以直接访问
        // return this.$store.state.cartList.length
        return state.cartList.length;
    }
}