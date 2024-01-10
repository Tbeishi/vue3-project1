<template>
    <div class="foodcard">
    <div class="card-header">
    <div>
    <div class="title">
    <!-- <i class="iconfont icon-remen"></i> -->
        <slot name="iconfont"></slot>
        <span>{{ title }}</span>
    </div>
    </div>
    <div class="more"><slot name="more"></slot></div>
    </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
defineProps({
    food:{
        type:Object,
    },
    title:{
        type:String,
    }
})
</script>

<style lang="less" scoped>
.foodcard{
    margin-top: 20px;
    padding-top: 10px;
}

.card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
    font-weight: 700;
    font-size: 18px;
    position: relative;
    padding: 0 10px 12px 10px;
    margin-bottom: 8px;
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 10px; /* 调整高度以达到期望的胶囊形状 */
      background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
      border-radius: 5px; /* 边框半径，使其呈现胶囊形状 */
      }
    }
    .more{
        font-size: 14px;
        color: rgb(121, 121, 121);
    }
}
</style>