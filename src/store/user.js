import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore =  defineStore('user',()=>{
    const addressList = ref([])
    const userData = ref({})
    const token = ref()
    const recharge = ref(0)
    const avaterURL = ref('/src/assets/picture/default.jpg')
    const setUserData = (data)=>{
        userData.value = data
    }
    const setToken = (Token)=>{
        token.value = Token
    }
    return {
        addressList,
        userData,
        avaterURL,
        recharge,
        setUserData,
        setToken
    }
},{
    persist:true,
})