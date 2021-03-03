// 导入
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutation'
import actions from './actions'
import getters from './getters'
// 安装插件
Vue.use(Vuex)

// 创建实例
let state = {
    cartList: []
}

const store = new Vuex.Store({
    state,
    // mutation 适合单一的修改 不适合多次的修改
    mutations,
    actions,
    getters,
})

// 导出，挂载到vue实例上
export default store