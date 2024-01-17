import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore =  defineStore('cart',()=>{
    const Cartdata = ref([])
    const cartNameList = ref([])
    const Cartcount = ref(0)
    const payList = ref([])
    const CartMessage = ref({})
    return {
        Cartdata,     //记录购物车已有的商品
        cartNameList, //记录购物车已有商品的id
        Cartcount,    //记录购物车已有商品的数量
        payList,       //记录下单待支付的商品
        CartMessage,   //记录购物车位置信息
    }
},{
    persist:true,
})