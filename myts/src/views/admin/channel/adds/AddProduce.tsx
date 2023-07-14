import { Table,Button,Image,Input, Row} from 'antd';
import {useState,useEffect} from 'react'
import SelectProduct from './SelectProduce';
import { UpdateGroup,CreateGroupProduce,CreateGroup} from '../../../../api/channel'
import type { ColumnsType } from 'antd/es/table';
import '../../../../css/AddInfo.scss'

function AddProduce(props:any) {
  // 团购商品
  const [gProduce,setGProduct] = useState<any>([]);
  // 是显示选择商品
  const [showSelProduce,setShowSelProduce] = useState(false);
 
// 定义渲染的列
const columns: ColumnsType<any> = [
   
  {
    title: '图片',
    dataIndex: 'gallery',
    key: 'gallery',
    render:text=><Image src={text.split(",")[0]} width={48}/>
  },
  {
    title: '名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '原价',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
  },
  {
    title:"价格",
    render:(value:any,recoder:any,index:any)=><div>
      <Input value={gProduce[index]["price"]} onChange={
        (e:any)=>{
          const list = gProduce;
          const row = list[index];
          row.price = e.target.value;
          setGProduct([...list])
        }
      }/>
    </div>
  }
]
const createGroup = async()=>{
    // 创建团购
    const {data:{insertId}} = await CreateGroup(props.info);
    console.log(insertId,"insertId");
    // 创建团购商品
  
    // 把商品的数据映射为 接口需要的格式
    const list = gProduce.map((item:any)=>{
      const obj = {...item}
    
      obj.groupBuyId=insertId,
      obj.productId=obj.id;
      delete obj.id;
      obj.salePrice = obj.price,
      obj.rank = 0;
      return  obj;
    })
    // 有多少团购商品请求接口
    // 返回的时候一个列表
    const results = Promise.all(list.map((item:any)=>CreateGroupProduce(item)))
    // 更新团购的product
    const re = UpdateGroup({id:insertId,products:(await results).map((item:any)=>item.data.insertId).join(",")})
    // 如果团购更新完毕(下一步)
     
    props.setCurrent(props.current+1);
   
    
}
  return ( <div>
    <div className='shop'><Button  type='primary' onClick={()=>setShowSelProduce(true)}>+选择商品</Button></div>
    <div>
    <Table columns={columns}  dataSource={gProduce}/>
    </div>
    {/* 显示选择商品 */}
    {showSelProduce&&<SelectProduct 
    onCancel={()=> setShowSelProduce(false)}
    onOk={(rows:any)=>{
      setShowSelProduce(false)
      setGProduct([...gProduce,...rows])
       
    }}/>}
    <div>
      {/* 上一步,下一步 */}
    <Button onClick={()=>props.setCurrent(props.current-1)}>上一步:团购基本信息</Button>
    <Button type='primary' onClick={createGroup}>创建团购</Button>
    {/* <p>{JSON.stringify(gProduce)}</p>
    <p>{JSON.stringify(props.info)}</p> */}
    </div>
  </div> );
}

export default AddProduce;