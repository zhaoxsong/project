import  {Button,Table,Image, Row,Col,Input} from 'antd'
import {useState,useEffect} from 'react'
import {GetProduce} from '../../../../api/channel'
import type { ColumnsType } from 'antd/es/table';
 
// 定义渲染的列
const columns: ColumnsType<any> = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id'},    
  {
    title: '图片',
    dataIndex: 'gallery',
    key: 'gallery',
    render:text=><Image src={text.split(',')[0]} width={48}/>
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }
]
function SelectProduct(props:any) {
  // state:leftList 列表,searchParams 搜索条件,pagination分页,leftSelect左边选中的
  // functions:技术难题 分页和搜索条件 ,获取店铺列表(渲染)
  const [leftList,setLeftList] = useState([])
  const [searchParams,setSearchParams] = useState({name:''})
  const [leftSelect,setLeftSelect] = useState<any>([])
  const [rightList,setRightList] = useState<any>([])
  const [rightSelect,setRightSelect] = useState<any>([])
  // 分页
  const [pagination,setPagination] = useState({current:1,total:1,size:10})
  useEffect(()=>{
    GetProduce({...searchParams,current:pagination.current,size:pagination.size})
    .then((res:any)=>{
      // 更新商品列表
      setLeftList(res.data);
      // 更新分页
      setPagination({...pagination,current:res.pagination.current,total:res.pagination.total})
    
    })
    // 监听哪些数据的变化
  },[searchParams,pagination.current,pagination.size])
  const toRight =()=>{
    console.log(leftSelect,"leftSelect")
    // 把左边选中内容放入到右边
    const list =leftSelect.concat(rightList);
    // 更新邮编
    setRightList(list);
    // 过滤leftList
    const  list2 = leftList.filter((item:any)=>{
       const index = leftSelect.findIndex((it:any)=>it.id==item.id);
      //  如果左边选的id在item中有就需要过滤掉返回false
        if(index!=-1){return false}else{
          // 否则保留
          return true
        }
    })
    // 更新左边
    setLeftList(list2);
    setLeftSelect([])
// 把左边选中的从左边列表中删除
  }
  const toLeft =()=>{
  
    // 右边的内容放在左边
    const list =rightSelect.concat(leftList);
    // 更新邮编
    setLeftList(list);
    // 过滤leftList
    const  list2 = rightList.filter((item:any)=>{
       const index = rightSelect.findIndex((it:any)=>it.id==item.id);
      //  如果左边选的id在item中有就需要过滤掉返回false
        if(index!=-1){return false}else{
          // 否则保留
          return true
        }
    })
    // 更新左边
    setRightList(list2);
    setRightSelect([])
// 把左边选中的从左边列表中删除
  }
  return ( <div className="selectShop">
    <div className="body">
        <div className="left">
          <Row>
            <Col span="12">
              <span className='w'>店铺</span> 
            <Input value={searchParams.name}
            onChange={(e:any)=>setSearchParams({...searchParams,name:e.target.value})}/>
           
            </Col>
            <Col span="12">
            <Button className='serch'>搜索</Button>
            </Col>
          </Row>
          <Table
             rowKey="id"
             rowSelection={{
               type: "checkbox",
               // 当选择发生变化时候,更新选择的行
               onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
                 console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                 setLeftSelect(selectedRows)
               }
             }}
             columns={columns} 
             dataSource={leftList} 
             pagination={{
             total:pagination.total,
             defaultCurrent:pagination.current,
             defaultPageSize:pagination.size,
             // defaultPageSize默认分页大小,total总条数据,defaultCurrent默认当前页,onChange分页发生变化的时候
             onChange:(page,size)=>{
               // 更新分页的当页,和分页大小
               setPagination({...pagination,current:page,size:size})
             }}}
          />
        </div>
        <div className="center">
          <Button onClick={toRight}>&gt;选择</Button>
          <Button onClick={toLeft}>&lt;取消</Button>
        </div>
        <div className="right">
        <Table  columns={columns} 
            rowKey="id"
            rowSelection={{
              type: "checkbox",
              // 当选择发生变化时候,更新选择的行
              onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                setRightSelect(selectedRows)
              }
            }}
             dataSource={rightList} />
        </div>
      
    </div>
    <div className="foot">
    <Button onClick={()=>props.onCancel()} >取消</Button>
      <Button onClick={()=>props.onOk(rightList)} type="primary">确定</Button>
      </div>
    </div> );
}

export default SelectProduct;