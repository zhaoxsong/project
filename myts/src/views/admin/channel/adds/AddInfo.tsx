import {
  Card,
  Input,
  DatePicker,
  Upload,
  Button,
  Image,
  Checkbox,
  Radio,
  Select,
} from "antd";
const { RangePicker } = DatePicker;
import SelectTag from "./SelectTag";
import SelectShop from "./SelectShop";
import { useState } from "react";
import "../../../../css/AddInfo.scss";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import type { RadioChangeEvent } from "antd";

function AddInfo(props: any) {
  const [tag, setTag] = useState({ pic: "", id: "" });
  const { info, setInfo } = props;
  // 是否显示选择标签的弹窗
  const [showSelTag, setShowSelTag] = useState(false);
  // 是否显示选择店铺的弹窗
  const [showSelShop, setShowSelShop] = useState(false);
  // 显示店铺
  const [shops,setShops] = useState<any>([])

  //  处理上传组件的变化
  const handleChange: UploadProps["onChange"] = (
    infos: UploadChangeParam<UploadFile>
  ) => {
    // 如果状态是done
    if (infos.file.status === "done") {
      // 更新info的banner的值
      const banner = "http://dida100.com:8888" + infos.file.response.file.path;
      setInfo({ ...info, banner });
    }
  };

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <Card type="inner" title="活动信息">
        <div className="name">
          <span className="lable">团购名称 : </span>
          <Input
            size="large"
            className="input"
            value={info.name}
            onChange={(e: any) => setInfo({ ...info, name: e.target.value })}
          />
        </div>
        <div className="name">
          <span className="lable ">团购时间 : </span>
          <RangePicker
            size="large"
            format="YYYY-MM-DD HH:mm:ss"
            onChange={(arrDate, arrString) => {
              console.log(arrString);
              setInfo({
                ...info,
                startTime: arrString[0],
                endTime: arrString[1],
              });
            }}
          />
        </div>
        <div className="name">
          <span className="lable">广告语 : </span>
          <Input
            size="large"
            className="input"
            value={info.slogan}
            onChange={(e: any) => setInfo({ ...info, slogan: e.target.value })}
          />
        </div>
        <div className="name">
          <span className="lable ">首页展示 : </span>
          <Checkbox></Checkbox>
        </div>
        <div className="name">
          <span className="lable tu">首页展示图 :</span>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://dida100.com:8888/api/file/upload"
            onChange={handleChange}
          >
            {info.banner ? (
              <img
                src={info.banner}
                alt="avatar"
                style={{ width: "100%", objectFit: "cover", height: "100px" }}
              />
            ) : (
              "Upload"
            )}
          </Upload>
        </div>
        <div className="name">
          <span className="lable tu">活动主页海报 : </span>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://dida100.com:8888/api/file/upload"
            onChange={handleChange}
          >
            {info.banner ? (
              <img
                src={info.banner}
                alt="avatar"
                style={{ width: "100%", objectFit: "cover", height: "100px" }}
              />
            ) : (
              "Upload"
            )}
          </Upload>
        </div>
        <div className="name">
          <span className="lable">活动主题页展示样式 :</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>一行一列</Radio>
            <Radio value={2}>一行两列</Radio>
            <Radio value={3}>一行三列</Radio>
          </Radio.Group>
        </div>
        <div className="name">
          <span className="lable">促销标签 :</span>
          <Select
            defaultValue="团购"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "团购", label: "团购" },
              { value: "活动", label: "活动" },
            ]}
          />
          <Image
            width={60}
            height={60}
            src={tag.pic}
            rootClassName="false"
            onClick={() => setShowSelTag(true)}
            preview={false}
            fallback="data:image/png;base64,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"
          />
        </div>
        {/* <div>
          <span className="lable">选择标签 ： </span>
          {tag.pic && <Image src={tag.pic} width={48} />}
          <Button onClick={() => setShowSelTag(true)}>选择</Button>
        </div> */}
        <div className="name" >
          <div style={{marginLeft:'150px'}}>
          <span className="label">选择店铺 : </span>
          <span>{shops.map((item:any)=>item.name).join(',')}</span>
          <Button onClick={() => setShowSelShop(true)}>选择</Button>
          </div>
         
        </div>
      </Card>

      <Card type="inner" title="规则设置">
        <div className="name">
          <span className="lable">预告时间 :</span>
          <DatePicker
            size="large"
            format="YYYY-MM-DD HH:mm:ss"
            onChange={(arrDate, arrString) => {
                console.log(arrString);
                setInfo({
                    ...info,
                    preTime: arrString,
                });
            }}
          />
        </div>
        <div className="name">
          <span className="lable">活动对象 :</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>不限</Radio>
            <Radio value={2}>新用户</Radio>
          </Radio.Group>
        </div>
        <div className="name">
            <span className="lable">购买数量 :</span>
            <Input
            size="large"
            className="input"
            value={info.limitBuy}
            onChange={(e: any) => setInfo({ ...info, limitBuy: e.target.value })}
          />
        </div>
        <div className="name">
          <span className="lable">配置方式 :</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>自提</Radio>
            <Radio value={2}>配置</Radio>
          </Radio.Group>
        </div>
        <div className="name">
          <span className="lable">店铺现在 :</span>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>不限</Radio>
            <Radio value={2}>选择店铺</Radio>
          </Radio.Group>
        </div>
        <div className="name">
          <span className="lable">提货时间 :</span>
          <DatePicker
            size="large"
            format="YYYY-MM-DD HH:mm:ss"
            onChange={(arrDate, arrString) => {
              console.log(arrString);
              setInfo({
                ...info,
                preTime: arrString,
              });
            }}
          />
        </div>
      </Card>
      {/* {JSON.stringify(info)} */}
      {showSelTag && (
        <SelectTag
          onCancel={() => setShowSelTag(false)}
          onOk={(row: any) => {
            console.log("选择的row", row);
            setShowSelTag(false);
            setTag({ ...row });
            setInfo({ ...info, tag: row.id });
          }}
        />
      )}
      {showSelShop && <SelectShop 
      onCancel={() => setShowSelShop(false)}
      onOk={(rows:any) => {
        setShowSelShop(false);
        setShops(rows)
        // 更新info的shop 把id返回用字符串的形式链接起来
        setInfo({...info,shops:rows.map((item:any)=>item.id).join(',')})
      }} />}
      <Button type="primary" onClick={()=>props.setCurrent(props.current+1)}>下一步,选择商品</Button>
    </div>
  );
}

export default AddInfo;
