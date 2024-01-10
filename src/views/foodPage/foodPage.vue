<template>
    <div class="foodPage">
       <PageHeader class="PageHeader"/>
       <router-view class="PageSubject"></router-view>
    </div>
</template>

<script setup>
import PageHeader from './components/PageHeader.vue'
</script>

<style lang="less" scoped>
.foodPage {
    height: 100%;
    overflow: scroll;
    // overflow: visible;
    .PageHeader{
        margin-bottom: 20px;
    }
}

</style>