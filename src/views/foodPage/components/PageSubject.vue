<template>
    <foodcategory :title="title" class="title" v-if="title && !emptyValue"></foodcategory>
    <div class="container-food" v-loading="loading">
        <foodCard 
        v-for="food in foodData"
        :key="food.categoryId"
        :food="food"
        >
        <template #button v-if="!food.kinds">
            <i class="iconfont icon-jianshao"></i>
            <span class="buyCount">3</span>
            <i class="iconfont icon-jia"></i>
        </template>
        <template #button v-else>
                <el-button 
                type="primary" 
                class="el-btn"  
                text
                bg>
                选择样式</el-button>
        </template>
        </foodCard>
        <el-empty description="暂时没有数据哦~" v-if="emptyValue"/>
    </div>
</template>

<script setup>
import foodCard from '@/components/foodCard/foodCard.vue'
import {  onMounted,ref,watch } from 'vue';
import { useRoute } from 'vue-router';
import getData from '../../homePage/foodData'
import foodcategory from '@/components/foodcategory/foodcategory.vue'
const allData = ref()
const foodData = ref()
const route = useRoute()
const loading = ref(false)
const emptyValue = ref(false)
const title = ref('')
const emnu = ref({
    '24小时热销榜':message => allData.value.sort(sortRules(message)),
    '周销榜': message => allData.value.sort(sortRules(message)),
    '月销榜':message => allData.value.sort(sortRules(message)),
    '总销榜':message => allData.value.sort(sortRules(message)),
})
onMounted(()=>{
const arr = []
getData().forEach((item)=>{
    item.category.forEach((category)=>{
        category.foodName = item.foodName
        arr.push(category)
    })
})
arr.sort(sortRules('sellCount'))
allData.value = arr
foodData.value = arr
})

function sortRules(props){
    return function (a,b) {
        return b[props] - a[props]
    }
}

const getIceData = (message)=>{
    if(message === 'all'){
        title.value = ''
        foodData.value = allData.value
    }
    else {
        foodData.value = allData.value.filter((item)=>item.foodName === message) || emnu.value[newval](newval)
        title.value = message
    }
    emptyValue.value = foodData.value.length === 0 ? true : false
}

//使用 watch 监听动态路由参数的变化
  watch(() => route.params.message, (newval) => {
    getIceData(newval)
    // 在参数变化时执行逻辑
  });
</script>

<style lang="less" scoped>
.container-food{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); /* 自适应列，最小宽度100px */
    grid-column-gap: 40px;
    grid-row-gap: 30px;
    width: 100%;
    margin-bottom: 40px;
    padding: 0 40px;
    // margin-top: 20px;
}

.title{
    padding: 0 40px;
    margin:20px 0 0 0;
}
.iconfont{
    font-size: 28px;
}

.el-empty{
    width: 84vw;
}

.buyCount{
    color:rgb(0, 0, 0);
    padding: 0 3px;
}

.el-btn{
    transform: translateY(-10px);
    font-size: 13px;
    width: 80px;
    height: 40px;
}
</style>