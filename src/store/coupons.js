import { defineStore } from "pinia"
import { ref } from "vue"
import  getCouponsData  from './couponsData'

export const useCouponsStore = defineStore('coupons',()=>{
    const couponsList = ref(getCouponsData())
    const couponsSortList = ref()
    const usefulCouponList = ref()
    const curConpons = ref()
    const ConponsPay = ref()
    return {
        couponsList, //优惠卷列表
        couponsSortList, //可使用的优惠卷列表按最大优惠降序排列，加上不可用优惠卷列表
        usefulCouponList, //可使用的优惠卷列表
        curConpons,  //当前使用的优惠卷
        ConponsPay, //优惠金额
    }
},{
    persist:true,
})