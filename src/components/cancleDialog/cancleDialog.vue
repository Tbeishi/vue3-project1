<template>
      <el-dialog
        v-model="innerVisible"
        width="30%"
        :title="title"
        align-center
      >
      <div>
        <slot name="message"></slot>
      </div>
      <template #footer>
        <el-button @click="innerVisible = false">再想想</el-button>
        <el-button type="primary" @click="handle">
          确定
        </el-button>
    </template>
      </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useOrderStore } from '@/store/order'
import { useCouponsStore } from '@/store/coupons.js'
import { ElMessage } from 'element-plus'
const CouponsStore = useCouponsStore()
const OrderStore = useOrderStore()
const innerVisible = ref(false)
const index = ref(0)
const flag = ref(0)
const openElMessage = () => {
  ElMessage.success('使用的优惠券已退回至您的账户~')
}
const open = (value,value2)=>{
    index.value = value
    flag.value = value2
    innerVisible.value = true
}
const props = defineProps({
    title:String
})
defineExpose({
    open
})

//取消支付退还优惠卷
const handle = ()=>{
    if(props.title === '确认收货'){
        flag.value === 1 ? OrderStore.order[index.value].orderStatus = '已完成' : OrderStore.received[index.value].orderStatus = '已完成'
        innerVisible.value = false
    }
    else{
        if(flag.value === 1){
          const Conpon = OrderStore.order[index.value].Conpons
          if(Conpon){
            if(Conpon.CouponType===1){
            const res = CouponsStore.couponsList.find(item => item.id === Conpon.id)
            res === undefined ?  CouponsStore.couponsList.unshift(Conpon) : res.CouponPrice += Conpon.CouponPrice
            }
            else{
              CouponsStore.couponsList.unshift(Conpon)
            }
            openElMessage()
          }
          OrderStore.order.splice(index.value,1)
        }
        else{
            const Conpon = OrderStore.waitOrder[index.value].Conpons
            if(Conpon){
              if(Conpon.CouponType===1){
              const res = CouponsStore.couponsList.find(item => item.id === Conpon.id)
              res === undefined ?  CouponsStore.couponsList.unshift(Conpon) : res.CouponPrice += Conpon.CouponPrice
              }
              else{
              CouponsStore.couponsList.unshift(Conpon)
              }
              openElMessage()
            }
            const id = OrderStore.waitOrder[index.value].orderId
            const order = OrderStore.order.find(item=> item.orderId === id)
            const delId = OrderStore.order.indexOf(order)
            OrderStore.waitOrder.splice(index.value,1)
            OrderStore.order.splice(delId,1)
        }
    innerVisible.value = false
    }
}
</script>




