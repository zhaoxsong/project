/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  DownOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

// 导入所有,名称Icon
import * as Icon from "@ant-design/icons";
import { Layout, Menu, Button, theme, Tabs, Dropdown } from "antd";
import Avatar from "antd/es/avatar/avatar";
// import { act } from "react-dom/test-utils";
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const { Header, Sider, Content } = Layout;

// console.log(menu);

function mapMenu(list: any) {
  // 遍历list 如果有children就递归
  // list.map从现有的数组中映射生成一个新的数组
  return list.map((item: any) => {
    const obj: any = { key: item.path.slice(7), label: item.name };
    if (item.icon2) {
      // (Icon as any) 把Icon 类型定义any
      // React.createElement 通过react对象或者字符串创建节点
      obj.icon = React.createElement((Icon as any)[item.icon2]);
    }
    if (item.children) {
      // 递归映射子节点
      obj.children = mapMenu(item.children);
    }
    return obj;
  });
}

const AdminView: React.FC = () => {
  // 用户信息
  const userInfo = JSON.parse(sessionStorage.getItem("user") || "{}");
  const menu = JSON.parse(sessionStorage.getItem("menu") || "[]");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const menuClick = (e: any) => {
    console.log(e, e.key);
    navigate(e.key);
    const item = items.find((item: any) => item.key === e.key);
    if(!item){
      items.push({key:e.key,label:e.domEvent.target.innerText})
      setItems([...items])
    }
    setActiveKey(e.key);
    // 存储tabs
    sessionStorage.setItem("tabs", JSON.stringify(items));
    // 存储key
    sessionStorage.setItem("activeKey", e.key);
  };

  useEffect(() => {
    // 如果已经刷新了页面,就不需要再次请求菜单了，如果没有刷新页面，就需要请求菜单
    if (!sessionStorage.getItem("isRefresh")) {
      sessionStorage.setItem("isRefresh", "1");
      location.reload();
    }
    // 如果没有菜单，就跳转到登录页面
    if(location.pathname == '/admin'){
      navigate(activeKey);
    }
  }, []);

  const defaultPanes = JSON.parse(sessionStorage.getItem("tabs") || `[{"key":"dash","title":"首页","label":"概况","closable":false}]`);
  const [items, setItems] = useState(defaultPanes);
  const [activeKey, setActiveKey] = useState(sessionStorage.getItem("activeKey")||defaultPanes[0].key);


   const onChange = (key: string) => {
    setActiveKey(key);
    navigate(key);
    // 存储key
    sessionStorage.setItem("activeKey", key);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane:any) => pane.key === targetKey);
    const newPanes = items.filter((pane:any) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
      navigate(key);
      // 存储key
      sessionStorage.setItem("activeKey", key);
      
    }
    // 存储tabs
      sessionStorage.setItem("tabs", JSON.stringify(newPanes));
    setItems(newPanes);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      // add();
    } else {
      remove(targetKey);
    }
  };

// 标签处理
const logout = () =>{
  sessionStorage.clear();
  navigate('/');
}

  return (
    <Layout className={collapsed?'adminView collapsed':'adminView'}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={menuClick}
          items={mapMenu(menu)}
   
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className="header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
           <div className="right">
          <Avatar src={userInfo.avatar}  icon={<UserOutlined />}/>
          <Dropdown menu={{ items:[
            {key:"1",label:<p>积分:{userInfo.score}</p>},
            {key:"2",label:<p onClick={logout}>退出</p>},
          ] }}>
            <a  style={{color:"#000",position:"relative"}}> {userInfo.name} <DownOutlined /> </a>           
          </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          <Tabs
            hideAdd
            onChange={onChange}
            activeKey={activeKey}
            type="editable-card"
            onEdit={onEdit}
            items={items}
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminView;
