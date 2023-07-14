import request from "../views/utils/request";
// 导入定团购接口类型
import type {IgroupBuy} from "../types/channel"
// 定义获取团购列表的接口
export const GetGroupBuy=(params:IgroupBuy)=>request.get("/api/yp/groupBuy",{params})
// 定义获取店铺的接口
export const GetGShop = (params:any)=>request.get("/api/yp/shop",{params})
// 定义获取团购商品的接口
export const GetGProudce = (params:any) =>request.get("/api/yp/groupBuyProduct",{params})
// 获取标签的接口
export const GetTag = (params:any) =>request.get("/api/yp/tag",{params})
// 获取商品详情的接口
export const GetProduce = (params:any) =>request.get("/api/yp/product",{params})
// 创建团购
export const CreateGroup = (data:any) =>request.post("/api/yp/groupBuy",data)
// 创建团购商品
export const CreateGroupProduce = (data:any) =>request.post("/api/yp/groupBuyProduct",data)
// 更新团购
export const UpdateGroup = (data:any) =>request.put("/api/yp/groupBuy",data)