<template>
    <div class="header-Container">
    <ul v-for="item in headerData" :key="item.title">
        <p>{{ item.title }}：</p>
        <el-tag class="ml-2" @click="handleItem('all')">全部</el-tag>
        <li v-for="(item,index2) in item.content" :key="index2"
        :class="{'active':active === item}"
        @click="handleItem(item)"
        >{{ item }}</li>
    </ul>
 </div>
</template>

<script setup>
import { onMounted,ref } from 'vue'
import {  useRouter } from 'vue-router'
import getHeaderData from './headerData'
const router = useRouter()
const headerData = ref()
const active = ref()
onMounted(()=>{
    headerData.value = getHeaderData()
})

const handleItem = (item)=>{
    active.value = item
    router.push(`/food/${item}`)
}

const getIceData = ()=>{

}

</script>

<style lang="less" scoped>
.header-Container{
    background-color: #f3f2f2;
    padding: 10px 45px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px;
}
ul{
    display: flex;
    margin: 20px 0;
    align-items: center;
    p{
        font-weight: 700;
        font-size: 18px;
        width: 100px;
    }
    li{
        margin: 0 10px;
        color:rgb(81, 81, 82);
        font-size: 13px;
        padding: 5px;
        border-radius: 1px;
        height: 30px;
        cursor: pointer;
        &:hover{
            color:rgb(0, 166, 255);
        }
        &.active{
            color:rgb(0, 166, 255);
            border-bottom: 3px solid rgb(0, 166, 255);
        }
    }
}

.el-tag{
    margin-right: 10px;
}
</style>