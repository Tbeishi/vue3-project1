<template>
    <div class="common-layout">
    <el-card>
        <el-container>
            <el-aside width="200px" class="aside">
                <ul>
                    <li>超值礼包<i class="iconfont icon-arrow-right"></i></li>
                    <li>9.9元限时礼包<i class="iconfont icon-arrow-right"></i></li>
                    <li>新用户福利礼包<i class="iconfont icon-arrow-right"></i></li>
                    <li>冬季送温暖<i class="iconfont icon-arrow-right"></i></li>
                    <li>欢愉春日<i class="iconfont icon-arrow-right"></i></li>
                    <li>凉爽夏日<i class="iconfont icon-arrow-right"></i></li>
                    <li>趣味秋日<i class="iconfont icon-arrow-right"></i></li>
                </ul>
            </el-aside>
                <el-container>
                <el-main>
                    <el-carousel height="450px">
                        <el-carousel-item v-for="item in picData" :key="item.id">
                            <el-image :src="item.url" style="width: 100%;height: 100%;"/>
                        </el-carousel-item>
                    </el-carousel>
                </el-main>
                </el-container>
        </el-container>
    </el-card>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import getpicData from './picData';
const picData = ref([])
onMounted(()=>{
    picData.value = getpicData()
})
</script>

<style lang="less" scoped>
.common-layout{
    margin-top: 35px;
    .aside{
    height: 450px;
    background-color: #5f5f5f;
    }
}

::v-deep(.el-card__body){
    padding: 0;
}

::v-deep(.el-main){
    padding: 0;
}

.el-aside{
    ul{
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 15px 20px 30px;
            color: aliceblue;
            &:hover{
                background-color: #4f4f4f;
                color: #ffdd00;
                i{
                color: #ffdd00;
                }
            }
            i{
                color: rgb(212, 212, 212);
            }
        }
    }
}
</style>