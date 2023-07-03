import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { message } from "antd";
// 导入成功获取失败提示
NProgress.configure({ showSpinner: false });
const request = axios.create({
    baseURL:'http://dida100.com:8888',
    timeout:5000
})
// 添加请求拦截器
request.interceptors.request.use(config=>{
    NProgress.start();
    // 添加token
    config.headers["Authorization"] = "Bearer "+sessionStorage.getItem("token")
    return config 
})
// 添加响应拦截器
request.interceptors.response.use(res=>{
    NProgress.done();
    if(res.data.code === 200 || res.data.code === 0){
        return res.data
    }else{
        message.warning(res?.data?.msg || "请求失败")
        return res.data
    }
},err=>{
    NProgress.done();
    console.log(err,"err");
    if(err.response.status === 404){
        message.error("请求地址错误")
    }else if(err.response.status === 401){
        message.error("没有权限")
    }else if(String(err.respone.status).startsWith("5")){
        message.error("服务器错误")
    }else{
        message.error("网络请求失败")
    }
    Promise.reject(err) 
})
export default request