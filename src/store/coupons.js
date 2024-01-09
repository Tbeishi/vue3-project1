import { defineStore } from "pinia"
import { ref } from "vue"
import  getCouponsData  from './couponsData'

export const useCouponsStore = defineStore('coupons',()=>{
    const couponsList = ref(getCouponsData())
    const couponsSortList = ref()
    const usefulCouponList = ref()
    const curConpons = ref()
    return {
        couponsList,
        couponsSortList,
        usefulCouponList,
        curConpons,
    }
},{
    persist:true,
})