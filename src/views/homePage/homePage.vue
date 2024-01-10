<template>
    <div class="homePage">
    <homePlayPic/>
    <div class="card-container">
        <radiusCard v-for="card in cardData" :key="card.id" :card="card"/>
    </div>
    <div v-for="food in foodData"  :key="food.foodId" :food="food" >
    <foodcategory :title="food.foodName">
    <template #more>更多</template>
    </foodcategory>
    <div class="container"> 
          <foodCard v-for="item in food.category" 
          :key="item.categoryId" 
          :food="item"   
          >
            <template #button v-if="!item.kinds">
                    <i class="iconfont icon-jia" @click="addCart"></i>
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
    </div> 
    </div>
    </div>
</template>

<script setup>
import foodcategory from '@/components/foodcategory/foodcategory.vue'
import { onMounted, ref } from 'vue'
import  getData  from './foodData'
import homePlayPic from '@/components/homePlayPic/homePlayPic.vue'
import radiusCard from '@/components/radiusCard/radiusCard.vue'
import foodCard from '@/components/foodCard/foodCard.vue';
import getCardData from './cardData'
onMounted(()=>{
foodData.value = getData()
cardData.value = getCardData()
})

const foodData = ref([])
const cardData = ref([])
const addCart = ()=>{
    
}
</script>

<style lang="less" scoped>
.homePage{
    height: 100%;
    padding: 0 70px;
    overflow: auto;
}
.card-container{
    height: 120px;
    width: 100%;
    background-color: #ffffff;
    display: flex;
}

.iconfont.icon-jia{
    font-size: 28px;
}

.container{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); /* 自适应列，最小宽度100px */
    grid-column-gap: 40px;
    grid-row-gap: 30px;
    width: 100%;
}

.el-btn{
    transform: translateY(-10px);
    font-size: 13px;
    width: 80px;
    height: 40px;
}
</style>