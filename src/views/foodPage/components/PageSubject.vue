<template>
    <foodcategory :title="title" class="title" v-if="title && !emptyValue"></foodcategory>
    <div class="container-food" v-loading="loading">
        <foodCard 
        v-for="food in foodData"
        :key="food.categoryId"
        :food="food"
        >
        <template #button v-if="!food.kinds">
            <i class="iconfont icon-jianshao" 
            :class="{'appear':food.Ischecked,'disappear':food.Ischecked === false}"
            @click="reduceFood(food)"
            ></i>
            <span class="buyCount"
            :class="{'appear':food.Ischecked,'disappear':food.Ischecked === false}"
            >{{ food.count }}</span>
            <i class="iconfont icon-jia" @click="addFood(food)"></i>
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

  const addFood = (item)=>{
    item.count ++ 
    // console.log(666);
    if(item.count === 1)item.Ischecked = true
  }

  const reduceFood = (item)=>{
    if(item.count > 1) item.count --
    if(item.count === 1) {
        item.Ischecked = false
        setTimeout(()=>{
            item.count --
        },200)
    }
  }
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


.el-empty{
    width: 84vw;
}

.el-btn{
    transform: translateY(-10px);
    font-size: 13px;
    width: 80px;
    height: 40px;
}

.buyCount{
    color:rgb(0, 0, 0);
    padding: 0 8px;
    transition: all .3s;
    position: absolute;
    right: 4.5px;
    opacity: 0;
    &.appear{
    animation: appearCount 0.6s ease forwards;
    }
    &.disappear{
    animation: disappearCount 0.2s ease forwards;
    }
}

.iconfont{
    font-size: 28px;
}

.iconfont.icon-jia{
    z-index: 2;
}

.iconfont.icon-jianshao{
  transition: all .3s;
  opacity: 0;
  position: absolute;
  right: 0;
  &.appear{
    animation: appearjianhao 0.6s ease forwards;
  }
  &.disappear{
    animation: disappearjianhao 0.4s ease forwards;
  }
}

@keyframes appearjianhao{
  0%{transform: translateX(0) rotate(540deg);opacity: 0};
  70%{opacity: 0.6;}
  100%{transform: translateX(-57.38px);opacity: 1;}
}

@keyframes disappearjianhao{
  0%{transform: translateX(-57.38px) rotate(-360deg);opacity: 1};
  50%{opacity: 0.2;}
  100%{transform: translateX(0);opacity: 0;}
}

@keyframes appearCount{
  0%{transform: translateX(0) rotate(540deg);opacity: 0};
  70%{opacity: 0.6;}
  100%{transform: translateX(-28.69px) ;opacity: 1;}
}

@keyframes disappearCount{
  0%{transform: translateX(-28.69px) rotate(-360deg);opacity: 1};
  50%{opacity: 0.2;}
  100%{transform: translateX(0);opacity: 0;}
}
</style>