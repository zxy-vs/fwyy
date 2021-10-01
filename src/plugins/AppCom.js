import GlobalComHeader from '../GlobalCom/GlobalComHeader.vue'
import GlobalComList from '../GlobalCom/GlobalComList.vue'
import GlobalComDj from '../GlobalCom/GlobalComDj.vue'
import GlobalComDjT from '../GlobalCom/GlobalComDjT.vue'
export default{
    install(App){
        App.component('GlobalComHeader',GlobalComHeader)
        App.component('GlobalComList',GlobalComList)
        App.component('GlobalComDj',GlobalComDj)
        App.component('GlobalComDjT',GlobalComDjT)
    }
}