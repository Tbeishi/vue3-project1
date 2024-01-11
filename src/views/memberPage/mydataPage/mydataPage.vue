<template>
    <div class="mydataPage">
        <div class="container-header">
            <div class="avater">
                <img src="/src/assets/picture/default.jpg" class="img">
                <div>
                <p class="username">小米露</p>
                <p class="vip">VIP会员</p>
                </div>
            </div>
            <div>
                <el-upload 
                    action="#" 
                    :on-change="handleChange"
                    :before-upload="beforeUpload"
                    class="upload"
                    >
                    <el-button type="primary" size="small">更换头像</el-button>
                    </el-upload>
            </div>
            <div class="account">
                <span class="recharge">会员充值</span>
                <p>账户余额:<sapn class="accountNumber">520</sapn></p>
            </div>
        </div>
        <img :src=imageUrl alt="">
        <img src="" alt="">

        <mydataSubject/>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from 'element-plus'
import mydataSubject from './components/mydataSubject.vue'
const imageUrl = ref()

const beforeUpload = (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        ElMessage.error('只能上传图片!')
         return false
      }
      if(file.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过2MB!')
        return false
      }
      ElMessage.success('更换头像成功!')
      return isImage;
    };

const handleChange = (file) => {
      if (file.raw) {
        imageUrl.value = URL.createObjectURL(file.raw);
    }
}
</script>

<style lang="less" scoped>
.mydataPage{
    margin: 0 25px;
}
.container-header{
    margin: 10px 0;
    height: 120px;
    background: linear-gradient(to right, #9fe1fa, #f4edc9);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avater{
        height: 80px;
        margin: 20px 40px;
        border-radius: 40px;
        display: flex;
        align-items: center;
        .upload{
            margin: 0;
            padding: 0;
            height: 24px;
        }
        .img{
            width: 70px;
            height: 70px;
            border-radius: 50%;
        }
        p{
            font-weight: 700;
            font-size: 18px;
            margin-left: 10px;
        }
        .vip{
            font-size: 13px;
            margin-top: 10px;
            padding-left: 3px;
            color: #ff0000;
        }
    }

    .account{
        display: flex;
        margin-right: 25px;
        align-items: center;
        .recharge{
            margin-right: 25px;
        }
        .accountNumber{
            margin-left: 5px;
        }
    }
}
</style>