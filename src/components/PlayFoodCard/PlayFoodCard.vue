<template>
    <div class="card-container">
        <foodCard v-for="food in foodData"
            :key="food.categoryId"
            :food="food"
            >
                <template #sellCount>
                    <span>销量</span>
                    <p class="count">{{ food.sellCount }}</p>
                </template>
                <template #button v-if="!food.kinds">
                    <i class="iconfont icon-jianshao" 
                    :class="{'appear':food.Ischecked,'disappear':food.Ischecked === false,'active':food.Isactive === true}"
                    @click="reduceFood(food)"
                    ></i>
                    <span class="buyCount"
                    :class="{'appear':food.Ischecked,'disappear':food.Ischecked === false,'active':food.Isactive === true}"
                    >{{ food.count }}</span>
                    <i class="iconfont icon-jia" @click="addFood($event,food)"></i>
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
</template>

<script setup>
import { useCartStore } from '@/store/cart'
import { ref, watch } from 'vue'
import foodCard from '@/components/foodCard/foodCard.vue'
const props = defineProps({
    foodData:{
        type:Object
    }
})

const  CartStore  = useCartStore()
const curFood = ref()
const elLeft = ref(0) //记录所点击商品加购图标到页面左边距离
const elTop = ref(0) //记录所点击商品加购图标到页面顶部距离
const showBall = ref([])//控制小球显示
const ballStyle = ref({
    left: elLeft.value,
    top: elTop.value
})

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
    curFood.value = item
  }

  const reduceFood = (item)=>{
    const id = CartStore.cartNameList.indexOf(item.categoryId)
    if(item.count === 1) {
        item.Ischecked = false
        setTimeout(()=>{
            item.count --
            CartStore.cartNameList.splice(id, 1)
            CartStore.Cartdata.splice(id, 1)
        },200)
    }
    if(item.count > 1){
        item.count --
        CartStore.Cartdata[id].count = item.count
        console.log(CartStore.CartMessage.playCount);
    }
    CartStore.CartMessage.playCount = true
        setTimeout(()=>{
            CartStore.CartMessage.playCount = false
        },500)
  }

  // 购物车添加商品数据的方法
const addCartData = ()=>{
    const id = curFood.value.categoryId
    if(!CartStore.cartNameList.includes(id)){
        CartStore.cartNameList.push(id)
        curFood.value.name = curFood.value.foodName
        CartStore.Cartdata.push(curFood.value)
    }
    else{
        const index = CartStore.cartNameList.indexOf(id)
        CartStore.Cartdata[index].count = curFood.value.count
    }
}

  const handleAnimationEnd = ()=>{
    CartStore.CartMessage.playStart = true
    addCartData() //动画结束后才将商品数据添加到购物车
    setTimeout(()=>{
        CartStore.CartMessage.playStart = false
     },500)
}
</script>

<style lang="less" scoped>
.card-container{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); /* 自适应列，最小宽度100px */
    grid-column-gap: 40px;
    grid-row-gap: 30px;
    width: 100%;
    margin-bottom: 40px;
    padding: 0 40px;
    .count{
        display: inline-block;
        padding-top: 0.7px;
        padding-left: 2px;
    }
}

.ball{
    width: 24px;
    height: 24px;
    position: fixed;
    border-radius: 14px;
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
    &.active{
    transform: translateX(-32px);
    opacity: 1;
    }
    &.appear{
    animation: appearCount 0.5s ease forwards;
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
  &.active{
    transform: translateX(-70px);
    opacity: 1;
  }
  &.appear{
    animation: appearjianhao 0.5s ease forwards;
  }
  &.disappear{
    animation: disappearjianhao 0.4s ease forwards;
  }
}

@keyframes appearjianhao{
  0%{transform: translateX(0) rotate(540deg);opacity: 0};
  70%{opacity: 0.6;}
  100%{transform: translateX(-70px);opacity: 1;}
}

@keyframes disappearjianhao{
  0%{transform: translateX(-70px) rotate(-360deg);opacity: 1};
  50%{opacity: 0.2;}
  100%{transform: translateX(0);opacity: 0;}
}

@keyframes appearCount{
  0%{transform: translateX(0) rotate(540deg);opacity: 0};
  70%{opacity: 0.6;}
  100%{transform: translateX(-32px) ;opacity: 1;}
}

@keyframes disappearCount{
  0%{transform: translateX(-32px) rotate(-360deg);opacity: 1};
  50%{opacity: 0.2;}
  100%{transform: translateX(0);opacity: 0;}
}
</style>

