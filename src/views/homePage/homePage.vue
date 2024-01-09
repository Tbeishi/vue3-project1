<template>
    <div class="homePage">
    <homePlayPic/>
    <div class="card-container">
        <radiusCard v-for="card in cardData" :key="card.id" :card="card"/>
    </div>
    <foodCard v-for="food in foodData" :key="food.foodId" :food="food" @getContainerHeight="getContainerHeight"/>
    </div>
</template>

<script setup>
import foodCard from '@/components/foodCard/foodCard.vue'
import { onMounted, ref,defineEmits } from 'vue'
import  getData  from './foodData'
import homePlayPic from '@/components/homePlayPic/homePlayPic.vue'
import radiusCard from '@/components/radiusCard/radiusCard.vue'
import getCardData from './cardData'
const foodData = ref([])
const cardData = ref([])
const cardHeight = ref([])
const emit = defineEmits(['getcardHeight'])

onMounted(()=>{
foodData.value = getData()
cardData.value = getCardData()
// console.log(cardHeight.value);
// console.log(cardContainer.value.offsetHeight);
emit('getcardHeight',cardHeight.value)
})

const getContainerHeight = (e)=>{
    if(cardHeight.value.length > 0){
        const sumHeight = cardHeight.value.at(-1) + e
        cardHeight.value.push(sumHeight)
    }
    else{
        cardHeight.value.push(e)
    }
}

</script>

<style lang="less" scoped>
.homePage{
    height: 100%;
    padding: 0 50px;
    overflow: auto;
}
.card-container{
    height: 120px;
    width: 100%;
    background-color: #ffffff;
    display: flex;
}
</style>