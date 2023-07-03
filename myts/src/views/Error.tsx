import {useLocation,useRouteError,Link} from 'react-router-dom'
function Error() {
  const location = useLocation();//使用导航信息
  const error:any = useRouteError();//使用路由错误信息
  return ( <div>
    <h3>页面错误😅</h3>
    <p>{location.pathname}</p>
    <p>{error.message}</p>
    <p><Link to="/admin/dash">回首页</Link></p>
  </div> );
}

export default Error;