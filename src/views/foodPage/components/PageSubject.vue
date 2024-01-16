<template>
    <div>
    <foodcategory :title="title" class="title" v-if="title && !emptyValue">
    <template #iconfont v-if="isRankingList">
        <i class="iconfont" 
        :class="emnu[title].iconClass"
        ></i>
    </template>
    </foodcategory>
    </div>
    <div class="container-food"         >
        <foodCard 
        v-for="food in foodData"
        :key="food.categoryId"
        :food="food"
        >
        <template #sellCount v-if="isRankingList">
            <span>{{ RankingList }}</span>
            <p class="count">{{ food[emnu[title].sellMessage] }}</p>
        </template>
        <template #sellCount v-else>
            <span>{{ RankingList }}</span>
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
        <div>
        <div>
        <el-empty description="暂时没有数据哦~" v-if="emptyValue"/>
        </div>
        <transition appear  
        @before-appear="beforeEnter"
        @after-appear="afterEnter"
        @after-leave="handleAnimationEnd"
        v-for="(item,index) in showBall"
        :key="index"
        >
            <div class="ball" :style="ballStyle" v-if="item">
                <img src="../../../assets/picture/加.png" alt="">
            </div>
        </transition>
    </div>
</template>

<script setup>
import foodCard from '@/components/foodCard/foodCard.vue'
import {  onMounted,ref,watch } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import getData from '../../homePage/foodData'
import foodcategory from '@/components/foodcategory/foodcategory.vue'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
const UserStore = useUserStore()
const router = useRouter()
const  CartStore  = useCartStore()
const allData = ref()
const foodData = ref()
const route = useRoute()
const emptyValue = ref(false)
const title = ref('')
const curFood = ref()
const elLeft = ref(0) //记录所点击商品加购图标到页面左边距离
const elTop = ref(0) //记录所点击商品加购图标到页面顶部距离
const showBall = ref([])//控制小球显示
const ballStyle = ref({
    left: elLeft.value,
    top: elTop.value
})


const isRankingList = ref(false)  //是否是排行榜
const RankingList = ref('销售')  //销售，日销售,周销售,月销售,总销售
const emnu = ref({
    '24小时热销榜':{
        sellMessage:'daySellCount',
        sellContent:'日销售',
        iconClass:'icon-icon_rexiaopng',
    },
    '周销榜': {
        sellMessage:'weekSellCount',
        sellContent:'周销售',
        iconClass:'icon-benzhou',
    },
    '月销榜':{
        sellMessage:'monthSellCount',
        sellContent:'月销售',
        iconClass:'icon-yuetongyuebao_0',
    },
    '总销榜':{
        sellMessage:'sellCount',
        sellContent:'总销售',
        iconClass:'icon-huangguan',
    }
})

function sortRules(props){
    return function (a,b) {
        return b[props] - a[props]
    }
}

function filterData(message){
    return allData.value.sort(sortRules(message))
}

onMounted(()=>{
const arr = []
getData().forEach((item)=>{
    item.category.forEach((category)=>{
        category.foodName = item.foodName
        if(!UserStore.token) arr.push(category)
        else{
        const cartItem = CartStore.cartNameList.indexOf(category.categoryId)
        if(cartItem != -1) {
            category.count = CartStore.Cartdata[cartItem].count
            category.Isactive = true
        };
        arr.push(category)
        }
    })
})
arr.sort(sortRules('sellCount'))
allData.value = arr
foodData.value = arr
router.push({path:'/food'})
})

const getIceData = (message)=>{
    if(message === 'all'){
        title.value = ''
        foodData.value = allData.value
    }
    else if(isRankingList.value){
        foodData.value = filterData(emnu.value[message].sellMessage)
        title.value = message
    }
    else {
        const arr = allData.value.filter((item)=>item.foodName === message)
        arr.forEach((item)=>{
            if(item.count>0) item.Isactive = true
            else{
                item.Isactive = false
            }
            item.Ischecked = ''
        })
        foodData.value = arr
        title.value = message
    }
    emptyValue.value = foodData.value.length === 0 ? true : false
}

//使用 watch 监听动态路由参数的变化
  watch(() => route.params.message, (newval) => {
    if(emnu.value[newval] != undefined){
        isRankingList.value = true
        RankingList.value = emnu.value[newval].sellContent
    }
    else{
        isRankingList.value = false
        RankingList.value = '销售'
    }
    getIceData(newval)
    // 在参数变化时执行逻辑
  });

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
    if(!UserStore.token) router.push('/login')
    else{
    item.count ++ 
    if(item.count === 1)item.Ischecked = true
    elLeft.value = event.clientX;
    elTop.value = event.clientY;
    showBall.value.push('true')
    curFood.value = item
    }
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
.container-food{
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

.title{
    padding: 0 40px;
    margin:20px 0 0 0;
    i{
        font-size: 30px;
        margin-right: 5px;
        color:rgb(255, 0, 0)
    }
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