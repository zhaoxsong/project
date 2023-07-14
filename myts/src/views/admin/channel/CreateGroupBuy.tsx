// 创建并导入三个子组件
import AddDone from './adds/AddDone'
import AddInfo from './adds/AddInfo'
import AddProduce from './adds/AddProduce'
import Item from "antd/es/list/Item";
import { useState } from 'react'
// 导入useState与antd组件
import { Button,message,Steps,theme } from 'antd'

function CreateGroupBuy() {
    const [info,setInfo] = useState({  
        "name": "老曾团购案例",
      "startTime": "2023-07-06",
      "endTime": "2023-07-06",
      "slogan": "老曾带货折扣打断腿",
      "showHome": "1",
      "homePic": "https://m15.360buyimg.com/mobilecms/jfs/t1/90537/28/34381/94784/63ead64aFabb4d1b8/154e0b4180874a0e.jpg!cr_1125x449_0_166!q70.jpg",
      "banner": "https://m15.360buyimg.com/mobilecms/jfs/t1/90537/28/34381/94784/63ead64aFabb4d1b8/154e0b4180874a0e.jpg!cr_1125x449_0_166!q70.jpg",
      "showType": "1",
      "target": "2",
      "limitBuy": 999,
      "shop": "1219",
      "deliverWay": "2",
      "pickTime": "2023-07-07",
      "products": "544",
      "preTime": "2023-07-05",
      "tag": "98",
      "state": "1"})
    // 定义当前步骤
    const [current, setCurrent] = useState(0)
    // 定义下一步
    const next = () => {
        setCurrent(current + 1)
    }
    // 定义上一步
    const prev = () => {
        setCurrent(current - 1)
    }

    // 定义步骤条数据
const steps = [
    {
        title: '添加信息',
        content: <AddInfo info={info} setInfo={setInfo} current={current} setCurrent={setCurrent} />,
    },
    {
        title: '添加商品',
        content: <AddProduce  info={info} setInfo={setInfo} current={current} setCurrent={setCurrent}  />,
    },
    {
        title: '完成',
        content: <AddDone />,
    }
]


    // 映射出步骤条item
    const items = steps.map((item)=>({key:item.title,title:item.title}))
    return (<div>
        {/* 渲染步骤内容 */}
        <Steps current={current} items={items} />
            {steps.map((item:any,index:number)=><div key={item.title} style={{'display':current==index?'block':'none'}}>{item.content}</div>)}
            {/* {steps[current].content} */}
            {/* 控制步骤条 */}
            {/* <Button onClick={()=>prev()}>上一步</Button>
            <Button onClick={()=>next()}>下一步</Button> */}
    </div>)
}
export default CreateGroupBuy