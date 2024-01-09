<template>
<div class="box">
    <div class="iconfont-contianer" :style="'background-color:' + card.color">
        <i class="iconfont" :class="card.icon"></i>
    </div>
    <div class="message">
        <div class="main">{{ card.main }}</div>
        <div class="sub">{{ card.sub }}</div>
    </div>
</div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
    card:{
        type:Object
    }
})
</script>

<style lang="less" scoped>
.box{
    height: 100%;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont-contianer{
        display: inline-block;
        padding: 10px;
        border-radius: 50%;
        i{
        color: rgb(255, 255, 255);
        font-size:50px;
        }
    }
    .message{
        margin-left: 12px;
        .main{
            font-weight: 700;
            font-size: 16px;
        }
        .sub{
            padding-top: 3px;
            color:#a8a5a5;
            font-size: 13px;
        }
    }
}
</style>