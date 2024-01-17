import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
//封装倒计时函数
export const useMCountDown = ()=>{
    const time = ref(0)
    let name = null
    //格式化时间
    const MSTime = computed(()=> dayjs.unix(time.value).format('mm分ss秒'))
    //开始倒计时函数
    const start = (currentTime)=>{
        //开始倒计时逻辑
        //每隔1s就减1
        time.value = currentTime
        name = setInterval(()=>{
            time.value --
            if(time.value === 0){
                clearInterval(name)
            }
        },1000)
    }
    //组件销毁时清除定时器
    onUnmounted(()=>{
        name && clearInterval(name)
    })
    return {
        MSTime,
        start
    }
}