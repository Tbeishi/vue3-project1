<template>
    <div class="drawerBox">
    <el-drawer v-model="drawer" 
    size="500" 
    close-on-press-escape
    @close="closeDrawer"
    @open="open"
    >
    <template #header>
      <h3>选择优惠券</h3>
    </template>
    <template #default>
      <div>
        <el-scrollbar height="100%" v-if="CouponsStore.couponsList.length > 0">
        <ul>
            <li v-for="(item,index) in CouponsStore.couponsSortList" :key="item" :class="{'active':!item.Isvalue}">
                <div class="left">
                    <div style="width: 72px;">
                    <p><i v-if="item.CouponType !== 3">¥</i>
                        <span class="price">{{ item.CouponPrice }}</span>
                        <span v-if="item.CouponType === 3">折</span>
                    </p>
                    <p class="message">{{ item.CouponWay }}</p>
                    </div>
                    <div class="context">
                        <p class="title">{{ item.CouponTitle }}</p>
                        <p class="time">{{ item.outOffDate }}到期</p>
                    </div>
                </div>
             
                <div class="right">
                    <div class="useValue" v-if="item.Isvalue">
                    <div class="content" v-show="item.isMaxCoupon">推荐</div>
                    <el-checkbox size="large" 
                    v-model="item.isChecked"
                    @change="handleChecked(index)"
                    />
                    </div>
                    <div class="noValue" v-else>
                    <div class="message">
                        <i class="iconfont icon-point"></i><span>不可用</span>
                        <p>不满足使用条件</p>
                    </div>
                    </div>
                </div>
            </li>
        </ul>
    </el-scrollbar>
    <el-empty v-else description="您暂时没有优惠卷哦~" />
      </div>
    </template>
    <template #footer>
      <div class="footer" style="flex: auto">
        <p>已选{{ Couponcount }}张，可减<i>¥</i><span class="couponPrice">{{ CouponPay }}</span></p>
        <el-button type="success" @click="post">确定</el-button>
      </div>
    </template>
  </el-drawer>
</div>
</template>

<script setup>
import { computed, ref,watch } from 'vue'
import { useCouponsStore } from '@/store/coupons'

const CouponsStore = useCouponsStore()
const drawer = ref(false)
const lastClick = ref(0)
const chooseIndex = ref(0)
const flag = ref(false)
const CouponsLength = ref(CouponsStore.usefulCouponList ? CouponsStore.usefulCouponList.length : 0)
const openDrawer = ()=>{
    drawer.value= true
}

//处理优惠卷选中框
const handleChecked = (index)=>{
    console.log('lastClick === ' + lastClick.value);
    console.log('index === ' + index);
    console.log(flag.value);
    //可用优惠卷发生变化，最后一次选中优惠卷下标改为0，并记录当前可用优惠卷长度
    if(CouponsLength.value !== CouponsStore.usefulCouponList.length || flag.value){
        lastClick.value = 0
        CouponsLength.value = CouponsStore.usefulCouponList.length
        flag.value = false
    }
    if(lastClick.value === index && !CouponsStore.usefulCouponList[index].isChecked) {
        CouponsStore.usefulCouponList[index].isChecked
        lastClick.value = 0
        chooseIndex.value = -1
    }
    
    else{
        console.log(lastClick.value);
        console.log(index);
        CouponsStore.usefulCouponList[lastClick.value].isChecked = false
        CouponsStore.usefulCouponList[index].isChecked = true
        console.log(CouponsStore.usefulCouponList);
        lastClick.value = index
        chooseIndex.value = index
    }
}

const CouponPay = computed(()=>{
    if(CouponsStore.usefulCouponList){
    const Coupon = CouponsStore.usefulCouponList.find(item=>item.isChecked)
    if(Coupon !== undefined)
    return Coupon.CouponType === 3 ? ((1- Coupon.CouponPrice * 0.1)* props.allPay).toFixed(2) : Coupon.CouponPrice.toFixed(2) 
    else{
        return 0
    }
    }
})

const Couponcount =  computed(()=>{
    if(CouponsStore.usefulCouponList){
        let res = 0
        CouponsStore.usefulCouponList.forEach((item)=>{
            if(item.isChecked) res ++
        })
        return res
    }
    return 0
})

const closeDrawer = ()=>{
    if(flag.value) {
        lastClick.value = 0
        chooseIndex.value = 0
    }
    emit('revisePay',chooseIndex.value)
}

const post = ()=>{
    drawer.value= false
}

const open = ()=>{
    // console.log('lastClick === ' + lastClick.value);
    // console.log('chooseIndex === ' + chooseIndex.value);
    if(CouponsStore.oldconponsList.length === CouponsStore.conponsList.length){
            CouponsStore.oldconponsList.forEach((item,index)=>{
            if(item.id !== CouponsStore.conponsList[index].id || item.coupon !== CouponsStore.conponsList[index].coupon)
             flag.value = true
        })
    }
}

defineExpose({
    openDrawer
})

const emit = defineEmits(['revisePay'])

const props = defineProps({
    allPay:Number,
    flag:Boolean,
})

</script>

<style lang="less" scoped>
.footer{
    height: 70px;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0 25px;
    color:#000;
    p{
        margin-right: 15px;
        i{
            color: #ff0000;
        }
        .couponPrice{
            color: #ff0000;
            font-size: 25px;
        }
    }
}

li{
    background-color: #ffffff;
    width: 100%;
    height: 120px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 20px;
    position: relative;
    margin-bottom: 10px;
    &:last-child{
        margin-bottom: 0px;
    }
    &.active{
        // background-color:#ffffff9f;
        opacity: 0.5;
    }
    .left{
        display: flex;
        margin-left: 10px;
        color: #ff0000;
        p{
            line-height: 25px;
            text-align: center;
        }
        .price{
            font-size: 30px;
        }
        .message{
            font-size: 13px;
            color: rgb(172, 173, 173);
        }
        .context{
            margin-left: 25px;
            p{
                line-height: 27px;
            }
        }
        .title{
            font-weight: 700;
            font-size: 20px;
            color: #000;
        }
        .time{
            margin-top: 3px;
            color: #ff0000;
            font-size: 13px;
        }
    }
}

.right{
    .content{
        height: 25px;
        background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
        border-radius: 5px;
        color: #ffffff;
        text-align: center;
        line-height: 25px;
        z-index: 999;
        line-height: 25px;
        position: absolute;
        padding: 0 8px;
        top:12px;
        right: 32px;
        &::after{
        content: '';
        position: absolute;
        height: 10px;
        width: 10px;
        transform: translateX(-50%) rotate(225deg) ;
        bottom: -4.5px;
        left: 50%;
        z-index: -1;
        background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
        clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
    }
    }
    .noValue{
        .message{
            color: #ff4d00;
            font-size: 15px;
            text-align: center;
            p{
                font-size: 12px;
                line-height: 30px;
                color: #ff4d00d7;
                margin-top: 3px;
            }
            }
        i{
            color: #ffffff;
            background: #ff4d00;
            padding: 2px;
            border-radius: 50%;
            font-size: 15px;
            margin-right: 5px;
        }
    }
}
::v-deep(.el-checkbox){
    size:100px;
    margin-right: 35px;
}

::v-deep(.el-checkbox__inner){
    border-radius: 50%;
    scale: 1.6;
}

::v-deep(.el-drawer__body){
    padding: 12px 10px 12px 20px;
    background-color:  #efefef;
}

::v-deep(.el-drawer__header){
    padding: 20px 20px;
    margin: 0;
    font-size: 15px;
}

::v-deep(.el-drawer__footer){
    padding: 0;
}
</style>