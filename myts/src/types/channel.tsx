export interface IgroupBuy {
    banner?:     string;
    deliverWay?: string;
    endTime?:    string;
    homePic?:     string;
    id?:         number|string;
    limitBuy?:   number;
    name?:       string;
    pickTime?:   string;
    preTime?:    string;
    products?:   string;
    shop?:       string;
    showHome?:   string;
    showType?:   string;
    slogan?:     string;
    startTime?:  string;
    tag?:        string;
    target?:     string;
    size?:       number;
    current?:    number;
  }
  export interface Pagination {
    current:   number;
    pageTotal: number;
    size:      number;
    total:     number;
  }
  export interface Ires<T>{
   
      code:      number;
      data:      Array<T>;
      pagination: Pagination; 
  
  }