import axios from 'axios';
// import qs from 'qs';
import rxevent from 'pubsub-js';
import EventKeys from '../common/event-keys';


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
 * 请求相应拦截
 */
axios.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    if(error.response === undefined) {
        // 服务错误
        rxevent.publish(EventKeys.SERVICES_ERROR, true);
        return;
    }
    if(error.response.status === 400) {
        // 请求参数错误
        rxevent.publish(EventKeys.SERVICES_PARAMS, true);
    }
})