<template>
    <div class="content">
      <div class="content-header">
        <h3 class="title">
          <i class="iconfont icon-gouwuchekong"></i>
          <span class="mycart">我的购物车</span>
      </h3>
        <el-button class="button" type='primary' text='primary' link>
          <div @click="manage=!manage" :class="{'manage': manage===true}" style="display: flex;align-items: center;">
          <el-icon size="20" ><Grid /></el-icon>
          <span style="font-size: 13px ; margin-right: 30px;">{{manage ?'退出管理':'管理'}}</span>
          </div>
        </el-button>
      </div>
      <el-scrollbar height="78vh">
    <el-table
    :data="CartStore.Cartdata"
    style="width: 100%"
    ref = "table"
    :header-cell-style="{margin:'20px 0 0 0'}"
  >
  <el-table-column width="70">
    <template #default="{$index}">
      <el-checkbox v-model="checkedList[$index]"></el-checkbox>
    </template>
  </el-table-column>
    <el-table-column label="商品信息" width="299">
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
    <el-table-column label="单价">
    <template #default="{row}">
        <span>¥{{ row.price}}</span>
    </template>
  </el-table-column>
  <el-table-column label="购买数量" width="140">
    <template #default="{row,$index}">
      <div class="iconfont-container">
        <i class="iconfont icon-jianshao" 
        @click="reduce(row)" 
        :class="{'forbid':row.count === 1,'appearJianshao':row.PlayChecked,'disappearJianshao':row.PlayChecked === false}"></i>
        <el-input type="button" size="default" style="width:42px" class="count" 
        v-debounce="{ handler:changeAnimation, args:[row,$index]}"
        v-model="row.count"/>
        <i class="iconfont icon-jia" 
        :class="{'appearJia':row.PlayChecked,'disappearJia':row.PlayChecked === false}"
        @click="row.count++"></i>
      </div>
    </template>
  </el-table-column>
    <el-table-column label="合计">
    <template #default="{row}">
        <span class="cost"><i>¥</i>{{ (row.price*row.count).toFixed(2) }}</span>
    </template>
  </el-table-column>
  <el-table-column width="117px">
    <template #default="{$index}">
        <i class="iconfont icon-jianhao" @click="deleteCart($index)" :class="{'move':manage === true,'disappear':manage === false}"></i>
    </template>
  </el-table-column>
  </el-table>
  <div class="fixFooter" v-if="CartStore.Cartdata.length > 5">不好意思，已经到底了喔~</div> 
</el-scrollbar>


<div class="footer Deletefooter" :class="{'showDelete':manage === true,'disappearDelete':manage === false}">
  <div class="footer-left">
    <el-checkbox size="large" @change="checkAll" v-model="checked"/>
    <div div @click="checkAll" style="margin-left: 5px">全选</div>
  </div>
  <div class="footer-right">
    <el-button type="danger" round size="large" @click="deleteHandel">
      <i class="iconfont icon-shanchu"></i>
      <span>删除</span>
    </el-button>
  </div>
</div>

<div class="footer payfooter" :class="{'disappearPay':manage === true,'showPay':manage === false}">
  <div class="footer-left">
    <el-checkbox size="large" @change="checkAll" v-model="checked"/>
    <div div @click="checkAll" style="margin-left: 5px">全选</div>
  </div>
  <div class="footer-right">
    <div class="total">
      <p>
        <span class="selected" v-show="selectedCount > 0">已选 {{ selectedCount }} 件,</span>
        合计:<span class="pay"><i>¥</i>{{ allPay - coupons === 0 ? allPay - coupons : (allPay-coupons).toFixed(2) }}</span>
      </p>
      <p class="prefer" >
        <span v-show="coupons !== 0">共减<i>¥</i>{{ coupons }}元</span>
        <span v-show="allPay !== 0" class="detail" @click="openDrawer">查看明细<i class="iconfont icon-xiangshangjiantou"></i></span>
      </p>
    </div>
    <div><el-button type="success" round size="large" @click="open">结算</el-button></div>
  </div>
</div>

  <couponsDetail 
      ref="drawer" 
      :allPay ="allPay" 
      @revisePay="revisePay"
      :flag="childrenflag"
  />
</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/cart'
import { Grid } from '@element-plus/icons-vue'
import { useCouponsStore } from '@/store/coupons'
import couponsDetail from '@/components/couponsDetail/couponsDetail.vue';

const CouponsStore = useCouponsStore()
const CartStore = useCartStore()
const router = useRouter()
const table = ref(null)
const checkedList = ref([])
const checked = ref(false)
const manage = ref() //管理值的控制
const choosedItemList = ref([])
const conponsLise = ref([])
const drawer = ref()
const reviseIndex  = ref(0)
const conponLength = ref(0)
const flag = ref(false)
const openDrawer = ()=>{
drawer.value.openDrawer()
}

