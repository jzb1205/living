<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import {reactive,toRefs} from 'vue'
import axios from "./axios/index.js"
const userInfo = reactive({
  username:'',
  password:''
})

const register = ()=>{
  axios(
    {
      url:"/api/register",
      method:"post",
      data:{
       username:userInfo.username,
       password:userInfo.password
      }
    }
).then(function (response){
  console.log(response);})
}
</script>

<template>
{{userInfo}}
  <a-input v-model:value="userInfo.username" placeholder="username" />
  <a-input v-model:value="userInfo.password" placeholder="password" /> 
  <a-button type="primary" @click="register">注册</a-button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
