import { GetGShop } from "../../../../api/channel";
import { useState, useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
interface Iprops {
    id: string;
}
const columns: ColumnsType<any> = [
    {
        title: "店铺编号",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "店铺名称",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "区域",
        dataIndex: "area",
        key: "area",
    },
    {
        title: "业态",
        dataIndex: "type",
        key: "type",
    },
];
function GShop(shopList:any) {
    const [pagination, setPagination] = useState({
        current: 1,
        size: 2,
        total: 1,
      });
        // 商品列表
        const [list, setList] = useState([]);
        // 当分页信息current,和size变化时候,当props.id变化时获取(团购商品)商品的列表
      useEffect(()=>{
        GetGShop({
            id: shopList.id,
            current: pagination.current,
            size: pagination.size,
        }).then((res:any)=>{
            // 更新商品列表
            setList(res.data);
            // 更新分页信息
            setPagination({
                ...pagination,
                current: res.pagination.current,
                total: res.pagination.total,
            })
        })
      },[shopList.id,pagination.current,pagination.size])
    return ( <div>店铺列表
        <Table
            columns={columns}
            dataSource={list}
            pagination={pagination}
            onChange={(pagination) => {
                setPagination(pagination);
            }
        }
        />
        {/* <p>{JSON.stringify(shopList)}</p> */}
    </div> );
}

export default GShop;