<template>
    <div class="memberPage">
        <div class="memberBox">
        <div class="aside">
            <h3 class="header">
            <i class="iconfont icon-huiyuan"></i>
            <span class="title">会员中心</span>
            </h3>
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                router
            >
                <el-menu-item index="/member/mydata">
                <i class="iconfont icon-gerenziliao"></i>
                <span>个人资料</span>
                </el-menu-item>
                <el-menu-item index="/member/discount">
                <i class="iconfont icon-a-youhuiquankaquanduozhangkaquan"></i>
                <span>卡券礼包</span>
                </el-menu-item>
                <el-menu-item index="/member/manage">
                <i class="iconfont icon-jiaoyijilu"></i>
                <span>交易中心</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="memberSub">
            <router-view></router-view>
        </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.header{
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
.memberBox{
    display: flex;
}

.memberSub{
    margin: 10px 0;
    flex:1
}
.aside{
    width: 180px;
}

.el-menu{
    height: 72vh;
    .el-menu-item{
        justify-content: center;
        i{
            font-size: 20px;
            margin-right: 5px;
        }
        .icon-a-youhuiquankaquanduozhangkaquan{
            font-size: 25px;
        }
    }
}

</style>