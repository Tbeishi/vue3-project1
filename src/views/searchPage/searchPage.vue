<template>
    <div class="search-container">
        <div v-if="foodData.length>0">
        <div class="container-header">
            <el-breadcrumb separator="|">
                <el-breadcrumb-item>综合</el-breadcrumb-item>
                <el-breadcrumb-item>销售</el-breadcrumb-item>
                <el-breadcrumb-item>价格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container-searchData">
            <PlayFoodCard :foodData="foodData"></PlayFoodCard>
        </div>
        </div>
        <div v-else>
            <el-empty description="不好意思，没有搜到您想要的商品" />
        </div>
        <h3 class="like-title">
            <i class="iconfont icon-cainixihuan"></i>
            <span class="title">猜你喜欢</span>
        </h3>
        <div class="container-searchData">
            <PlayFoodCard :foodData="foodLikeData"></PlayFoodCard>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import getData from '../homePage/foodData'
import PlayFoodCard from '@/components/PlayFoodCard/PlayFoodCard.vue'
import { useCartStore } from '@/store/cart'
const  CartStore  = useCartStore()
const route = useRoute()
const foodData = ref([])
const foodLikeData = ref([])
const searchValue = ref()

onMounted(()=>{
    searchValue.value = route.params.searchData
    getSearchData(searchValue.value)
}) 

const getSearchData = (search)=>{
    const res = []
    const arr = getData().filter(item=>item.foodName.includes(search))
    arr.forEach((item)=>{
        item.category.forEach((food)=>{
            const id = CartStore.cartNameList.indexOf(food.categoryId)
            if(id!==-1){
                food.count = CartStore.Cartdata[id].count
                food.Isactive = true
            }
            food.foodName = item.foodName
            res.push(food)
        })
    })
    foodData.value = res
    const temp = []
    getData().forEach((item)=>{
        item.category.forEach((food)=>{
            const id = CartStore.cartNameList.indexOf(food.categoryId)
            if(id!==-1){
                food.count = CartStore.Cartdata[id].count
                food.Isactive = true
            }
            food.foodName = item.foodName
            temp.push(food)
        })
    })
    foodLikeData.value = temp
}

watch(()=>route.params.searchData,(newVal)=>{
    searchValue.value = newVal
    getSearchData(newVal)
})
</script>


<style lang="less" scoped>
.search-container{
    height: 100%;
    overflow: scroll;
}
.container-header{
    margin-top: 20px;
    margin-left: 30px;
    margin-bottom: 20px;
}

.el-breadcrumb{
    font-size: 15px;
}

::v-deep(.el-breadcrumb__separator){
    margin: 0 20px;
}

::v-deep(.el-breadcrumb__inner){
    padding: 3px;
    &:hover{
    color:rgb(0, 166, 255);
    }
    &.active{
        color:rgb(0, 166, 255);
        border-bottom: 3px solid rgb(0, 166, 255);
    }
}

.like-title{
    margin-top: 5px;
    margin-left: 25px;
    line-height: 35px;
    i{
        font-size: 22px;
        margin-right: 4px;
        color: rgb(255, 255, 255);
        padding: 5px;
        border-radius: 50%;
        background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
    }
    .title{
        display: inline-block;
        line-height: 60px;
        margin-left: 3px;
    }
}
</style>