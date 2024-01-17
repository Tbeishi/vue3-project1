<template>
    <div class="orderPage">
        <h3 class="header">
            <i class="iconfont icon-shouye"></i>
            <span class="title">我的订单</span>
        </h3>

        <div class="container">
            <el-tabs tab-position="left" 
            style="height: 600px" 
            class="demo-tabs"
            stretch
            v-model="tabName"
            >
                <el-tab-pane label="全部订单" name="allOrder">
                    <template #label>
                        <div class="count" v-if="OrderStore.allOrder.length>0">{{ OrderStore.allOrder.length }}</div>
                        <span>全部订单</span>
                    </template>
                    <el-scrollbar max-height="76vh" v-if="OrderStore.allOrder.length>0">
                    <orderCard
                     v-for="(item,index) in OrderStore.allOrder" 
                    :key="item.orderId"
                    :order = item
                    >
                        <template #footer v-if="item.orderStatus==='待支付'">
                            <div class="time">{{ MSTime }}<span class="timeMessage">后将自动取消订单</span></div>
                            <div>
                            <span class="ConponsPay"><span class="sub">优惠:</span><i>¥</i>{{ OrderStore.order[index].ConponsPay }}</span>
                            <span class="needPay"><span class="sub">需付款:</span><i>¥</i>{{ OrderStore.order[index].needPay }}</span>
                            <el-button plain class="cancel" @click="openDialog(index,1)">取消订单</el-button>
                            <el-button color="#ff9569" plain bg>继续付款</el-button>
                            </div>
                        </template>
                        <template #footer v-else-if="item.orderStatus==='已完成'">
                            <div></div>
                            <div>
                            <span class="ConponsPay"><span class="sub">优惠:</span><i>¥</i>{{ OrderStore.order[index].ConponsPay }}</span>
                            <span class="needPay"><span class="sub">实付款:</span><i>¥</i>{{ OrderStore.order[index].needPay }}</span>
                            <el-button plain class="cancel">已完成</el-button>
                            <el-button color="#ff9569" plain bg>待评价</el-button>
                            </div>
                        </template>
                        <template #footer v-else>
                            <div></div>
                            <div>
                            <span class="ConponsPay"><span class="sub">优惠:</span><i>¥</i>{{ OrderStore.order[index].ConponsPay }}</span>
                            <span class="needPay"><span class="sub">实付款:</span><i>¥</i>{{ OrderStore.order[index].needPay }}</span>
                            <el-button plain class="cancel"  @click="openElMessage">催发货</el-button>
                            <el-button color="#ff9569" plain bg @click="openSubmitDialog(index,1)">确认收货</el-button>
                            </div>
                        </template>
                    </orderCard>
                    <!-- <div class="footer">不好意思，已经到底了喔~</div> -->
                    </el-scrollbar>
                    <el-empty v-else description="暂时没有订单哦" />
                </el-tab-pane>
                <el-tab-pane label="待付款" name="waitOrder">
                    <template #label>
                        <div class="count" v-if="OrderStore.waitOrder.length>0">{{ OrderStore.waitOrder.length }}</div>
                        <span>待付款</span>
                    </template>
                    <el-scrollbar max-height="76vh" v-if="OrderStore.waitOrder.length>0">
                    <orderCard 
                     v-for="(item,index) in OrderStore.waitOrder" 
                    :key="item.orderId"
                    :order = item
                    >
                        <template #footer>
                            <div class="time">{{ MSTime }}<sapn class="timeMessage">后将自动取消订单</sapn></div>
                            <div>
                            <span class="ConponsPay"><span class="sub">优惠:</span><i>¥</i>{{ OrderStore.order[index].ConponsPay }}</span>
                            <span class="needPay"><span class="sub">需付款:</span><i>¥</i>{{ OrderStore.order[index].needPay }}</span>
                            <el-button plain class="cancel" @click="openDialog(index,2)">取消订单</el-button>
                            <el-button color="#ff9569" plain bg>继续付款</el-button>
                            </div>
                        </template>
                    </orderCard>
                    </el-scrollbar>
                    <el-empty v-else description="暂时没有待付款的订单哦" />
                </el-tab-pane>
                <el-tab-pane label="待收货" name="received">
                    <template #label>
                        <div class="count" v-if="OrderStore.received.length>0">{{ OrderStore.received.length }}</div>
                        <span>待收货</span>
                    </template>
                    <el-scrollbar max-height="76vh" v-if="OrderStore.received.length>0">
                    <orderCard 
                    v-for="(item,index) in OrderStore.received" 
                    :key="item.orderId"
                    :order = item
                    >
                        <template #footer>
                            <div></div>
                            <div>
                            <span class="ConponsPay"><span class="sub">优惠:</span><i>¥</i>{{ OrderStore.order[index].ConponsPay }}</span>
                            <span class="needPay"><span class="sub">实付款:</span><i>¥</i>{{ OrderStore.order[index].needPay }}</span>
                            <el-button plain class="cancel" @click="openElMessage">催发货</el-button>
                            <el-button color="#ff9569" plain bg @click="openSubmitDialog(index,3)">确认收货</el-button>
                            </div>
                        </template>
                    </orderCard>
                    </el-scrollbar>
                    <el-empty v-else description="暂时没有待收货的订单哦" />
                </el-tab-pane>
                <el-tab-pane label="已完成" name="finish">
                    <template #label>
                        <div class="count" v-if="OrderStore.FinishOrder.length>0">{{ OrderStore.FinishOrder.length }}</div>
                        <span>已完成</span>
                    </template>
                    <el-scrollbar max-height="76vh" v-if="OrderStore.FinishOrder.length>0">
                    <orderCard  
                    v-for="(item,index) in OrderStore.FinishOrder" 
                    :key="item.orderId"
                    :order = item
                    >
                        <template #footer>
                            <div></div>
                            <div>
                            <span class="ConponsPay"><span class="sub">优惠:</span><i>¥</i>{{ OrderStore.order[index].ConponsPay }}</span>
                            <span class="needPay"><span class="sub">实付款:</span><i>¥</i>{{ OrderStore.order[index].needPay }}</span>
                            <el-button plain class="cancel">已完成</el-button>
                            <el-button color="#ff9569" plain bg>待评价</el-button>
                            </div>
                        </template>
                    </orderCard>
                    </el-scrollbar>
                    <el-empty v-else description="暂时没有完成的订单哦" />
                </el-tab-pane>
            </el-tabs>
        </div> 
        <cancleDialog ref="Dialog" title='取消订单'>
            <template #message>确定取消订单吗？</template>
        </cancleDialog>
        <cancleDialog ref="SubmitDialog" title='确认收货'>
            <template #message>已收到货，确定收货吗？</template>
        </cancleDialog>
        </div>
