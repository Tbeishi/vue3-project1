<template>
    <div class="foodDetail">
    <h3 class="title">
        <i class="iconfont icon-xiangqing"></i>
        <span>商品详情</span>
    </h3>
    <div class="container">
        <div class="container-left">
        <div class="pic-container">
        <div class="bigPic">
        <el-image :src="curFood.image" style="height: 100%;"></el-image>
        </div>
        <div class="samllPic-container">
            <div class="samllPic" 
            v-for="(item,index) in selectedFood.kinds" 
            :key="item.kindsId"
            :class="{'active':curIndex === index}"
            @click = "handle(item,index)"
            ref="itemRefsList"
            >
            <el-image :src="item.image" style="height: 100%;"></el-image>
            </div>
        </div>
        </div>
        </div>
        <div class="container-right">
            <h4>名称：{{ selectedFood.categoryName }}</h4>
            <p>规格：<span class="kinds">{{ curFood.categoryName }}</span></p>
            <p>单价：<i>¥</i><span class="newPrice">{{ curFood.price }}</span></p>
            <p >购买数量：
                <i class="iconfont icon-jianshao" 
                :class="{'forbid':buyCount === 0}"
                @click="buyCount > 0 && buyCount--"
                ></i>
                <span class="buyCount">{{ buyCount }}</span>
                <i class="iconfont icon-jia" @click="buyCount++"></i>
            </p>
            <div class="btn">
                <el-button type="primary" 
                :class="{'empty':buyCount === 0}" 
                @click="addCart"
                :disabled="buyCount === 0">加入购物车</el-button>
            </div>
        </div>
    </div>

    <transition
        appear
        @before-appear="beforeEnter"
        @after-appear="afterEnter"
        v-for="(item,index) in showBall" 
        :key="index"
        @after-leave="handleAnimationEnd"
    >
        <div :style="ballStyle" class="ball" v-if="item">
        <el-image :src="curFood.image"></el-image>
        </div>
    </transition>
</div>
</template>

<script setup>
import { ref,toRefs } from 'vue';
import { usefoodDetail } from '@/store/foodDetail'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const UserStore = useUserStore()
const { selectedFood } = toRefs(usefoodDetail())
const  CartStore  = useCartStore()
const buyCount = ref(0)
const curIndex = ref(0)
const curFood = ref(selectedFood.value.kinds[0])

const showBall = ref([])//控制小球显示
const elLeft = ref(0) //当前点击加入购物车商品距离网页左边的距离
const elTop = ref(0)//当前点击加入购物车商品距离网页顶部的距离
const ballStyle = ref({
    left: elLeft.value,
    top: elTop.value
})
const itemRefsList = ref([])
const props = defineProps({
    CartMessage:{
        type:Object,
    }
})
const handle = (item,index)=>{
    curIndex.value = index
    curFood.value = item
    buyCount.value = 0
}

const addCart = ()=>{
    if(!UserStore.token) router.push('/login')
    else{
    showBall.value.push('true')
    // console.log(curFood.value);
    elLeft.value = itemRefsList.value[curIndex.value].getBoundingClientRect().left
    elTop.value = itemRefsList.value[curIndex.value].getBoundingClientRect().top
    }
}

// 购物车添加商品数据的方法
const addCartData = ()=>{
    const id = curFood.value.kindsId
    if(!CartStore.cartNameList.includes(id)){
        CartStore.cartNameList.push(id)
        curFood.value.name = selectedFood.value.categoryName
        curFood.value.count = buyCount.value
        CartStore.Cartdata.push(curFood.value)
    }
    else{
        const index = CartStore.cartNameList.indexOf(id)
        CartStore.Cartdata[index].count += buyCount.value
    }
}

const beforeEnter = (el)=>{
    el.style.transform = `translate3d(${elLeft.value-30}px,${elTop.value-100}px,0)`
    el.style.opacity = 0;
}

const afterEnter = (el)=>{
    const { left,top,clientWidth,clientHeight } = CartStore.CartMessage //购物车到网页左边和顶部的距离
    //设置小球移动的位移
    el.style.transform = `translate3d(${left-clientWidth - 20}px,${top-clientHeight-70}px,0)`
    //增加贝塞尔曲线
    el.style.transition = 'transform .4s cubic-bezier(0.3,-0.25,0.7,-0.15)'
    el.style.transition = 'transform .4s linear'
    showBall.value = showBall.value.map(item => false)
    el.style.opacity = 1;
}

const handleAnimationEnd = ()=>{
    CartStore.CartMessage.playStart = true
    addCartData() //动画结束后才将商品数据添加到购物车
    setTimeout(()=>{
        CartStore.CartMessage.playStart = false
     },500)
}
</script>

<style scoped lang="less" >
.foodDetail{
    margin: 0 50px;
}

.ball{
    position: fixed;
    width: 50px;
    height: 50px;
    // border-radius: 15px;
    .el-image{
        animation: 1s ballScale ease-in-out;
        border-radius: 50%;
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

.title{
    margin-top: 20px;
    margin-bottom: 30px;
    line-height: 36px;
    i{
        font-size: 20px;
        margin-right: 5px;
        color: rgb(255, 255, 255);
        padding: 8px;
        border-radius: 50%;
        background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
    }
}
.container{
    display:flex;
    .container-left{
    
    .pic-container{
        display: flex;
        .bigPic{
        width: 400px;
        height: 400px;
        transition: all .3s;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        }
        .samllPic-container{
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: start;
            flex-wrap: wrap;
            align-items: start;
            margin-left: 10px;
            .samllPic{
            margin: 0px 5px 25px 5px;
            width: 60px;
            height: 60px;
            border: 0.5px solid #d9d9d9;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            &.active{
            border: 1.5px solid rgb(255, 3, 3)
            }
            &:nth-child(5n){
                margin-bottom: 0;
            }
        }
        }
       
    }
    }
   .container-right{
    margin-left: 40px;
    h4{
        font-size: 20px;
        font-weight: 500;
        line-height: 40px;
        color: #4a4a4a;
    }
    p{
        line-height: 40px;
        color: #4e4e4e;
        font-size: 15px;
        .kinds{
            color: #959595;
        }
        i{
            color: rgb(255, 0, 0);
            font-size: 13px;
        }
        .iconfont{
            display: inline-block;
            color: #00a0dc;
            font-size: 22px;
            transform: translateY(3px);
            cursor: pointer;
            &.forbid{
            cursor:not-allowed;
            color: #a4d4e5;
            } 
        }
        .buyCount{
            display: inline-block;
            line-height: 43px;
            margin: 0 10px;
        }
        .newPrice{
            color: rgb(255, 0, 0);
            font-size: 18px;
        }
    }

    .btn{
        margin-top: 15px;
        cursor: pointer;
        .empty{
        cursor:not-allowed;
        border-color: #a0cfff;
        background-color: #a0cfff;
        }
    }
   }
}
</style>