import { Login,GetRouterList } from "../api/auth";
import {useNavigate} from 'react-router-dom'
import { Button, Checkbox, Form, Input, Carousel } from "antd";
function LoginView() {
    // 创建导航器
    const navigate = useNavigate();
    // 单击登录执行内容
  const onFinish = (values: any) => {
    // values 是表单的值
    console.log("Success:", values);
    // 调用登录接口
    Login(values)
    .then((res:any) => {
        if(res.code === 200){
            // 登录成功,存储用户信息与token
            sessionStorage.setItem('user',JSON.stringify(res.user))
            sessionStorage.setItem('token',res.token)
            // 获取路由列表
            GetRouterList()
            .then((res:any) => {
                // 获取路由成功,存储路由列表
                sessionStorage.setItem('route',JSON.stringify(res.route))
                sessionStorage.setItem('menu',JSON.stringify(res.list))
                // 清空tabs
                sessionStorage.removeItem('tabs')
                // 清空激活的key
                sessionStorage.removeItem('activeKey')
                // 跳转到admin页面
                navigate('/admin')
            })
            .catch(err=>console.log(err))
        }
    })
    .catch(err=>console.log(err))
  };
  return ( <div className="loginView"> 
  <div className="loginBox">
    <h3><span>快团团</span> 登录</h3>
    <Form
  name="login"
  labelCol={{ span: 0 }}
  wrapperCol={{ span: 24 }}
  style={{ maxWidth: 600 }}
  initialValues={{ remember: true }}
  onFinish={onFinish}    
  autoComplete="off"
>
  <Form.Item
    label=""
    name="name"
    rules={[{ required: true, message: '请输入用户名' }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label=""
    name="password"
    rules={[{ required: true, message: '请输入密码' }]}
  >
    <Input.Password />
  </Form.Item>

  <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset:0, span: 16 }}>
    <Checkbox>7天免登录</Checkbox>
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
    <Button type="primary" htmlType="submit" block>
     登录
    </Button>
  </Form.Item>
</Form>
  </div>
  <div className='carousel'>
  <Carousel  autoplay>
    <div>
     <img src="http://qiaokun.yuepong.com/banner1.png" width="200"/>
    </div>
    <div>
    <img src="http://qiaokun.yuepong.com/banner2.png"  width="200"/>
    </div>
    <div>
    <img src="http://qiaokun.yuepong.com/banner3.png"  width="200"/>
    </div>
    <div>
    <img src="http://qiaokun.yuepong.com/banner4.png"  width="200"/>
    </div>
  </Carousel>
  </div>
</div> );
    
}
export default LoginView;
