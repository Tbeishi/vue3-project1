import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore =  defineStore('user',()=>{
    const userData = ref({
        UID:0,
        username:'',
        phone:'',
        address:'',
        avatar:'/src/assets/picture/default.jpg',
        deliveryAddress:'',
        addressList:[],
        recharge:0,
        allRecharge:0,
    })
    const token = ref('')
    const setData = (data)=>{
        const { id,username,email } = data
        userData.value.UID = id
        userData.value.username = username
        userData.value.email = email
    }
    const setToken = (Token)=>{
        token.value = Token
    }
    const clearData = ()=>{
        userData.value = {
            UID:'',
            username:'',
            phone:'',
            address:'',
            avatar:'/src/assets/picture/default.jpg',
            addressList:[],
            recharge:0,
            allRecharge:0,
        }
    }
    return {
        userData,
        token,
        setData,
        setToken,
        clearData
    }
},{
    persist:true,
})