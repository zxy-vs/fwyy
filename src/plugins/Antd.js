import {
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons-vue'
import {
    Carousel,
    Table,
    Icon,
    Avatar,
    Badge,
    Input
} from 'ant-design-vue'
export default {
    install(App) {
        App.component('LeftOutlined', LeftOutlined)
        App.component('RightOutlined', RightOutlined)
        App.use(Carousel)
        App.use(Table)
        App.use(Icon)
        App.use(Avatar)
        App.use(Badge)
        App.use(Input)
    }
}