export default (app)=>{
    //定义debounce指令
    app.directive('debounce',{
        mounted(el, binding){
        // 获取传递给指令的参数
        const debounceConfig = {
            fn: binding.value.handler,
            args: binding.value.args || [], // 如果args没有传递，默认为空数组
          };
        el.debounceFn = debounce(debounceConfig, 200)
        el.addEventListener('click',el.debounceFn)
        }}
    )}

    //实现防抖函数代码
    //(我之前文章有详解)
    //fn相当于要执行防抖的函数，args是该函数的参数
    function debounce({fn,args},delay){
        let name;
        return function(){
            let _this = this;//这个this指向btn
            let arr = arguments //包含传递给函数的每个参数
            if(name) clearTimeout(name) //name有值，说明上次定时器还没执行完，这时清除上次定时器
            name = setTimeout(function(){
            fn.call(_this,...arr,...args) //将fn函数的this指向_this
            //arguments里的每个参数展开到send函数中作为实参
            // 调用防抖的处理函数，并传递参数
        }, delay);
    }
}