onMounted(()=>{
  CartStore.Cartdata.forEach((item) => {
  checkedList.value.push(false)
  item.PlayChecked = ''
});
})

//动画的出现和隐藏
const changeAnimation = (event,item,$index)=>{
  item.PlayChecked = item.PlayChecked ? false : true
  const res = CartStore.Cartdata.find((data,index)=>data.PlayChecked && $index!=index)
  if(res != undefined){
    res.PlayChecked = false
  }
}

const open = () => {
  if(!checkedList.value.includes(true))
  ElMessage({ type:'error', message:'您还没有选择宝贝哦！'})
  else {
    CartStore.payList = CartStore.Cartdata.filter((item,index)=>{
      if(checkedList.value[index]===true){
        return item
      }
    })
    router.push({name:'pay'})
  }
}

const reduce = (row) => {
  if(row.count > 1)
  row.count--
}

const checkAll = ()=>{
  const flag = checkedList.value.every((item)=> item === true)
  if(!flag){
    for(let i=0; i<checkedList.value.length ; i++){
    checkedList.value[i] = true
  }
}
  else{
    for(let i=0; i<checkedList.value.length ; i++){
    checkedList.value[i] = !checkedList.value[i]
  }
}
}

//监听商品是否被全选，是则全选按钮自动选上，反之，取消选上
 watch(checkedList.value, (newVal) => {
      if(!newVal.includes(false)){
        checked.value = true
      }
      else{
        checked.value = false
      }
      choosedItemList.value = CartStore.Cartdata.filter((item,index)=>{
        if(newVal[index]){
          return item
        }
      })
})

//计算优惠金额
const coupons = computed(()=>{
  if(!CouponsStore.couponsList || selectedCount.value === 0) return 0
  CouponsStore.oldconponsList = []
  conponsLise.value.forEach(item => {
    let arr = Object.assign({},item)
    CouponsStore.oldconponsList.push(arr)
  }
  )
  CouponsStore.couponsList.forEach((item)=>{
    if(item.CouponType === 1){
      noThreshold(item)
    }
    else if(item.CouponType === 2){
      fullMinus(item)
    }
    else if(item.CouponType === 3){
      disCount(item)
    }
    else if(item.CouponType === 4){
      instantReduction(item)
    }
  })
  CouponsStore.couponsList.forEach((item)=>{
    const coupon = conponsLise.value.find(coupons=>coupons.id === item.id)
    if(coupon === undefined)  item.Isvalue = false
    else {
      item.Isvalue = true
    }
  })
  CouponsStore.conponsList = conponsLise.value
  const IsvalueArr = CouponsStore.couponsList.filter(item => item.Isvalue === true)
  const NovalueArr = CouponsStore.couponsList.filter(item => item.Isvalue !== true)
  IsvalueArr.sort(sortRule)
  if(CouponsStore.oldconponsList.length === conponsLise.value.length){
    CouponsStore.oldconponsList.forEach((item,index)=>{
    if(item.id !== conponsLise.value[index].id ||  item.coupon !== conponsLise.value[index].coupon)
     flag.value = true
  })
  }
  if(IsvalueArr.length > 0){
    IsvalueArr.forEach((item)=>item.isMaxCoupon = false)
    IsvalueArr[0].isMaxCoupon = true
    IsvalueArr.forEach(item=> item.isChecked = false)
    CouponsStore.couponsSortList = [...IsvalueArr,...NovalueArr]
    CouponsStore.usefulCouponList = IsvalueArr
    if(reviseIndex.value === -1) { 
      reviseIndex.value = 0 
      IsvalueArr[0].isChecked
      return 0
    }
    else {
      if(conponLength.value !== IsvalueArr.length || flag.value){
        // IsvalueArr[reviseIndex.value].isChecked = false
        IsvalueArr[0].isChecked = true
        reviseIndex.value = 0
        CouponsStore.curConpons = IsvalueArr[0] 
        conponLength.value = IsvalueArr.length
        flag.value = false
      }
      // console.log('reviseIndex----',reviseIndex.value);
      CouponsStore.curConpons = IsvalueArr[reviseIndex.value] 
      CouponsStore.curConpons.isChecked = true
    }
    const curId = CouponsStore.curConpons.id
    // console.log('curId----',curId);
    const res = conponsLise.value.find((item)=>item.id === curId).coupon
    CouponsStore.ConponsPay = res
    return res
  }
  return 0
})

function sortRule(a,b) {
    return findCouponId(b.id).coupon - findCouponId(a.id).coupon;
}

