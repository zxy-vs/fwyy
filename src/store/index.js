import axios from 'axios';
import {
  createStore
} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import {
  Times
} from '../untils/TimeTran';
export default createStore({
  state: {
    isKeys: true,
    isPlay: false,
    isTrue: false,
    playText: [],
    currentTime: 0,
    tst: null,
    time: 0,
    ids: 0,
    audios: '',
    picUrl: '',
    songList: [],
    songListIndex: 0,
    isLoop:0,
    isVolume:0,
  },
  getters: {
    Transtime(state) {
      return Times(state.time)
    }
  },
  mutations: {
    setTime(state,t){
      state.time = t
    },
    setisVolume(state,t){
      state.isVolume = t
    },
    setisLoop(state,t){
      state.isLoop = t
    },
    setPicUrl(state,pic) {
      state.picUrl = pic
    },
    setPlayText(state, list) {
      state.playText = list
    },
    isTranKeys(state) {
      state.isKeys = !state.isKeys
    },
    isSetPlay(state) {
      state.isPlay = true
    },
    isTransPlay(state) {
      state.isPlay = !state.isPlay
    },
    setAudios(state, ao) {
      state.audios = ao
    },
  },
  actions: {
    async getAudios({
      commit
    }, id) {
      await axios.get('/api/song/url?id=' + id).then(res => {
        commit('setAudios', res.data.data[0].url)
      })
    },
    async getPlayText({commit},id){
      await axios.get("/api/song/detail?ids=" + id).then((res) => {
        commit('setPlayText',res.data.songs[0])
        commit('setPicUrl',res.data.songs[0].al.picUrl)
        commit('setTime',res.data.songs[0].dt)
       });
    }
  },
  modules: {},
  plugins: [createPersistedState()],
})