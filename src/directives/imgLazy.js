import { useIntersectionObserver } from "@vueuse/core";
export default (app)=>{
    //定义debounce指令
    app.directive('img-lazy',{
        mounted(el, binding){
            //el:指令绑定的那个元素 img
            //binding: binding.value 指令等于号后面绑定的表达式的值 图片url
            // 获取传递给指令的参数
        const {  stop } = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) =>{
                if(isIntersecting){
                    el.src = binding.value
                    stop()
                }
            }
        )
        }
    }
)}
