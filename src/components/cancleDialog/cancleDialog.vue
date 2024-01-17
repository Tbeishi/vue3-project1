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
const OrderStore = useOrderStore()
const innerVisible = ref(false)
const index = ref(0)
const flag = ref(0)
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

const handle = ()=>{
    if(props.title === '确认收货'){
        flag.value === 1 ? OrderStore.order[index.value].orderStatus = '已完成' : OrderStore.received[index.value].orderStatus = '已完成'
        innerVisible.value = false
    }
    else{
        if(flag.value === 1)OrderStore.order.splice(index.value,1)
        else{
            const id = OrderStore.waitOrder[index.value].orderId
            const order = OrderStore.order.find(item=> item.orderId === id)
            const delId = OrderStore.order.indexOf(order)
            OrderStore.order.splice(delId,1)
        }
    innerVisible.value = false
    }
}
</script>




