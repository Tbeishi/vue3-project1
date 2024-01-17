import { defineStore } from "pinia"
import { ref } from "vue"
export const useOrderStore = defineStore('order',()=>{
    const order = ref([]) //订单信息
    const allOrder = ref([]) //全部订单
    const waitOrder = ref([]) //待支付订单
    const received = ref([]) //待收货订单
    const FinishOrder = ref([]) //已完成订单
    return {
        order,
        allOrder,
        waitOrder,
        received,
        FinishOrder,
    }
},{
    persist:true,
})