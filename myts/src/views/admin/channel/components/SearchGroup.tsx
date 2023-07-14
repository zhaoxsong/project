import type { IgroupBuy } from "../../../../types/channel";
import { Card, Col, Row, Input, Button, DatePicker, Radio  } from "antd";
import type { RadioChangeEvent } from 'antd';
import '../../../../css/SearchGroup.scss'
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
// 定义props的类型
interface Iprops {
  onChange: (arg: IgroupBuy) => void;
}



const { RangePicker } = DatePicker;
function SearchGroup(props: Iprops) {
  // 组件的默认搜索数据
  const baseSearch: IgroupBuy = { id: "", name: "", startTime: "" ,endTime:''};
  // 组件的搜索条件
  const [searchParams, setSearchParams] = useState(baseSearch);

  const [placement, SetPlacement] = useState<'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'>(
    'topLeft',
  );
  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };
  const Navigate = useNavigate();
  return (
    <div>
      <Card
        type="inner"
        title="筛选查询"
        extra={<Button type="primary" onClick={()=>Navigate("/admin/channel/createGroupBuy")}  size="large">+创建团购活动</Button>}
      >
        <Row>
          <Col span={7}>
            <label>活动编号 :</label>
            <Input
            className="number"
              size="large"
              value={searchParams.id}
              onChange={(e) =>
                setSearchParams({ ...searchParams, id: e.target.value })
              }
            />
          </Col>
          <Col span={7}>
            <label>活动名称 :</label>
            <Input
              size="large"
              value={searchParams.name}
              onChange={(e) =>
                setSearchParams({ ...searchParams, name: e.target.value })
              }
            />
          </Col>
          <Col span={10}>
            <label>活动开始时间 :</label>
            <RangePicker
              size="large"
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(dates, dateStrings) => {
                console.log(dates, dateStrings);
                setSearchParams({
                  ...searchParams,
                  startTime: dateStrings.join(","),
                });
              }}
            />
            {/* <Input
              value={searchParams.startTime}
              onChange={(e) =>
                setSearchParams({ ...searchParams, startTime: e.target.value })
              }
            /> */}
          </Col>
        </Row>
        <Row>
          <Col span={7}>
            <label>参与商品 :</label>
            <Input
              size="large"
              value={searchParams.products}
              onChange={(e) =>
                setSearchParams({ ...searchParams, products: e.target.value })
              }
            />
          </Col>
          <Col span={7}>
            <label>参与门店 :</label>
            <Input
              size="large"
              value={searchParams.shop}
              onChange={(e) =>
                setSearchParams({ ...searchParams, shop: e.target.value })
              }
            />
          </Col>
          <Col span={10}>
            <label>活动结束时间 :</label>
            <RangePicker
              size="large"
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(dates, dateStrings) => {
                console.log(dates, dateStrings);
                setSearchParams({
                  ...searchParams,
                  endTime: dateStrings.join(","),
                });
              }}
            />
          </Col>
        </Row>
        <Row className="state">
        <Col >
          <span>活动状态 :</span>
          <Radio.Group   value={placement} onChange={placementChange} className="right">
            <Radio.Button value="topLeft">全部</Radio.Button>
            <Radio.Button value="topRight">待开始</Radio.Button>
            <Radio.Button value="bottomLeft">进行中</Radio.Button>
            <Radio.Button value="bottomRight">已结束</Radio.Button>
            <Radio.Button value="Right">提前结束</Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Button
            type="link"
            onClick={() => {
              setSearchParams(baseSearch);
              props.onChange(baseSearch);
            }}
          >
            重置
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setSearchParams(searchParams);
              props.onChange(searchParams);
            }}
          >
            搜索
          </Button>
        </Col>
      </Row>
      </Card>
     
    </div>
  );
}

export default SearchGroup;
