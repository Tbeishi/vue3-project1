<template>
    <el-result
        icon="success"
        title="支付成功！"
        sub-title="3秒后自动跳转页面"
      >
        <template #extra>
          <el-button type="primary" @click="handle">返回</el-button>
        </template>
    </el-result>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
const handle = ()=>{
    router.push('/order')
}
</script>