import { GetGroupBuy } from "../../../api/channel";
import {useState,useEffect} from 'react';
import SearchGroup from "./components/SearchGroup";

// --------tab
import { Space, Table, Tag,Image } from 'antd';
// 列的类型
import type { ColumnsType } from 'antd/es/table';
import type { IgroupBuy } from "../../../types/channel"; 
import { Link } from "react-router-dom";


// 定义状态
const state = ["待开始","预告中","进行中","已结束","提前结束"]

// 定义列
const columns: ColumnsType<IgroupBuy> = [
    {
      title: '活动编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '活动图片',
      dataIndex: 'banner',
      key: 'banner',
      render:(text:string)=><Image width={120} src={text} />
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render:(text:number)=><span>{state[text]}</span>
    },
    {
      title: '操作',
      render:(row)=><Link to={'/admin/channel/groupBuyDetail/'+row.id}>查看详情</Link>
    },
]

// -----------tabed
function CommunityPurchase() {
    // 搜索数据
    const [searchParams, setSearchParams] = useState({});
    // 团购列表数据
    const [groupBuyList, setGroupBuyList] = useState([]);
    // 当前搜索条件发生变化时候请求数据
    // 分页数据
    const [pagination, setPagination] = useState({current:1,size:10,total:100})
    useEffect(() => {
        GetGroupBuy({...searchParams,current:pagination.current,size:pagination.size})
        .then((res) => {
            // 更新groupBuyList
            setGroupBuyList(res.data);
            setPagination(res.pagination)
        })
    },[searchParams,pagination.current,pagination.size])
    return (<div>
        社区团购
        <SearchGroup onChange={(e:IgroupBuy)=>setSearchParams({...e})} />
        <Table rowKey="id" columns={columns} dataSource={groupBuyList} pagination={{
            total:pagination.total,
            defaultCurrent:pagination.current,
            onChange:(page,size)=>{
                // 更新分页数据
                setPagination({...pagination,current:page,size:size})
            }
        }} />
    </div>)
}

export default CommunityPurchase;