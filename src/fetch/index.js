import axios from 'axios'
import { Message } from 'element-ui'

const instance = axios.create({});

//提示信息停留时间
const duration = 5000;

//默认超时时间30秒
instance.defaults.timeout = 30000;

//请求拦截器
instance.interceptors.request.use(config => {
    return config;
}, error => {
    Message({
        Message: '请求失败，可能是网络问题',
        type: 'error',
        duration: duration
    })
    return Promise.reject(error);
});

//响应拦截器
instance.interceptors.response.use(response => {
    return response;
}, error => {
    Message({
        Message: '响应失败！',
        type: 'error',
        duration: duration
    })
    return Promise.reject(error);
})

export default instance

