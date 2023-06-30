import request from "../views/utils/request";
// 登录的接口
export const Login = (data:any) =>request.post("/api/login",data)
// 获取当前用户路由的接口
export const GetRouterList = () =>request.get("api/yp/user_permission")