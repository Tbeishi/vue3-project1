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
            <h3 class="payPrice"><i>¥</i>{{ CouponsStore.needPay }}</h3>
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
                         <span class="hasMoney">可用: ¥{{ UserStore.userData.recharge }}</span>
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
                <el-button @click="dialogVisible = false">取消支付</el-button>
                <el-button type="primary" @click="close">
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
import { ref } from "vue";
import { useUserStore } from '@/store/user';
import { useCouponsStore } from '@/store/coupons.js'
import PaySuccess from './PaySuccess.vue'
import PayError from './PayError.vue'
import { useRouter } from "vue-router";
const UserStore = useUserStore()
const CouponsStore = useCouponsStore()
const dialogVisible = ref(false)
const loading = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const showPay = ref(true)
const router = useRouter()
const open = ()=>{
    dialogVisible.value = true
}

const close = ()=>{
    loading.value = true
    setTimeout(()=>{
        loading.value = false
        showPay.value = false
        showSuccess.value = true
        setTimeout(()=>{
            showPay.value = true
            showSuccess.value = false
            dialogVisible.value = false
            router.push('/order')
        },3000)
    },700)
    
    UserStore.userData.recharge -= CouponsStore.needPay
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