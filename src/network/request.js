import axios from 'axios'

export function request(config) {
    // 不要写全局的axios
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })
    return instance(config)

}