import { createWebHistory,createRouter } from 'vue-router'
const authUrls = ['/member/mydata','/pay','/order','/mycart','/member/discount','/member/order']
import { useUserStore } from '@/store/user';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/login',
            name:'login',
            component:()=>import ('@/views/LoginPage/LoginPage.vue'),
        },
        {
            path:'/',
            redirect:'/sy',
            component:()=>import ('@/views/layout/layoutPage.vue'),
            children:[
                {
                    path:'/sy',
                    name:'sy',
                    component:()=>import ('@/views/homePage/homePage.vue'),
                },
                {
                    path:'/food',
                    name:'food',
                    redirect:'/food/all',
                    component:()=>import ('@/views/foodPage/foodPage.vue'),
                    children:[
                        {
                            path:'/food/:message',
                            component:()=>import ('@/views/foodPage/components/PageSubject.vue'),
                        },
                    ]
                },
                {
                    path:'/member',
                    name:'member',
                    component:()=>import ('@/views/memberPage/memberPage.vue'),
                    redirect:'/member/mydata',
                    children:[
                        {
                            path:'/member/mydata',
                            name:'mydata',
                            component:()=>import ('@/views/memberPage/mydataPage/mydataPage.vue'),
                        },
                        {
                            path:'/member/discount',
                            name:'discount',
                            component:()=>import ('@/views/memberPage/discountPage/discountPage.vue'),
                        },
                        {
                            path:'/member/manage',
                            name:'manage',
                            component:()=>import ('@/views/memberPage/ManagePage/ManagePage.vue'),
                        },
                    ]
                },
                {
                    path:'/detail/:id',
                    name:'detail',
                    component:()=>import ('@/views/foodDetail/foodDetail.vue')
                },
                {
                    path:'/mycart',
                    name:'mycart',
                    component:()=>import ('@/views/cartPage/cartPage.vue')
                },
                {
                    path:'/pay',
                    name:'pay',
                    component:()=>import ('@/views/payPage/payPage.vue'),
                },
                {
                    path:'/search/:searchData',
                    name:'search',
                    component:()=>import ('@/views/searchPage/searchPage.vue')
                },
                {
                    path:'/order',
                    name:'order',
                    component:()=>import ('@/views/orderPage/orderPage.vue')
                },
            ]
        },
       
    ]
})

router.beforeEach((to,from,next)=>{
    const userStore = useUserStore();
    if(!authUrls.includes(to.path)){
        next()
    }
   else{
    if(!userStore.token) next('/login')
    else{
        if(to.path === '/pay' && from.path !== '/mycart') router.back(-1)
        else {
            next()
        }
    }
   }
})
export default router