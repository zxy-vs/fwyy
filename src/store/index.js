import axios from 'axios';
import {
  createStore
} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import {
  Times
} from '../untils/TimeTran';
import {
  api
} from '../untils/baseProxy'
export default createStore({
  state: {
    isKeys: true, //下播放框锁定
    isPlay: false, //播放暂停按键
    isTrue: false, //登录进入退出
    playText: [], //当前播放单曲的信息
    currentTime: 0, //当前单曲的当前播放时长
    tst: null, //定时器
    time: 0, //当前单曲总时长
    ids: 0, //当前单曲的id
    audios: '', //当前单曲的播放地址
    picUrl: '', //播放框的小图片
    songList: [], //播放列表
    songListIndex: 0, //播放列表的索引
    isLoop: 0, //播放下一首的类型 0，1，2,
    title: '', //title标题,
    songTxt:[] //播放歌曲的歌词
  },
  getters: {
    Transtime(state) {
      return Times(state.time)
    }
  },
  mutations: {
    setTime(state, t) {
      state.time = t
    },
    setisVolume(state, t) {
      state.isVolume = t
    },
    setisLoop(state, t) {
      state.isLoop = t
    },
    setPicUrl(state, pic) {
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
    setSongTxt(state, songTxt) {
      state.songTxt = songTxt
    },
  },
  actions: {
    async getAudios({
      commit
    }, id) {
      await axios.get(api + '/song/url?id=' + id).then(res => {
        commit('setAudios', res.data.data[0].url)
      })
    },
    async getPlayText({
      commit
    }, id) {
      await axios.get(api + "/song/detail?ids=" + id).then((res) => {
        commit('setPlayText', res.data.songs[0])
        commit('setPicUrl', res.data.songs[0].al.picUrl)
        commit('setTime', res.data.songs[0].dt)
      });
      await axios.get(api + "/lyric?id=" + id).then((res) => {
        if (res.data.lrc) {
          let txt = res.data.lrc.lyric;
          txt = txt.replace(/\[/g, "");
          txt = txt.replace(/\n/g, "]");
          txt = txt.split(']')
          commit('setSongTxt', txt)
        } else {
          commit('setSongTxt', "此音乐为纯音乐，无歌词")
        }
      });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
})