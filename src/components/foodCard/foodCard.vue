<template>
      <el-card @click="toDetail(food)" >
            <div class="card-pic">
            <img v-img-lazy="food.image" style="width:55%;height: 140px">
            </div>
            <div class="card-container">
            <div class="sellName">{{ food.categoryName }}</div>
            <div class="sellCount"><slot name="sellCount"></slot></div>
            <div class="sellPrice">
                <div class="PriceMessage">
                <span class="price">
                    <i>¥</i>{{ food.price }}<span class="priceText" v-if="food.kinds">起</span>
                </span>
                <span class="oldPrice" v-show="food.oldPrice">
                    <i>¥</i>{{ food.oldPrice }}<span v-if="food.kinds">起</span>
                </span>
                </div>
                <div class="iconfont-Container">
                    <slot name="button"></slot>
                </div>
            </div>
            </div>
    </el-card>
</template>

<script setup>
import { usefoodDetail } from '@/store/foodDetail'
import { useRouter } from 'vue-router';
const foodDetail = usefoodDetail()
const router = useRouter()
const props = defineProps({
    food:{
        type:Object
    }
})

const toDetail = (item)=>{
    if(item.kinds){
        foodDetail.selectedFood = item
        router.push(`/detail/${item.categoryId}`)
    }
    // console.log(item);
}
</script>

<style lang="less" scoped>
::v-deep(.el-card__body){
    padding: 0;
    padding-top: 8px;
}

.el-card{
    width: 250px;
    height: 250px;
    transition: all .3s ease-in-out;
    margin-top: 8px;
    &:hover{
        transform: translateY(-8px);
    }
}

.card-pic{
    text-align: center;
}

.card-container{
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    .sellName{
    font-weight: 700;
    padding: 4px 0;
}
.sellCount{
    font-size: 14px;
    margin-top: 2px;
    color: rgb(174, 174, 174);
}

.sellPrice{
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    .price{
        font-size: 20px;
        color: rgb(255, 0, 0);
        i{
            font-size: 20px;
            color: rgb(255, 0, 64);
        }
        .priceText{
            padding-left: 2px;
            font-size: 15px;
        }
    }
    .oldPrice{
        // font-size: 10px;
        color: #9c9c9c;
        font-size: 14px;
        text-decoration: line-through;
        i{
            font-size: 14px;
            padding: 0 0 0 5px;
        }
    }
    .iconfont-Container{
        display: flex;
        margin-right: 30px;
        color:#00a0dc;
        transform: translateY(-10px);
        align-items: center;
        position: relative;
        i{
            font-size: 30px;
        }
    }
}
}

.el-card.is-always-shadow{
    padding: 0;
}
</style>