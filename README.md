# 路由传参  使用useRouter方法
<!--
import { useRouter }  from 'vue-router' 
const router = useRouter()
 const navigate = () => {
    router.push({
    name:'mycart',  跳转组件名字
    params: { cartData:JSON.stringify(cartData.value) }  数据要转为JSON字符串
  })
} 
-->

# 目标组件接收参数 使用useRoute方法
<!-- import { useRoute } from 'vue-router'
const route= useRoute()
onMounted(()=>{
console.log(route.params.mycart);
}) -->

# 配置动态路由参数
<!-- 
{
 path:'/my/cart/:cartData',
 name:'mycart',
 component: ()=> import('@/views/cartPage/cartPage.vue'),
}
 -->