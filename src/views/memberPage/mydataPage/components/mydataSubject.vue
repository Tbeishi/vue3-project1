<template>
     <div class="content">
            <el-descriptions
    class="margin-top"
    title="个人信息"
    :column = 1
    :border="true"
  >
    <template #extra>
      <el-button type="primary" plain round size="large" @click="openDrawer">编辑个人信息</el-button>
      <dataDrawer ref="Drawer"/>
    </template>
    <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon><user /></el-icon>UID
            </div>
        </template>
        {{ UserStore.userData.UID }}
    </el-descriptions-item>
    <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon><user /></el-icon>用户名
            </div>
        </template>
        {{ UserStore.userData.username }}
    </el-descriptions-item>
    <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon><iphone /></el-icon>手机号码
            </div>
        </template>
        {{ '' || UserStore.userData.phone }}
    </el-descriptions-item>
    <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon><location /></el-icon>位置
            </div>
        </template>
        {{ '' || UserStore.userData.address }}
    </el-descriptions-item>
        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon>
                <office-building />
            </el-icon>
           收货地址
            </div>
        </template>
         {{ '' || UserStore.userData.deliveryAddress }} 
        </el-descriptions-item>
        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon>
                <Message />
            </el-icon>
           邮箱
            </div>
        </template>
        {{ UserStore.userData.email }}
        </el-descriptions-item>
    </el-descriptions>
    </div>
</template>

<script setup>
import {Iphone,Location,OfficeBuilding,User,Message} from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user';
import { ref,onMounted } from 'vue'
import dataDrawer from './dataDrawer.vue'
const UserStore = useUserStore()
const Drawer = ref()
const openDrawer = ()=>{
    Drawer.value.openDrawer()
}
onMounted(()=>{
    if(UserStore.userData.addressList.length>0)
    UserStore.userData.deliveryAddress = UserStore.userData.addressList.find(item=>item.default).address
})
</script>

<style scoped lang="less">
.el-icon{
    width: 25px;
    height: 25px;
    margin-right: 10px;
}
</style>
