<template>
    <div class="search-container">
        <div class="container-header">
            <el-breadcrumb separator="|">
                <el-breadcrumb-item>综合</el-breadcrumb-item>
                <el-breadcrumb-item>销售</el-breadcrumb-item>
                <el-breadcrumb-item>价格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
    <div>{{ $route.params.searchData }}</div>
    <div>
        <h3 class="like-title">
            <i class="iconfont icon-cainixihuan"></i>
            <span class="title">猜你喜欢</span>
        </h3>
    </div>
</template>

<script setup>

</script>


<style lang="less" scoped>
.container-header{
    margin-top: 20px;
    margin-left: 30px;
}

.el-breadcrumb{
    font-size: 15px;
}

::v-deep(.el-breadcrumb__separator){
    margin: 0 20px;
}

::v-deep(.el-breadcrumb__inner){
    padding: 3px;
    &:hover{
    color:rgb(0, 166, 255);
    }
    &.active{
        color:rgb(0, 166, 255);
        border-bottom: 3px solid rgb(0, 166, 255);
    }
}

.like-title{
    margin-top: 5px;
    margin-left: 25px;
    line-height: 35px;
    i{
        font-size: 22px;
        margin-right: 4px;
        color: rgb(255, 255, 255);
        padding: 5px;
        border-radius: 50%;
        background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
    }
    .title{
        display: inline-block;
        line-height: 60px;
        margin-left: 3px;
    }
}
</style>