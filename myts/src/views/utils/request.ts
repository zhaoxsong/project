import axios from "axios";
const request = axios.create({
    baseURL:'http://dida100.com:8888',
    timeout:5000
})
// 添加请求拦截器
request.interceptors.request.use(config=>{
    // 添加token
    config.headers["Authorization"] = "Bearer "+sessionStorage.getItem("token")
    return config 
})
// 添加响应拦截器
request.interceptors.response.use(res=>{
    return res.data
},err=>{
    Promise.reject(err)
})
export default request