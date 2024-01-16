<template>
    <div>
        <el-dialog
          v-model="dialogVisible"
          title="会员充值"
          width="30%"
        >
          <span>请输入充值金额：</span>
          <el-input v-model="inputValue" @input="handleInput" style="width:200px"></el-input>
          <p class="message">累计充值满500元可成为VIP会员</p>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handle">
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user';
const UserStore = useUserStore()
const dialogVisible = ref(false)
const inputValue = ref()
const open = ()=>{
    dialogVisible.value = true
}

const handle = ()=>{
  dialogVisible.value = false
  UserStore.userData.recharge += parseInt(inputValue.value)
  UserStore.userData.allRecharge += parseInt(inputValue.value)
  inputValue.value = ''
}

const handleInput = (value) =>{
    // 只允许输入数字
    inputValue.value = value.replace(/[^0-9]/g, '');
  }

defineExpose({
    open
})
</script>

<style scoped lang="less">
.message{
color:rgb(255, 0, 0);
font-size: 12px;
margin-top: 10px;
}
</style>