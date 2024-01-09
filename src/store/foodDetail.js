import { defineStore } from "pinia"
import { ref } from "vue"

export const usefoodDetail = defineStore('foodDetail',()=>{
    const selectedFood = ref()
    return {
        selectedFood
    }
},{
    persist:true,
})