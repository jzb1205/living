<template>
  <a-layout>
    <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <template v-for="(it, i) in menuList">
          <a-menu-item :key="i" v-if="it.isShow">
            <user-outlined />
            <span class="nav-text" @click="toPage(it)">{{ it.pathName }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '82vh' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>

import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import axios from "./axios/index"
import { resType } from '@/interface'
import { useRouter } from 'vue-router'
const router = useRouter()
console.log('router', router);


const onCollapse = (collapsed: boolean, type: string) => {
  console.log(collapsed, type);
};

const onBreakpoint = (broken: boolean) => {
  console.log(broken);
};
const selectedKeys = ref<string[]>(['4'])

interface menuType {
  createdAt: string
  creator: string
  id: number
  isBtn: number
  isPower: number
  isShow: number
  parentId: number
  path: string
  pathName: string
  updatedAt: string
}

let menuList = ref<menuType[]>([])

const getMenu = () => {
  axios(
    {
      url: "/api/menu",
      method: "post",
      data: {}
    }
  ).then((res: resType): void => {
    if (res.data.code === 200) {
      menuList.value = res.data.data
      console.log('menuList', menuList.value)
    }
  })
}

const toPage = (it) => {
  router.push(it.path)
}

onMounted(() => {
  getMenu()
})

</script>
<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}
</style>
