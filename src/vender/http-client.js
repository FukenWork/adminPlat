import axios from 'axios'
import { message } from 'antd'

/**
 * 超时时间
 */

axios.defaults.timeout = 15000;

/**
 * 请求次数
 */
axios.defaults.retry = 3;

/**
 * 请求间隙
 */
axios.defaults.retryDelay = 1000;

/**
 * 请求参数的拦截
 */
axios.interceptors.request.use((config) => {
    // const { method, data } = config;
    // 在 node.js的服务中是使用的 but 在java的服务中不需要，此项目本人启用的是spring boot;
    // if (method.toLowerCase() === 'post' && typeof data === 'object') {
    //     config.data = qs.stringify(data);
    // }
    let token = localStorage.getItem('token')
    if (token) {
        token = 'bearer ' + token.replace(/'|"/g, '') // 把token加入到默认请求参数中

        config.headers.common['Authorization'] = token
    }
    return config
})

/**
 * 相应拦截器
 */
axios.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        console.log(err.response);
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    message.error('没有授权')
                    break;
                case 400:
                    message.error('参数错误')
                    break;
                case 404:
                    message.error('请求路径错误')
                    break;
                case 500:
                    messge.error('服务器错误')
                default:
                    break;
            }
        } else {
            message.error('服务器错误')
        }
        return Promise.reject(err)
    })