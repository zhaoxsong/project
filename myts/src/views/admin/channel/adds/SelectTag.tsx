import React, { useState,useEffect } from 'react';
import { Button, Modal,Table,Image } from 'antd';
import { GetTag} from '../../../../api/channel'
import type { ColumnsType } from 'antd/es/table';
// 定义渲染的列
const columns: ColumnsType<any> = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id'},    
  {
    title: '图片',
    dataIndex: 'pic',
    key: 'pic',
    render:text=><Image src={text} width={48}/>
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }
]
function SelectTag(props:any) {
  // 标签列表
  const [tagList,setTagList] = useState([])
  // 分页
  const [pagination,setPagination] = useState({current:1,total:1,size:2})
  // 组件选择到的行
  const [selectRow,setSelectRow] = useState({})

  useEffect(()=>{
    GetTag({id:props.id,current:pagination.current,size:pagination.size})
    .then((res:any)=>{
      // 更新商品列表
      setTagList(res.data);
      // 更新分页
      setPagination({...pagination,current:res.pagination.current,total:res.pagination.total})
    
    })
    // 监听哪些数据的变化
  },[props.id,pagination.current,pagination.size])
  return (  <Modal title="选择标签" 
  open={true} 
  onOk={()=>props.onOk(selectRow)} 
  onCancel={props.onCancel}>
  <Table 
    rowKey="id"
    rowSelection={{
      type: "radio",
      // 当选择发生变化时候,更新选择的行
      onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        setSelectRow(selectedRows[0])
      }
    }}
    columns={columns} 
    dataSource={tagList} pagination={{
    total:pagination.total,
    defaultCurrent:pagination.current,
    defaultPageSize:pagination.size,
    // defaultPageSize默认分页大小,total总条数据,defaultCurrent默认当前页,onChange分页发生变化的时候
    onChange:(page,size)=>{
      // 更新分页的当页,和分页大小
      setPagination({...pagination,current:page,size:size})
    }
}} />
</Modal>);
}

export default SelectTag;