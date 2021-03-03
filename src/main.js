import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 给$bus创建一个new Vue实例，可以全局使用$bus
Vue.prototype.$bus = new Vue()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')