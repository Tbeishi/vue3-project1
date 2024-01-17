<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title="提交订单"
            width="30%"
            center
            :open-delay="1000"
            :close-on-click-modal="false"
        >
        <div v-if="showPay">
            <h3 class="payPrice"><i>¥</i>{{ needPay }}</h3>
            <p>
                <span>用户:</span>
                <span>{{ UserStore.userData.username }}</span>
            </p>
            <p class="paymethod">
                <span>付款方式:</span>
                <span>余额支付</span>
            </p>
            <div class="content">
                <p class="title">支付工具</p>
                <div class="message">
                    <div class="left">
                        <img src="/src/assets/picture/头像.jpg" 
                        style="width:30px;height: 30px;margin: 10px 10px;"
                        >
                        <div class="left-content">
                        <span class="method">余额支付</span>
                         <span class="hasMoney">可用: ¥{{ UserStore.userData.recharge.toFixed(2) }}</span>
                        </div>
                    </div>
                    <div class="right">
                        <i class="iconfont icon-gou"></i>
                    </div>
                </div>
            </div>
        </div>
            <template #footer v-if="showPay">
            <span class="dialog-footer">
                <el-button @click="Cancel(1)">取消支付</el-button>
                <el-button type="primary" @click="close(2)">
                确认支付
                </el-button>
            </span>
            </template>
            <div class="loading"
            v-if="loading"
            v-loading="loading"
            element-loading-text="正在结算中..."
            element-loading-background="rgba(255, 255, 255, 0.7)"
            ></div>
            <PaySuccess v-if="showSuccess"/>
            <PayError v-if="showError"/>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useUserStore } from '@/store/user'
import { useOrderStore } from '@/store/order'
import { useCartStore } from '@/store/cart'
import { useCouponsStore } from '@/store/coupons.js'
import PaySuccess from './PaySuccess.vue'
import PayError from './PayError.vue'
import { useRouter } from "vue-router";
const OrderStore = useOrderStore()
const UserStore = useUserStore()
const CouponsStore = useCouponsStore()
const dialogVisible = ref(false)
const loading = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const showPay = ref(true)
const CartStore = useCartStore()
const router = useRouter()
const index = ref(0)
const flag = ref(0)
const needPay = ref()
const open = (value=0,value2=0)=>{
    dialogVisible.value = true
    index.value = value
    flag.value = value2
    if(flag.value === 0) needPay.value = CouponsStore.needPay
    else{
        needPay.value = OrderStore.order[index.value].needPay
    }
}

const getOrderMessage = (message,time)=>{
    let newDate = new Date();
    let orderId = UserStore.userData.UID + 'MY' + Date.parse(newDate)
    let orderTime = newDate.toLocaleString()
    OrderStore.order.unshift({
        orderTime:orderTime,
        orderId:orderId,
        orderStatus:message,
        orderFoods: CartStore.payList.map(item => ({ ...item })),
        needPay:CouponsStore.needPay,
        ConponsPay:CouponsStore.ConponsPay,
        cancelTime:time,
        Conpons:CouponsStore.curConpons
    })
}

const finishCart = ()=>{
//结算成功，删除对应购物车的商品信息以及优惠卷信息
CartStore.payList.forEach((item,index)=>{
    const id = item.kindsId || item.categoryId
    const delId = CartStore.cartNameList.indexOf(id)
    CartStore.cartNameList.splice(delId,1)
    CartStore.Cartdata.splice(delId,1)
})
if(flag.value === 0) finishCoupons()
}

//生成订单删除优惠卷
const finishCoupons = ()=>{
if(CouponsStore.couponsList.length > 0 && CouponsStore.curConpons){
const CouponId = CouponsStore.curConpons.id
CouponsStore.ConponsPay = 0
CouponsStore.curConpons = null
let delCouponId
let usefulId
let SortListId
CouponsStore.couponsList.forEach((item,index)=>{
    if(item.id === CouponId){
        delCouponId = index
    }
})
CouponsStore.usefulCouponList.forEach((item,index)=>{
    if(item.id === CouponId){
        usefulId = index
    }
})
CouponsStore.couponsSortList.forEach((item,index)=>{
    if(item.id === CouponId){
        SortListId = index
    }
})
if(CouponsStore.couponsList[delCouponId].CouponType === 1){
    if(CouponsStore.couponsList[delCouponId].CouponPrice <= CouponsStore.allPay){
        CouponsStore.couponsList.splice(delCouponId,1)
    }
    else{
        CouponsStore.couponsList[delCouponId].CouponPrice -= CouponsStore.allPay
    }
}
else{
CouponsStore.couponsList.splice(delCouponId,1)
CouponsStore.usefulCouponList.splice(usefulId,1)
CouponsStore.couponsSortList.splice(SortListId,1)
}
}
}

const close = (value)=>{
    loading.value = true
    console.log(CouponsStore.needPay);
    if(CouponsStore.needPay > UserStore.userData.recharge) Cancel(value)
    else{
    setTimeout(()=>{
        loading.value = false
        showPay.value = false
        showSuccess.value = true
        if(flag.value === 0) getOrderMessage('已支付')
        else{
             if(flag.value === 1){
                OrderStore.allOrder[index.value].orderStatus = '已支付'
             }
             else{
                OrderStore.waitOrder[index.value].orderStatus = '已支付'
             }
        }
        UserStore.userData.recharge -= CouponsStore.needPay
        setTimeout(()=>{
            dialogVisible.value = false
            finishCart()
            router.push('/order')
            setTimeout(()=>{
                showPay.value = true
                showSuccess.value = false
            },500)
        },3000)
    },700)
}
}

const Cancel = (value)=>{
    if(flag.value === 0 || value === 2){
    loading.value = true
    setTimeout(()=>{
        loading.value = false
        showPay.value = false
        showError.value = true
        if(flag.value === 0) getOrderMessage('待支付',1800)
        // if(CouponsStore.needPay < UserStore.userData.recharge){
        // UserStore.userData.recharge -= CouponsStore.needPay
        // }
        setTimeout(()=>{
        dialogVisible.value = false
        finishCoupons()
        router.push('/order')
        setTimeout(()=>{
                showPay.value = true
                showError.value = false
            },500)
        },3000)
    },500)
    }
    else{
        dialogVisible.value = false
    }
}

defineExpose({
    open
})
</script>

<style lang="less" scoped>
.payPrice{
    font-size: 30px;
    text-align: center;
    font-weight: 700;
}

p{
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    border-bottom: 0.3px solid rgb(225, 223, 223);
    padding-right: 10px;
}

.paymethod{
    border: none;
}

.content{
    width: 100%;
    background-color: #f3f3f3;
    border-radius: 5px;
    .title{
        margin-left: 15px;
        font-weight: 700;
    }
    .message{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            display: flex;
            align-items: center;
            justify-content: center;
            .left-content{
               display: flex;
               flex-direction: column;
               font-size: 12px;
               .method{
                font-size: 14px;
                margin-bottom: 3px;
               }
               .hasMoney{
                color:#8f8e8e;
               }
            }
        }
        .right{
            margin-right: 15px;
            color: rgb(0, 89, 255);
        }
    }
    
}
.el-button{
    height: 35px;
    margin-right: 10px;
}
::v-deep(.el-dialog__body){
    padding: 0 30px;
    min-height: 200px;
    position: relative;
}
::v-deep(.el-dialog__footer){
    padding: 20px 0;
}

.loading{
    position: absolute;
    background: rgba(255, 255, 255, 0); 
    top: -50px;
    left: 0;
    width: 100%;
    height: 150%;
    z-index: 999;
}
</style>