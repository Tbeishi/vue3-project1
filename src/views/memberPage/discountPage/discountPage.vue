<template>
    <div class="discountPage">
        <el-tabs class="demo-tabs" stretch v-model="activeName">
            <el-tab-pane label="红包" name="first">
                <el-scrollbar height="74vh">
                <ul v-for="item in CouponsStore.couponsList" :key="item.id">
                    <li>
                        <div class="card-content">
                            <div class="image">
                                <img src="../../../assets/picture/红包3.png" alt="">
                                <div class="Datatime">
                                <p class="title">{{ item.CouponTitle }}</p>
                                <p class="time">{{ item.outOffDate }} 到期</p>
                                </div>
                            </div>
                            <div class="prefer">
                                <p class="preferPrice">
                                    <i v-if="item.CouponType !== 3">¥</i><span class="price">{{ item.CouponPrice }}
                                    <span v-if="item.CouponType === 3">折</span>
                                    </span>
                                </p>
                                <p class="message">
                                    {{ item.CouponWay }}
                                </p>
                            </div>
                        </div>
                        <span class="tips">
                            新获得
                        </span>
                        <div class="footer">
                            <div>{{ item.CouponRange }}</div>
                            <el-button type="danger">去使用</el-button>
                        </div>
                    </li>
                </ul>
            </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="券" name="second">
                <el-empty description="您暂时没有券哦~" />
            </el-tab-pane>
            <el-tab-pane label="卡" name="third">
                <el-empty description="您暂时没有卡哦~" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useCouponsStore } from '@/store/coupons.js'
const CouponsStore = useCouponsStore()
const activeName = ref('first')
</script>

<style lang="less" scoped>
.discountPage{
    margin: 0 50px;
}
ul{
    // padding: 0 50px;
    padding-right: 30px;
}
li{
    width: 100%;
    height: 160px;
    border-radius: 10px;
    border:1px solid rgb(205, 202, 202);
    position: relative;
    margin-bottom: 10px;
    margin-top: 10px;
    .card-content{
        height: 95px;
        // margin-top: 20px;
        margin: 10px 15px 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &::before {
            content: "";
            position: absolute;
            bottom: 45px;
            left: 17px;
            right: 17px;
            height: 1px; 
            background: linear-gradient(to right, rgb(207, 205, 205) 4px, transparent 4px) 0 0 / 8px 1px repeat-x; /* 设置虚线样式，高度为1px，repeat-x表示横向重复 */
        }
        .image{
            height: 95px;
            display: flex;
            align-items: center;
            img{
                background: radial-gradient(#fffaf8,#fce5e5);
                border-radius: 8px;
                padding: 11px 5px;
                height: 85px;
            }
        } 
        .Datatime{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 12px;
            .title{
                padding-left: 5px;
                font-weight: 700;
                padding-bottom: 5px;
            }
            .time{
                font-size: 13px;
                color:#afafaf
            }
        }
        .prefer{
            margin-right: 30px;
            .preferPrice{
                text-align: center;
                color: #ff0000;
                i{
                font-size: 13px;
                }
                .price{
                font-size: 25px;
                }
            }
            .message{
                font-size: 14px;
                color:#7a7a7a;
                text-align: right;
            }
        }
        p{
            line-height: 25px;
        }
    }
    .tips{
        display: inline-block;
        color: #ff3131;
        padding: 2px 8px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
        font-size: 13px;
        background: radial-gradient(#fffaf8,#ffd8d8);
        position: absolute;
        top: 0;
        right: 0;
    }
    .footer{
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        font-size: 15px;
        color:#6b6b6b;
        .el-button{
            width: 80px;
            height: 30px;
            border-radius: 15px;
            margin-right: 10px;
            // background-color: #ff3a3a;
            // border: #ff3a3a;
        }
    }
}

::v-deep(.el-tabs__header){
    margin: 0;
}

.el-empty{
    height: 500px;
    padding: 0;
}
</style>