//计算无门槛优惠
const noThreshold = (item)=>{
  const res = findCouponId(item.id)
  if(allPay.value >= item.CouponPrice){
    res === undefined ? conponsLise.value.push({id:item.id ,coupon:item.CouponPrice}) : res.coupon = item.CouponPrice
  }
  else{
    // item.CouponPrice -= allPay
    res === undefined ? conponsLise.value.push({id:item.id ,coupon:allPay.value}): res.coupon= allPay.value
  }
}

//计算满减优惠
const fullMinus = (item)=>{
  const res = findCouponId(item.id)
  if(allPay.value >= item.CouponLocalPrice){
    res === undefined ? conponsLise.value.push({id:item.id ,coupon:item.CouponPrice}): res.coupon = item.CouponPrice
  }
  else{
    const index = conponsLise.value.findIndex(index=>index.id===item.id)
    if(index !== -1) conponsLise.value.splice(index, 1)
  }
}

//计算折扣
const disCount = (item)=>{
  const res = findCouponId(item.id)
  if(!item.CouponLocalPrice || allPay.value >= item.CouponLocalPrice) 
  res === undefined ? conponsLise.value.push({id:item.id ,coupon: ((1 - item.CouponPrice * 0.1) * allPay.value).toFixed(2)}): res.coupon = ((1-item.CouponPrice * 0.1) * allPay.value).toFixed(2)
  else{
    const index = conponsLise.value.findIndex(index=>index.id===item.id)
    if(index !== -1) conponsLise.value.splice(index, 1)
  }
}

//计算立减
const instantReduction = (item)=>{
  const res = findCouponId(item.id)
  if(allPay.value >= item.CouponLocalPrice){
    res === undefined ? conponsLise.value.push({id:item.id ,coupon:item.CouponPrice}): res.coupon = item.CouponPrice
  }
  else{
    const index = conponsLise.value.findIndex(index=>index.id===item.id)
    if(index !== -1) conponsLise.value.splice(index, 1)
  }
}

const findCouponId = (id)=>{
  return conponsLise.value.find(item=>item.id === id) 
}

//计算购物车被选物品的总价
const allPay = computed(()=>{
  let res = 0
  checkedList.value.forEach((item,index)=>{
    if(item === true){
      res += CartStore.Cartdata[index].price * CartStore.Cartdata[index].count
    }
  })
  return res
})

//点击图标➖删除该列商品信息
const deleteCart = (index)=>{
  if(CartStore.Cartdata.length===1)CartStore.Cartcount=0
  CartStore.cartNameList.splice(index,1)
  CartStore.Cartdata.splice(index,1)
  checkedList.value.splice(index,1)
}

//监听购物车列表商品数量变化
watch(CartStore.Cartdata,(newvalue)=>{
    CartStore.Cartcount = newvalue.reduce((pre,cur)=>pre + cur.count,0)
})

//点击删除，删除所有勾选的商品信息
const deleteHandel = ()=>{
  let length = checkedList.value.length
  for(let i = 0 ;i < length ;i++){
    if(checkedList.value[i] === true){
      CartStore.cartNameList.splice(i,1)
      CartStore.Cartdata.splice(i,1)
      checkedList.value.splice(i,1)
      i--
      length--
    }
  }
  if(length === 0){ CartStore.Cartcount=0}
}

const selectedCount = computed(()=>{
  let res = 0 
  checkedList.value.forEach((item)=>{
    if(item) res++
  })
  return res
})

const revisePay = (value)=>{
  reviseIndex.value = value
}

</script>

<style lang="less" scoped>
.content{
    position: relative;
    height: 100%;
    overflow: hidden;
    .content-header{
      display: flex;
      justify-content: space-between;
      margin-right: 20px;
      align-items: center;
      z-index: 999;
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
      .button{
        flex: 0 0 106px
      }
    }
}

::v-deep(.el-card__header){
  padding: 10px 20px;
}

::v-deep(.el-card__body){
  padding: 0;
}

