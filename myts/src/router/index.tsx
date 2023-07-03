import Root from "../views/Root";
import LoginView from "../views/LoginView";
import AdminView from "../views/admin/AdminView";
// RouterProvider路由提供器,createBrowserRouter创建浏览器路由
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "../views/Error";
import React, { lazy, Suspense } from "react";
import { Spin } from "antd";
function RouterView() {
  // 获取路由
  const route = JSON.parse(sessionStorage.getItem("route") || "[]");
  // 默认的静态路由
  const staticRoutes = [
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "", element: <LoginView /> },
        { path: "login", element: <LoginView /> },
        {
          path: "/admin",
          element: <AdminView />,
          children:route.map((item:any)=>{
            return {
               path:item.path,
               errorElement:<Error/>,
               element:<Suspense fallback={<div className="loading"><Spin /></div>}>{
                React.createElement(lazy(()=>import('../views'+item.component)))
                }</Suspense>
              }
          })
        },
      ],
    },
  ];
  // 创建路由
  const router = createBrowserRouter(staticRoutes);
  // 返回创建路由提供器
  return <RouterProvider router={router} />;
}
export default RouterView;
