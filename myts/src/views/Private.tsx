import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
// 定义props类型 通常用I开头
// 通过会把类型单独放入一个文件
interface Iprops{
    children:ReactElement
}
function Private(props:Iprops){
    if(sessionStorage.getItem('token')){
        return props.children
    }else{
        return <Navigate to="/"></Navigate>
    }
}
export default Private