</template>

<script setup>
import orderCard from '@/components/orderCard/orderCard.vue'
import { useOrderStore } from '@/store/order'
import { onMounted,ref,watch } from 'vue'
import cancleDialog from '@/components/cancleDialog/cancleDialog.vue'
import { ElMessage } from 'element-plus'
const tabName = ref('allOrder')
const Dialog = ref()
const SubmitDialog = ref()
import { useMCountDown } from '@/composables/MCountDown'
const { MSTime,start } = useMCountDown()
const openElMessage = () => {
  ElMessage.success('正在催促发货中...')
}
const openDialog = (index,flag)=>{
    Dialog.value.open(index,flag)
}
const openSubmitDialog = (index,flag)=>{
    SubmitDialog.value.open(index,flag)
}
const OrderStore = useOrderStore()
onMounted(()=>{
    const data = OrderStore.order
    OrderStore.allOrder = data
    OrderStore.waitOrder = data.filter( item => item.orderStatus === '待支付')
    OrderStore.received = data.filter( item => item.orderStatus === '已支付')
    OrderStore.FinishOrder = data.filter( item => item.orderStatus === '已完成')
    if(OrderStore.waitOrder.length > 0) 
    OrderStore.waitOrder.forEach((item)=>{
        start(item.cancelTime)
    })
})

watch(OrderStore.order,(newVal)=>{
    OrderStore.allOrder = newVal
    OrderStore.waitOrder = newVal.filter( item => item.orderStatus === '待支付')
    OrderStore.received = newVal.filter( item => item.orderStatus === '已支付')
    OrderStore.FinishOrder = newVal.filter( item => item.orderStatus === '已完成')
})
</script>


<style lang="less" scoped>
.orderPage{
    padding: 0 30px 0 10px;
    height: 100%;
}
.container{
    height: 78vh;
}
.header{
    font-size: 18px;
    .title{
        display: inline-block;
        line-height: 60px;
        margin-left: 5px;
    }
}
i{
    font-size: 14px;
}
.sub{
    color: #686868;
    font-size: 13px;
}
.ConponsPay{
    margin-right: 10px;
    font-size: 15px;
    color: #686868;
}

.needPay{
    color:#e92758;
    margin-right: 15px;
    font-size: 20px;
}

.icon-shouye{
        color: rgb(255, 255, 255);
        margin-left: 15px;
        font-size: 18px;
        padding: 5px;
        border-radius: 50%;
        background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
}

::v-deep(.el-tabs__nav.is-left){
    height: 280px;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

::v-deep(.el-tabs--left .el-tabs__header.is-left){
   margin-right: 30px;
}

// .footer{
//     height: 20px;
//     text-align: center;
//     color:rgb(127, 127, 127);
//     margin-bottom: 10px;
// }

.time{
    color: #e92758;
}

.timeMessage{
    color: #818181;
    font-size: 14px;
    margin-left: 3px;
}

.el-button{
    height: 40px;
    width: 100px;
    border-radius: 20px;
}
.cancel.el-button:focus, .cancel.el-button:hover{
    border-color: #ff9569;
    color:#ff9569
}

.el-empty{
    height: 60vh;
}

.count{
    background: linear-gradient(90deg,#fc9153,#f01414);
    border-radius: 16px;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    line-height: 16px;
    padding: 0 6px;
    text-align: center;
    position: absolute;
    right: 7px;
    top: 0px;
}
</style>