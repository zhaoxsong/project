<template>
  <div>
    <h1>一个人的信息</h1>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <h2>工作种类:{{ job.type }}</h2>
    <h2>工作薪水:{{ job.salary }}</h2>
    <button @click="changeInfo">修改个人信息</button>
  </div>
</template>
<script>
import { ref,reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    // 数据
    let name = ref('张三')
    let age = ref(18)
    let job = reactive({
      type: '前端工程师',
      salary: '30k',
      a:{
        b:{
          C:111
        }
      }
    })
    // 不支持基本数据类型   只能响应对象形式（或复杂数据类型）
    // let number = reactive(666)  //报错
    let number = reactive({

    })  

    // 方法
    // console.log(job.value.type, job.value.salary);
    function changeInfo() {
      name.value = '李四'
      age.value = 19
      job.type = 'UI设计师'
      job.salary = '50k'
      job.a.b.C = 999
      // console.log(name,age);
    // console.log(job.value);

    }
    // 返回一个对象
    return {
      name,
      age,
      job,
      changeInfo
    }

  }
}
</script>