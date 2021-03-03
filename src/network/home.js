import { request } from './request'

//大项目思想，不要放在request里面，需要另外创建一个对应路由的js文件里，这里面产生的所有url都由对应的路由来操作
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}