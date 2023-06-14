// 导入axios
import axios from 'axios'
// 创建axios的实例
const request = axios.create({
    // 请求的基础地址(如果请求的地址省略了域名，就使用该域名)
    baseURL:'http://dida100.com:8888',
    // 请求超时时间
    timeout:5000,
})

// 请求拦截
// 1. 添加加载提示  2. 添加token
request.interceptors.request.use(function(config){
    return config;
})