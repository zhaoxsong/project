<template>
  <div>
      <h1>一个人的信息</h1>
      <h2>姓名：{{ name }}</h2>
      <h2>年龄:{{ age }}</h2>
      <h2>年龄:{{ sex }}</h2>
      <button @click="sayHello">说话(vue3所配置的-sayHello)</button>
      <button @click="sayWelcome">说话(vue2所配置的-sayWelcome)</button>
  </div>
</template>
<script>
    export default {
      name: "App",
      data(){
        return{

          sex: "男"
        }
      },
      methods:{
        sayHello(){
          console.log("hello")
        },
        sayWelcome(){
          console.log("welcome")
        }
      },
      // 数据
      setup(){
        let name = "张三"
        let age = 18
        // 方法
        function sayHello(){
          alert('我叫'+name,'我'+age+岁了)
        }

        // 返回一个对象
        return{
          name,
          age
        }
      }
    }
</script>