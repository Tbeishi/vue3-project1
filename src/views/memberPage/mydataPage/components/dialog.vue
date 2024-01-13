<template>
    <div>
        <el-dialog
    v-model="dialogVisible"
    title="会员充值"
    width="30%"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

const open = ()=>{
    dialogVisible.value = true
}

defineExpose({
    open
})
</script>