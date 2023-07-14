// 获取商品的接口
import { GetGProudce } from "../../../../api/channel";
// 状态与生命周期
import { useState, useEffect } from "react";
// 表格
import { Table,Image} from "antd";
// 列表
import type { ColumnsType } from "antd/es/table";
// props类型
interface Iprops {
  id: string;
}
// 定义渲染的列
const columns: ColumnsType<any> = [
  {
    title: "商品编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "商品图片",
    dataIndex: "gallery",
    key: "gallery",
    render:(text:string)=><Image width={80} src={text} />
  },
  {
    title: "产品名称",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "规格",
    dataIndex: "specs",
    key: "specs",
  },
  {
    title: "正常价格",
    dataIndex: "salePrice",
    key: "salePrice",
  },
  {
    title: "促销价格",
    dataIndex: "salePrice",
    key: "salePrice",
  },
  {
    title: "佣金比例",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "每人限购",
    dataIndex: "limitBuy",
    key: "limitBuy",
  },
  {
    title: "活动总量",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "剩余量",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "展示排序",
    dataIndex: "id",
    key: "id",
  },
];
function GProduce(props: Iprops) {
  // 分页信息
  const [pagination, setPagination] = useState({
    current: 1,
    size: 2,
    total: 1,
  });
  // 商品列表
  const [list, setList] = useState([]);
  // 当分页信息current,和size变化时候,当props.id变化时获取(团购商品)商品的列表
  useEffect(() => {
    GetGProudce({
      id: props.id,
      current: pagination.current,
      size: pagination.size,
    })
    .then((res: any) => {
      // 更新商品列表
      setList(res.data);
      // 更新分页信息
      setPagination({
        ...pagination,
        current: res.pagination.current,
        total: res.pagination.total,
      });
    });
    // 监听哪些数据的变化
  }, [props.id, pagination.current, pagination.size]);
  return (
    <div>
      商品列表
      <Table
        columns={columns}
        dataSource={list}
        pagination={{
          total: pagination.total,
          defaultCurrent: pagination.current,
          defaultPageSize: pagination.size,
          // defaultPageSize默认分页大小,total总条数据,defaultCurrent默认当前页,onChange分页发生变化的时候
          onChange: (page, size) => {
            // 更新分页的当页,和分页大小
            setPagination({ ...pagination, current: page, size: size });
          },
        }}
      />
      <p>{JSON.stringify(pagination)}</p>
    </div>
  );
}

export default GProduce;
