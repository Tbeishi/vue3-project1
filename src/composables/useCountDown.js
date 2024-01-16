import { computed, ref } from 'vue'
import dayjs from 'dayjs'
//封装倒计时函数
export const useCountDown = ()=>{
    const time = ref(0)
    //格式化时间
    const MSTime = computed(()=> dayjs.unix(time.value).format('mm分ss秒'))
    const STime = ref(0)
    //开始倒计时函数
    const start = (currentTime)=>{
        //开始倒计时逻辑
        //每隔1s就减1
        STime.value = currentTime
        setInterval(()=>{
            STime.value --
        },1000)
    }
    return {
        STime,
        start
    }
}