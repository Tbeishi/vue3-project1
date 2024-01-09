import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore =  defineStore('user',()=>{
    const addressList = ref([])
    return {
        addressList
    }
},{
    persist:true,
})