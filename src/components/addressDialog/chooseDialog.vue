<template>
    <div>
        <el-dialog
        v-model="dialogVisible"
        title="切换地址"
        width="40%"
        align-center
        center
        >
        <ul v-if="UserStore.userData.addressList.length">
            <el-scrollbar height="400px">
            <li v-for="item in chooseList" 
            :key="item" 
            :class="{'active': activeAddress === item}"
            @click = "activeAddress = item"
            >
            <div>
                <p>收货人：{{ item.name }}</p>
                <p>联系电话：{{ item.phoneNumber }}</p>
                <p>收货地址：{{ item.address }}</p>
            </div>
            <div class="message" v-show="currentAddress === item">当前使用</div>
            </li>
        </el-scrollbar>
        </ul>
      <el-empty v-else description="暂时没有添加收货地址" />

      <template #footer>
      <span class="dialog-footer" v-if="UserStore.userData.addressList.length">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="changeAddress">
          确认
        </el-button>
      </span>
      <el-button type="primary" v-else @click="addAddress">添加地址</el-button>
    </template>
  </el-dialog>
  </div>
  <addressDialog ref="addDialog"/>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import  addressDialog  from './addressDialog.vue'
const UserStore = useUserStore()
const dialogVisible = ref(false)
const chooseList = ref()
const activeAddress = ref()
const currentAddress = ref()
const addDialog = ref()
const openDialog = ()=>{
    chooseList.value = UserStore.userData.addressList
    currentAddress.value = UserStore.userData.addressList.find(item => item.default === true)
    activeAddress.value = currentAddress.value
    dialogVisible.value = true
}

const changeAddress = ()=>{
  if(currentAddress.value){
    currentAddress.value.default = false
    activeAddress.value.default = true
    currentAddress.value = activeAddress.value
  }
  dialogVisible.value = false
}

const addAddress = ()=>{
  dialogVisible.value = false
  addDialog.value.openDialog()
}

defineExpose({
    openDialog
})
</script>


<style lang="less" scoped>
li{
    border:0.8px solid rgb(205, 202, 202);
    padding: 5px;
    margin: 10px 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    position: relative;
    p{
        margin-left: 10px;
        line-height: 40px;
    }
    &.active,&:hover{
        border:0.8px solid #ff8c00;
        background-color: #feebda;
    }
    .message{
        position: absolute;
        top: 8px;
        right: 8px;
        color:#ff7300;
        padding: 3px;
        border-radius: 3px;
        border:1px solid #ff8c00
    }
}

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