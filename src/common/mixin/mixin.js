import { debounce } from 'common/debounce/debounce.js'
import BackTop from 'components/content/backTop/BackTop.vue'

export const Mixin = {
    data() {
        return {
            itemImage: null,
            // 把refresh设置为一个变量.可以让混入的对象直接调用
            refresh: null
        }
    },
    mounted() {
        // 因为这里返回的是一个函数，所以可以直接在$bus.$on里面直接调用，不要再debounce里面加上括号，不然就会被调用了
        this.refresh = debounce(this.$refs.scroll.refresh, 50)
            // 要在组件结束后就监听服务器传递过来的数据
            //把监听imgload事件的函数抽离出来
        this.itemImage = () => {
                //这里的refresh会调用多次，性能不好，需要设置一个防抖函数
                this.refresh()
            }
            // 不要再created函数里监听，里面的dom和refs可能都没创建完成
        this.$bus.$on('imgLoad', this.itemImage)
    }
}

export const BackTopMixin = {
    data() {
        return {
            isshow: false,
        }
    },
    components: {
        BackTop,
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 1000)
        },
        BackTopShow(position) {
            this.isshow = Math.abs(position.y) > 1000
        },
    }
}