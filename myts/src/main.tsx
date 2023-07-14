// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './css/channel.scss'
import {ConfigProvider} from 'antd'
// 导入中文
import zhCN from 'antd/locale/zh_CN';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
  <App />
  </ConfigProvider>
  // </React.StrictMode>,
)
