import Root from "../views/Root";
import LoginView from "../views/LoginView";
import AdminView from "../views/admin/AdminView";
// RouterProvider路由提供器,createBrowserRouter创建浏览器路由
import { RouterProvider, createBrowserRouter } from "react-router-dom";
function RouterView(){
     // 默认的静态路由
     const staticRoutes = [{
        path: "/",element: <Root />,
        children: [
            { path: "", element: <LoginView /> },
            { path: "login", element: <LoginView /> },
            { path: "/admin", element: <AdminView /> }
        ]
     }]
      // 创建路由
      const router = createBrowserRouter(staticRoutes)
       // 返回创建路由提供器
       return (<RouterProvider router={router} />)
}
export default RouterView