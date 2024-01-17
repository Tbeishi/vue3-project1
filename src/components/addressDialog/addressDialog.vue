<template>
    <el-dialog
    v-model="dialogVisible"
    title="添加地址"
    width="30%"
    @close="reserForm"
    align-center
    center
  >
  
  <el-form
    :model="formData"
    status-icon
    :rules="rules"
    ref="formRef"
  >
    <el-form-item label="收货人：" prop="name">
      <el-input  autocomplete="off" v-model="formData.name"/>
    </el-form-item>
    <el-form-item label="联系电话：" prop="phoneNumber">
      <el-input
        autocomplete="off"
        v-model="formData.phoneNumber"
      />
    </el-form-item>
    <el-form-item label="收货地址：" prop="address">
      <el-input v-model="formData.address" autocomplete="off"/>
    </el-form-item>
  </el-form>
    
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reserForm">取消</el-button>
        <el-button type="primary" @click="addAddress">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
const UserStore = useUserStore()
const dialogVisible = ref(false)
const formRef = ref()
const formData = ref({
    name:'',
    phoneNumber:'',
    address:''
})
const rules = ref({
    name:[{ required: true, message: '收货人名字不能为空', trigger: 'blur' }],
    phoneNumber:[
        { required: true, message: '联系电话不能为空', trigger: 'blur' },
        { min: 11, max: 11, message: '联系电话输入有误', trigger: 'blur' }],
    address:[{ required: true, message: '收货地址不能为空', trigger: 'blur' }]
})

const openDialog = ()=>{
    dialogVisible.value = true
}

const reserForm = ()=>{
    dialogVisible.value = false
    formRef.value.resetFields()
}

const addAddress = ()=>{
    formRef.value.validate((valid)=>{
        if(valid){
            formData.value.default = true
            const pre = UserStore.userData.addressList.find(item => item.default === true)
            if(pre !== undefined) pre.default = false
            UserStore.userData.addressList.unshift(formData.value)
            formData.value = {}
            dialogVisible.value = false
        }
    })
}

defineExpose({
    openDialog
})
</script>

<style lang="less" scoped>
.el-button{
    height: 35px;
    width: 70px;
    margin-right: 10px;
}

::v-deep(.el-dialog__title){
  font-size: 15px;
  line-height: 54px;
  margin-left: 15px;
}
::v-deep(.el-dialog__header){
  padding: 0; 
  margin: 0;
  background-color: rgb(240, 240, 240);   
}

::v-deep(.el-dialog__headerbtn){
  top:0;
  padding: 10px 10px;
  font-size:20px
}

::v-deep(.el-dialog__body){
  max-height: 450px;
  padding: 0;
}
::v-deep(.el-table__header){
  padding: 0;
}
::v-deep(.el-dialog__footer){
  padding: 20px 0;
}
</style>