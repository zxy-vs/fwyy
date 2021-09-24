import GlobalComHeader from '../GlobalCom/GlobalComHeader.vue'
import GlobalComList from '../GlobalCom/GlobalComList.vue'
export default{
    install(App){
        App.component('GlobalComHeader',GlobalComHeader)
        App.component('GlobalComList',GlobalComList)
    }
}