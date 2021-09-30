import { createRouter, createWebHistory } from 'vue-router'
import FindMusic from '../views/FindMusic.vue'
import Discover from '../components/FindMusic/Discover.vue'
const routes = [
  {
    path: '/',
    name: 'FindMusic',
    component: FindMusic,
    redirect: '/discover',
    children:[{
      path:'/discover',
      component:Discover
    },{
      path:'/discover/toplist',
      component:()=>import('../components/FindMusic/Toplist.vue')
    },{
      path:'/discover/playlist',
      component:()=>import('../components/FindMusic/Playlist.vue')
    },{
      path:'/discover/djradio',
      component:()=>import('../components/FindMusic/Djradio.vue')
    },{
      path:'/discover/artist',
      component:()=>import('../components/FindMusic/Artist.vue')
    },{
      path:'/discover/album',
      component:()=>import('../components/FindMusic/Album.vue')
    },{
      path:'/playlist',
      component:()=>import('../components/FindMusic/Related.vue')
    },{
      path:'/song',
      component:()=>import('../components/FindMusic/Song.vue')
    },{
      path:'/album',
      component:()=>import('../components/FindMusic/Albumed.vue')
    },{
      path:'/artist',
      component:()=>import('../components/FindMusic/Artisted.vue')
    },{
      path:'/mv',
      component:()=>import('../components/FindMusic/Mv.vue')
    }]
  }, {
    path: '/MyMusic',
    name: 'MyMusic',
    component: ()=>import('../views/MyMusic.vue')
  }, {
    path: '/MyFriends',
    name: 'MyFriends',
    component: ()=>import('../views/MyFriends.vue')
  }, {
    path: '/Download',
    name: 'Download',
    component: ()=>import('../views/Download.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