.scroll-wrapper{
  height: 520px;
  overflow: hidden;
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

::v-deep(.el-table__header){
  .cell{
    font-weight: 700;
    color:rgb(88, 88, 88)
  }
}

::v-deep(.el-table__cell){
  padding: 15px 10px;
  .cell{
    font-size:18px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .iconfont.icon-jianshao{
    position: absolute;
    color: #00a0dc;
    font-size: 22px;
    padding: 5px 0;
    transition: all .5s;
    left:42%;
    opacity: 0;
    &.forbid{
    cursor:not-allowed;
    color: #a4d4e5;
    }
    &.appearJianshao{
      animation: showjianshao 0.5s ease forwards;
    } 
    &.disappearJianshao{
      animation: returnjianshao 0.5s ease forwards;
    } 
    }
    .iconfont.icon-jia{
      right: 41%;
      position: absolute;
      color: #00a0dc;
      font-size: 22px;
      padding: 5px 0;
      transition: all .5s;
      opacity: 0;
      &.appearJia{
      animation: showjia 0.5s ease forwards;
      } 
      &.disappearJia{
      animation: returnjia 0.5s ease forwards;
      } 
    }
  }
}

::v-deep(.el-table__row){
  z-index: 4;
}

.manage{
  color: #f01414;
}

.iconfont.icon-jianhao{
  color:#f01414;
  font-size: 20px;
  transition: all .3s;
  opacity: 0;
  &.move{
    animation: showjianhao 0.6s ease forwards;
  }
  &.disappear{
    animation: disappearjianhao 0.3s ease forwards;
  }
}

@keyframes showjianhao{
  0%{transform: translateX(2vw);opacity: 0};
  70%{opacity: 0.6;}
  100%{transform: translateX(0px);opacity: 1;}
}

@keyframes disappearjianhao{
  0%{transform: translateX(0px);opacity: 1;};
  50%{opacity: 0.2;}
  100%{transform: translateX(2vw);opacity: 0;}
}

::v-deep(.el-checkbox__inner){
  border: 1px solid rgb(164, 164, 164);
  margin-left: 20px;
}

::v-deep(.el-table__header .el-table-column--selection .el-checkbox__inner) {
display: none;
pointer-events:none;
}

::v-deep(.footer-left .el-checkbox__inner) {
  width: 18px;
  height: 18px;
  border: 1px solid rgb(164, 164, 164);
}

@keyframes showjianshao{
  0%{opacity: 0;};
  60%{opacity: 0.5;};
  100%{opacity: 1;left: 0 ;transform: rotate(-540deg);}
}

@keyframes returnjianshao{
  0%{opacity: 1;transform:rotate(-360deg);left: 0};
  60%{opacity: 0.5;};
  100%{opacity: 0;}
}

@keyframes showjia{
  0%{opacity: 0;};
  60%{opacity: 0.5;};
  100%{opacity: 1;right: 0;transform:rotate(540deg);}
}

@keyframes returnjia{
  0%{opacity: 1;right: 0;transform:rotate(360deg)};
  60%{opacity: 0.5;};
  100%{opacity: 0;}
}

.el-input{
  line-height: 32px;
  font-size:15px;
  cursor: pointer;
  z-index: 5;
}

.cost{
  font-size: 20px;
  color:#f01414;
}

.footer{
  position: fixed;
  height: 72px;
  background-color: rgb(226, 226, 226);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all .3s;
  opacity: 1;
  bottom: 0px;
  left:0;
  right: 0;
  z-index: 999;
  &.showPay{
    animation:appear 0.3s ease forwards;
  }
  &.disappearPay{
    animation:disappear 0.6s ease forwards;
  }
  &.showDelete{
    animation:appear 0.6s ease forwards;
  }
  &.disappearDelete{
    animation:disappear 0.3s ease forwards;
  }
  .footer-left{
    display: flex;
    margin-left: 16px;
    font-size:15px;
    color:#7f7f7f;
    align-items: center;
  }
  .footer-right{
    display: flex;
    align-items: center;
    .el-button{
      margin: 0 30px 0 15px;
      width: 100px;
    }
  }
  .total{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    p{
      margin-bottom: 3px;
      line-height: 20px;
    }
    .pay{
    font-size: 25px;
    color:#f01414;
    }
    .prefer{
      color:rgb(255, 0, 0);
      font-size: 13px;
      i{
        font-size: 14px;
        padding: 0 3px;
      }
    }
    .detail{
      font-size: 15px;
      cursor: pointer;
      margin-left: 7px;
      .iconfont{
        font-weight: 700;
      }
    }
    .selected{
      color:rgb(134, 132, 132);
      font-size:14px
    }
  }
}

@keyframes disappear {
  0%{opacity: 1}
  50%{opacity: 0.2;}
  100%{opacity: 0;transform: translateY(120px)}
}

@keyframes appear {
  0%{opacity: 0;transform: translateY(120px);}
  50%{opacity: 0.2;}
  70%{opacity: 0.6;}
  100%{opacity: 1;}
}

.footer-left ::after{
  width: 5px;
  height: 10px;
  translate: 1px;
}

.fixFooter{
  height: 72px;
  width: 100%;
  color: rgb(115, 115, 115);
  bottom: 20px;
  text-align: center;
  line-height: 72px;
}
</style>