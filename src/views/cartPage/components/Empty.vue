<template>
    <div class="empty-container">
       <div class="content-header">
        <h3 class="title">
          <i class="iconfont icon-gouwuchekong"></i>
          <span class="mycart">我的购物车</span>
        </h3>
        </div>
    <el-empty description="不好意思，您的购物车为空" />
    </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.empty-container{
  
    height: 100%;
}
 .content-header{
      margin-right: 20px;
      height: 7vh;
      width: 100%;
      background-color: #dad7d7;
      .title{
        margin-left: 30px;
        font-weight: 700;
        color:rgb(0, 0, 0);
        .mycart{
          line-height: 7vh;
          margin-left: 3px;
        }
        i{
          font-size: 20px;
          margin-right: 4px;
          color: rgb(255, 255, 255);
          padding: 8px;
          border-radius: 50%;
          background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
        }
      }
}

.el-empty{
    height: 80%;
    padding: 0;
}
</style>