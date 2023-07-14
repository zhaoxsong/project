/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs,Button  } from 'antd';
import type { TabsProps} from 'antd';
import GShop from './components/GroupShop';
import GInfo from './components/GroupInfo';
import GProduce from './components/GroupProduce';
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
// 导入接口
import  {GetGroupBuy,GetGShop,GetGProduce,GetTag} from '../../../api/channel'


const onChange = (key: string) => {
  console.log(key);
};



function  GroupBuyDetail() {
  // 定义团购信息数据
  const [groupInfo,setGroupInfo] = useState({})
  const [tag,setTag] = useState({});
  const [shopList,setShopList] = useState({});
  // 获取团购id
  const params = useParams();
  const back = ()=>{
    history.back()
  }
  // 在useEffect 请求接口
  useEffect(()=>{
    GetGroupBuy({id:params.id})
    .then(res=>{
      // 更新groupInfo
      setGroupInfo(res.data[0])
      console.log(res,"res")
      GetTag({id:res.data[0].tag})
      .then(res=>{
        setTag(res.data[0])
      })
      GetGShop(shopList).then(res=>{
        console.log(res,"res");
        setShopList(res.data[0])
      })
    })
  },[])
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `活动信息`,
      children: <GInfo tag={tag} groupInfo={groupInfo}/>,
    },
    {
      key: '2',
      label: `商品列表`,
      children: <GProduce id={params.id}/>,
    },
    {
      key: '3',
      label: `店铺列表`,
      children: <GShop shopList={shopList} />,
    },
  ];

  return ( <div>
    <Button onClick={back}>返回</Button>
    <Tabs   type="card" defaultActiveKey="1" items={items} onChange={onChange} />
  </div> );
}

 

 
export default GroupBuyDetail;