<template>
    <div class="container">
        <h3 class="header">
            <i class="iconfont icon-dingwei"></i>
            <span class="title">收货地址</span>
        </h3>
        <div class="address">
            <div>
            <p>收货人：<i>{{ address.name }}</i></p>
            <p>联系电话：<i>{{ address.phoneNumber }}</i></p>
            <p>收货地址：<i>{{ address.address }}</i></p>
            </div>
            <div class="button">
                <el-button plain @click="openChooseDialog">切换地址</el-button>
                <el-button plain @click="openAddressDialog">添加地址</el-button>
                <chooseDialog ref="ChooseDialog"/>
                <addressDialog ref="AddressDialog"/>
            </div>
        </div>
        <div class="Message">
            <h4 class="title">商品信息</h4>

            <el-table
                :data="CartStore.payList"
                style="width: 100%"
                :header-cell-style="{margin:'20px 0 0 0', backgroundColor: '#e2e2e2e0'}"
            >
                <el-table-column label="商品信息"  width="400">
                <template #default="{row}">
                <div class="Foodmessage">
                    <el-image :src="row.image" class="image"></el-image>
                    <div class="more">
                    <div style="font-size: 15px;font-weight: 700;">{{ row.name }}</div>
                    <div style="font-size: 12px;color:rgb(148, 148, 148)">样式:{{ row.categoryName }}</div>
                    </div>
                </div>
                </template>
                </el-table-column>
                <el-table-column label="单价" >
                <template #default="{row}">
                    <span>¥{{ row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column label="购买数量" >
                <template #default="{row,$index}">
                    <el-input type="button" size="default" style="width:42px" class="count" @click="changeAnimation($index)" v-model="row.count"/>
                </template>
            </el-table-column>
                <el-table-column label="合计" >
                <template #default="{row}">
                    <span class="cost"><i>¥</i>{{ row.price*row.count }}</span>
                </template>
            </el-table-column>
            </el-table>
        </div>

        <div class="payMethod">
            <h4>支付方式</h4>
            <div class="payButton">
                <p>平台支付</p>
                <el-button plain size="large"><i class="iconfont icon-weixinzhifu"></i>微信支付</el-button>
                <el-button plain size="large"><i class="iconfont icon-zhifubaozhifu"></i>支付宝支付</el-button>
                <p>银行卡支付</p>
                <el-button plain size="large">招商银行</el-button>
                <el-button plain size="large">工商银行</el-button>
                <el-button plain size="large">建设银行</el-button>
                <el-button plain size="large">农业银行</el-button>
                <el-button plain size="large">交通银行</el-button>
            </div>
        </div>

        <div class="payDetail">
            <h4>支付明细</h4>
            <div>
                <p>商品件数：<span>{{ allCount }}件</span></p>
                <p>商品总价：<span><i>¥</i>{{ allPay }}</span></p>
                <p v-if="CouponsStore.ConponsPay">优惠：<span class="reduce">减<i>¥</i>{{ CouponsStore.ConponsPay }}</span></p>
                <p>合计：<span class="allPay"><i>¥</i><span class="payCount">{{ needPay }}</span></span></p>
            </div>
            <el-button type="success" class="postBtn" size="large">提交订单</el-button>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart.js'
import { useUserStore } from '@/store/user.js'
import { useCouponsStore } from '@/store/coupons.js'
import { computed,onMounted,ref,watch } from 'vue'
import  addressDialog  from '@/components/addressDialog/addressDialog.vue'
import  chooseDialog  from '@/components/addressDialog/chooseDialog.vue'
const CartStore = useCartStore()
const UserStore = useUserStore()
const CouponsStore = useCouponsStore()
const AddressDialog = ref()
const ChooseDialog = ref()
const address = ref({})
const allPay = computed(()=>{
    return CartStore.payList.reduce((pre,cur)=>pre + cur.count * cur.price,0)
})

const allCount = computed(()=>{
    return CartStore.payList.reduce((pre,cur)=>pre + cur.count,0)
})

const openAddressDialog = ()=>{
    AddressDialog.value.openDialog()
}

const openChooseDialog = ()=>{
    ChooseDialog.value.openDialog()
}

watch(UserStore.addressList,(newVal)=>{
    address.value = newVal.find(item=> item.default === true)
})

const needPay = computed(()=>{
    return allPay.value - CouponsStore.ConponsPay
})

onMounted(()=>{
    address.value = UserStore.addressList.find(item=> item.default === true) || {}
})
</script>

<style scoped lang="less">
.container{
    margin: 0 30px;
    height: 100%;
    overflow: scroll;
    h4{
        height: 60px;
        line-height: 60px;
        border-bottom:0.5px solid rgb(205, 202, 202);
        margin-bottom: 20px;
    }

    .header{
        font-size: 18px;
        .title{
            display: inline-block;
            line-height: 60px;
            margin-left: 5px;
        }
    }
    .icon-dingwei{
        color: rgb(255, 255, 255);
        margin-left: 15px;
        font-size: 18px;
        padding: 5px;
        border-radius: 50%;
        background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
    }

    .address{
        margin-bottom: 20px;
        height: 150px;
        padding: 22.5px 0;
        border: 0.5px solid rgb(205, 202, 202);
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
            color:#7e7f80;
            margin-left: 15px;
            line-height: 35px;
            i{
                font-weight: 700;
                color: rgb(35, 35, 35);
            }
        }
        .button{
            margin-right: 50px;
        }
    }

    .Foodmessage{
        display: flex;
        justify-content: space-between;
        width: 80%;
        transform: translateX(35px);
        .image{
            height: 50px;
            width: 50px;
        }
        .more{
            display: flex;
            margin-left: 5px;
            flex:1;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        }
        }

        .payMethod{
            margin-top: 15px;
        }

        .payButton{
            p{
                font-size: 15px;
                margin: 20px 0;
            }
            .icon-weixinzhifu{
                font-size:30px;
                color: #1afa29;
                margin-right: 4px;
            }
            .icon-zhifubaozhifu{
                font-size:25px;
                color: #1296db;
                margin-right: 4px;
            }
        }

        .payDetail{
            margin-top: 15px;
            p{
                line-height: 35px;
            }
            .postBtn{
                margin:30px 0;
            }
            span{
                margin-left: 10px;
            }
            .reduce{
                color:red;
                i{
                    font-size: 14px;
                    margin-left: 2px;
                }
            }
            .allPay{
                color:red;
                span{
                    margin: 0;
                    font-size: 25px;
                }
            }
        }
}

::v-deep(.el-table__cell){
  padding: 15px 10px;
  .cell{
    color:rgb(69, 69, 69);
    font-size:15px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
}
</style>