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
                <i class="iconfont icon-jia" @click="addFood($event,item)"></i>
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

    <transition appear  
        @before-appear="beforeEnter"
        @after-appear="afterEnter"
        @after-leave="handleAnimationEnd"
        v-for="(item,index) in showBall"
        :key="index"
        >
            <div class="ball" :style="ballStyle" v-if="item">
                <img src="../../assets/picture/加.png" alt="">
            </div>
        </transition>
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
import { useCartStore } from '@/store/cart'
const CartStore = useCartStore()
onMounted(()=>{
foodData.value = getData()
cardData.value = getCardData()
})
const elLeft = ref(0) //记录所点击商品加购图标到页面左边距离
const elTop = ref(0) //记录所点击商品加购图标到页面顶部距离
const showBall = ref([])//控制小球显示
const ballStyle = ref({
    left: elLeft.value,
    top: elTop.value
})
const foodData = ref([])
const cardData = ref([])

const beforeEnter = (el)=>{
    el.style.transform = `translate(${elLeft.value -80}px,${elTop.value - 100}px)`
    el.style.opacity = 0;
}

const afterEnter = (el)=>{
    const { left,top,clientWidth,clientHeight } = CartStore.CartMessage //购物车到网页左边和顶部的距离
    //设置小球移动的位移
    el.style.transform = `translate3d(${left-clientWidth - 10}px,${top-clientHeight-70}px,0)`
    //增加贝塞尔曲线all 500ms cubic-bezier()
    el.style.transition = 'transform .3s cubic-bezier(0.270, 0.115, 0.945, 0.535)'
    el.style.transition = 'transform .3s linear'
    showBall.value = showBall.value.map(item => false)
    el.style.opacity = 1;
}

const addFood = (event,item)=>{
    item.count ++ 
    if(item.count === 1)item.Ischecked = true
    elLeft.value = event.clientX;
    elTop.value = event.clientY;
    showBall.value.push('true')
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

const handleAnimationEnd = ()=>{
    CartStore.CartMessage.playStart = true
    // addCartData() //动画结束后才将商品数据添加到购物车
    setTimeout(()=>{
        CartStore.CartMessage.playStart = false
     },500)
}
</script>

<style lang="less" scoped>
.ball{
    width: 24px;
    height: 24px;
    position: fixed;
    border-radius: 14px;
    z-index: 999;
    img{
        width: 100%;
        height: 100%;
        animation: 1s ballScale ease-in-out;
    }
}

@keyframes ballScale {
    0%{
        transform: scale(1);
    }
    30%{
        transform: scale(0.8);
    }
    60%{
        transform: scale(0.6);
    }
    90%{
        transform: scale(0.4);
    }
    100%{
        transform: scale(0.2);
    }
}
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