<template>
    <div class="cardContainer">
        <el-card class="box-card">
            <template #header>
            <div class="card-header">
                <span class="orderTime">下单时间:{{ order.orderTime }}</span>
                <span class="orderId">订单编号:{{ order.orderId }}</span>
            </div>
            </template>
            <div>
        <el-scrollbar max-height="40vh">
                <el-table
                    :data="order.orderFoods"
                    style="width: 100%"
                    :show-header="false"
                    table-layout="auto"
                >
                    <el-table-column width="300">
                    <template #default="{row}">
                    <div class="Foodmessage">
                        <el-image :src="row.image" class="image"></el-image>
                        <div class="more">
                        <div style="font-size: 15px;font-weight: 700;">{{ row.name }}</div>
                        <div style="font-size: 12px;color:rgb(148, 148, 148)">样式:{{ row.categoryName }}</div>
                        </div>
                    </div>
                    </template>
                    </el-table-column>
                    <el-table-column>
                    <template #default="{row}">
                        <span>¥{{ row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #default="{row}">
                        <el-input type="button" size="default" style="width:42px" class="count" v-model="row.count"/>
                    </template>
                </el-table-column>
                    <el-table-column>
                    <template #default="{row}">
                        <span class="cost"><i>¥</i>{{ (row.price*row.count).toFixed(2) }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
            </div>
            <template #footer>
                <slot name="footer"></slot>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import {  ref } from 'vue'

const props = defineProps({
    order:Object
})
</script>

<style lang="less" scoped>
::v-deep(.el-card__header){
    padding: 8px 0 8px 15px;
    font-size: 13px;
    background-color: #f1f1f1;
}

.orderTime{
    margin-right: 30px;
}

::v-deep(.el-table__cell){
  padding: 15px 10px;
  .cell{
    color:rgb(69, 69, 69);
    font-size:15px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
}

.Foodmessage{
        display: flex;
        justify-content: space-between;
        width: 80%;
        transform: translateX(35px);
        .image{
            height: 50px;
            width: 50px;
        }
        .more{
            display: flex;
            margin-left: 5px;
            flex:1;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
    }
}

.cardContainer{
    margin-bottom: 20px;
    margin-right: 20px;
}

::v-deep(.el-card__body){
    padding: 0;
}

::v-deep(.el-card__footer){
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
