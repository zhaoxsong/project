import { Image,Card,Button } from "antd";
function GInfo({ tag, groupInfo }: any) {
    const state = ["是","否"]
  return (
    <div>
      活动信息
      <Card type="inner" title="活动状态" >
        <div>待开始</div>
        <Button>提前结束</Button>
      </Card>
      <Card type="inner" title="活动信息" >
        <p>活动名称：{groupInfo.name}</p>
        <p>活动名称：{groupInfo.startTime}到{groupInfo.endTime}</p>
        <p>广告语：{groupInfo.slogan}</p>
        <p>预告时间：{groupInfo.startTime}</p>
        <p>首页展示：{state?"是":"否"}</p>
        <p>标签：<Image width={80} src={tag.pic} /></p>
        
      </Card>
      <Card type="inner" title="活动规则" >
        <p>顾客类型：不限</p>
        <p>是否限量：不限</p>
        <p>配送方式：自提</p>
        <p>提货时间：{groupInfo.preTime}</p>
        
      </Card>
      {/* <p>tag:{tag && <Image src={tag.pic} />}:any</p> */}
      {/* <p>groupInfo:{JSON.stringify(groupInfo)}</p> */}
    </div>
  );
}

export default GInfo;
