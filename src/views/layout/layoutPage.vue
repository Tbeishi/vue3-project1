<template>
    <div class="common-layout" >
      <el-container>
        <el-header>
            <div class="header-left">
            <el-menu
            mode="horizontal"
            router
            :default-active="$route.path"
            >
            <img src="../../assets/picture/头像.jpg" style="height: 100%;margin:0 10px 0 30px"/>
            <span class="title">小米露零食店</span>
            <el-menu-item index="/sy">首页</el-menu-item>
            <el-menu-item :index="`/food/${$route.params.message}`">零食</el-menu-item>
            <el-menu-item index="/member">会员</el-menu-item>
            <el-input placeholder="搜索名称或类别" 
            style="width:300px;margin: auto 10px;height: 5vh;"
            @keyup.enter="SearchMethod"
            v-model="SearchValue"
            >
            <template #suffix>
                <el-icon size="20" @click="SearchMethod" style="cursor: pointer"><Search/></el-icon>
            </template>
            </el-input>
            </el-menu>
        </div>

            <div class="header-right">
            <div class="shoppingCart" @click="router.push({name:'mycart'})" ref="CartRef">
                <div :class="{'playAnimation': CartStore.CartMessage.playStart}">
                <i class="iconfont icon-gouwuchekong"></i>
                <div class="count" 
                v-show="cartcount > 0" 
                :class="{'playAnimation': CartStore.CartMessage.playCount}"
                >{{ cartcount }}</div>
                </div>
                <div class="cart">
                    <span>购物车</span>
                </div>
            </div>
            <div>
                我的订单
            </div>
            <div class="toLogin">
                去登录
            </div>
            <el-dropdown placement="bottom-end">  
          <span class="dropdown__box"> 
            <el-avatar :src="defaultAvatar" :size="30"/>
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="Message" command="profile">基本资料</el-dropdown-item>
            <el-dropdown-item :icon="PictureFilled" command="avatar">更换头像</el-dropdown-item>
            <el-dropdown-item :icon="SwitchButton">去登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
        </el-dropdown> 
    </div>   
        </el-header>
        <el-main ref="scroll">
           <router-view/>
        </el-main>
      </el-container>
    </div>
  </template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import defaultAvatar from '@/assets/picture/默认头像.jpg'
import { Search,CaretBottom,Message,PictureFilled,SwitchButton } from '@element-plus/icons-vue'
import { useRouter,useRoute } from 'vue-router'
import { useCartStore } from '@/store/cart'
const router = useRouter()
import { useScroll } from '@vueuse/core'
const scroll = ref(null)
const CartStore = useCartStore()
const CartRef = ref()
const membersChild = ref()
const SearchValue = ref()
const getScrollY = ()=>{
    const { y } = useScroll(scroll);
    watch(y,(newVal)=>{
    
    })
}
const route = useRoute()

onMounted(()=>{
    CartStore.CartMessage.left = CartRef.value.getBoundingClientRect().left
    CartStore.CartMessage.top = CartRef.value.getBoundingClientRect().top
    CartStore.CartMessage.clientWidth = CartRef.value.clientWidth
    CartStore.CartMessage.clientHeight = CartRef.value.clientHeight
    membersChild.value = route.matched[0].children[2].children
})

const cartcount = computed(()=>{
    return CartStore.Cartdata.reduce((pre,cur)=>pre + cur.count,0)
})

const SearchMethod = ()=>{
    router.push({path:`/search/${SearchValue.value}`})
}
</script>

<style lang="less" scoped>
.el-header{
    height: 8vh;
    background-color: #ffffff;
    box-shadow:2px 2px 2px 1px rgba(179, 179, 179, 0.4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-menu{
        width: 100%;
        height: 100%;
        .title{
            line-height: 8vh;
            margin-right: 30px;
            font-weight: 700;
        }
    }
    .header-left{
        display: flex;
       justify-content: center;
        align-items: center;
        height: 100%;
    }
    .header-right{
        display: flex;
        align-items: center;
        font-size: 14px;
        .shoppingCart{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 30px;
            position: relative;
            .iconfont{
                font-size: 20px;
            }
            .playAnimation{
                animation: cartScale 0.5s ease-in-out;
            }
            .count{
                background: linear-gradient(90deg,#fc9153,#f01414);
                border-radius: 16px;
                color: #fff;
                font-size: 10px;
                font-weight: 700;
                line-height: 16px;
                padding: 0 6px;
                text-align: center;
                position: absolute;
                left: 10px;
                top: -8px;
                }
           
        }
        .toLogin{
            margin: 0 30px;
        }
    }
}
::v-deep(.el-icon.el-input__icon){
    font-size: 20px;
}

.el-menu--horizontal.el-menu{
    border: none;
}

.el-menu-item{
    height: 30px;
    padding: 0 4px;
    margin: auto 20px;
}

::v-deep(.el-menu .el-menu-item:hover){
    outline: 0 !important;
    color: #2E95FB !important;
    background: #ffffff
}
::v-deep(.el-menu .el-menu-item.is-active){
    color: #2E95FB !important;
    background: #ffffff;
    // height: 30px;
}
.el-main{
    width: 90vw;
    height: 85vh;
    background-color: #ffffff;
    transform: translateX(5vw);
    margin-top: 3vh;
    box-shadow:3px 3px 3px 1px rgba(179, 179, 179, 0.6);
    border-radius: 10px;
    padding: 0;
    overflow: visible;
}

.dropdown__box{
    display: flex;
    align-items: center;
    &:focus{
    outline: none;
}
  .el-icon {
    color: #999;
    margin-left: 10px;
  }
}

@keyframes cartScale {
    0%{
        transform: scale(1);
    }
    20%{
        transform: scale(1.2);
    }
    60%{
        transform: scale(0.8);
    }
    80%{
        transform: scale(1.1);
    }
    100%{
        transform: scale(1);
    }
}
</style>