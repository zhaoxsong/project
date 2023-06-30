/* eslint-disable @typescript-eslint/no-explicit-any */

function App(){
  const num:number = 15;
  const str = 'hello ts';
  const blag:boolean = true;
  const abc:any = "我是any类型";

  // 定义数组
  // 定义number类型的数组
  const list:number[] = [1,2,3];

  // 定义Array类型的数组,数组的值必须是String类型
  const list1:Array<string> = ['1','2','3'];

  // 定义元祖
  const tuple:[number,string,boolean] = [1,'hello',true];

  // 函数定义
  function addNum(_a:number,b:string):void{
    alert(b)
    // return a*2;
  }
  const getNum = (a:string,b:string):string =>a+b;
  const re = getNum('hello','ts');
  console.log(re);
  
  // 定义对象
  const obj:object = {
    name:'mumu',
    age:18
  }
  console.log(obj);
  // 定义接口
  interface Person{
    name:string,
    age:number
  }
  const obj2:Person = {
    name:'老曾',
    age:18
  }
  console.log(obj2.name);
  
  // 接口定义函数
  interface ISum{
    (x:number,y:number):number
  }
  const sum:ISum = (x:number,y:number):number => x+y;
  console.log(sum(1,2));

  // 定义不确定
  interface IRandom{
    [propName:string]:string | number
  }
  const random:IRandom = {
    with:100,
    height:"很高",
  }
  console.log(random.with,random.height);
 let n:number | string = "1";
 n = 100;
 console.log(n);

 type Student = Person & {score?:number}
 const s:Student = {
  name:'小曾',
  age:18,
  score:-1
 }
 console.log(s);


 type Gender = '男' | '女' | '保密'
 const gen:Gender = '保密';
 console.log(gen);
 type User = {
  readonly name : string,
  password:string;
  avatar?:string;
 }
 type Staff = User&{company:string}

 const S2:Staff = {
  name:'小飞棍',
  password:'123456',
  company:'腾讯'
 }
//  s2.name = '哈哈哈';  无法被修改
// | & readonly
  console.log(S2);
 
 

  console.log(num,str,blag,abc,list,list1,tuple);



  // 泛型类型的形参
  // function print(str1:string|number,str2:string|number):string|number{
  //   console.log(str1,str2);
  //   return str1+str2;
    
  // }
  // print("你好","河南")
  // print(1,2)

  function print<T>(str1:T,str2:T):T{
    console.log(str1,str2);
    return str1;
  }
  print<string>("你好","河南")
  print<number>(1,2)
  print("abc","def")  // 类型推断
  print(5,2)  // 类型推断

  function swap<T,U>(tuple:[T,U]):[U,T]{
    return [tuple[1],tuple[0]]
  } 
  const re2 = swap(["hello",100])
  console.log(re2);
    return (<div>
       <h1>hello ts</h1>
       <h1 onClick={()=>addNum(15,"TS复杂")}>TS</h1>
    </div>)
}
export default App