<template>
    <el-drawer v-model="visible">
      <template #header>
        <h4>编辑个人信息</h4>
      </template>
     <div>
        <el-form
            :label-position="left"
            label-width="100px"
            style="max-width: 460px"
        >
            <el-form-item label="用户名">
            <el-input  />
            </el-form-item>
            <el-form-item label="手机号码">
            <el-input />
            </el-form-item>
            <el-form-item label="位置">
            <el-input  />
            </el-form-item>
            <el-form-item label="收货地址">
            <el-input  />
            </el-form-item>
            <el-form-item label="邮箱">
            <el-input  />
            </el-form-item>
        </el-form>
        <div class="footer">
        <el-button plain>取消</el-button>
        <el-button plain type="primary">确认</el-button>
        </div>
     </div>
    </el-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from '@/store/user';
const UserStore = useUserStore()
const data = ref(
    
)
const visible = ref(false)
const openDrawer = ()=>{
    visible.value = true
}
defineExpose({
    openDrawer
})
</script>

<style lang="less" scoped>
.footer{
    margin-top: 40px;
    text-align: center;
    .el-button{
        margin-right: 10px;
    }
}
</style>