<template>
    <Empty v-if="CartStore.cartNameList.length === 0"/>
    <noEmpty v-else/>
</template>

<script setup>
import noEmpty from './components/noEmpty.vue';
import Empty from './components/Empty.vue';
import { useCartStore } from '@/store/cart'
const CartStore = useCartStore()
</script>

<style lang="less" scoped>
</style>