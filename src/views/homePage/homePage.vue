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
                <i class="iconfont icon-jianshao" 
                :class="{'appear':item.Ischecked,'disappear':item.Ischecked === false}"
                @click="reduceFood(item)"
                ></i>
                <span class="buyCount"
                :class="{'appear':item.Ischecked,'disappear':item.Ischecked === false}"
                >{{ item.count }}</span>
                <i class="iconfont icon-jia" @click="addFood(item)"></i>
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

const addFood = (item)=>{
    item.count ++ 
    if(item.count === 1)item.Ischecked = true
  }

  const reduceFood = (item)=>{
    if(item.count === 1) {
        item.Ischecked = false
        setTimeout(()=>{
            item.count --
        },200)
    }
    if(item.count > 1) item.count --
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