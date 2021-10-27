<template>
<div>
    <div class="comList">
    <img v-if="list.coverImgUrl" :src="`${list.coverImgUrl}?param=140y140`" alt="" />
    <img v-if="list.picUrl" v-lazy='`${list.picUrl}?param=140y140`' alt="" />
    <router-link :to="'/playlist?id='+list.id" class="comLink"></router-link>
    <div class="comBottom">
      <a href="javascript:;" class="bottomLink" @click="Play(list.id)"></a>
      <span class="comIcon"></span>
      <span class="comNb">{{count}}</span>
    </div>
  </div>
  <p class="comTitle">
    <router-link :to="'/playlist?id='+list.id" class="comTitleText"
      >{{list.name}}</router-link
    >
  </p>
</div>
</template>

<script>
import { computed } from '@vue/reactivity';
import {NumberW } from '../untils/NumberW'
import { useStore } from 'vuex';
import { api } from '../untils/baseProxy';
export default {
  props:['list'],
  setup(props){
    const {state,commit,dispatch} =useStore()
    const count = computed(()=>{
      return  NumberW(parseInt(props.list.playCount))
    })
    let Play
    if(props.list){
      Play = async (id) => {
        await axios.get(api + "/playlist/detail?id=" + id).then(async (res) => {
          state.songListIndex = 0
          state.songList = res.playlist.tracks;
          state.ids = res.playlist.tracks[state.songListIndex].id;
          await dispatch("getAudios", res.playlist.tracks[state.songListIndex].id);
          await dispatch("getPlayText", res.playlist.tracks[state.songListIndex].id);
          commit("isSetPlay");
          const ao = document.querySelector("audio");
          if (ao.played) {
            ao.load();
            ao.play();
          } else {
            ao.play();
          }
        });
      }
    }
    return{
      count,Play
    }
  }
};
</script>

<style lang="less" scoped>
.comList {
  position: relative;
  width: 140px;
  height: 140px;
  img {
    width: 100%;
    height: 100%;
  }
  .comLink {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../public/static/coverall.png') no-repeat;
    background-position: 0 0;
  }
  .comBottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 27px;
    background: url("../../public/static/coverall.png");
    background-position: 0 -537px;
    color: #ccc;
    .bottomLink {
      display: block;
      position: absolute;
      right: 10px;
      bottom: 5px;
      width: 16px;
      height: 17px;
      background: url("../../public/static/iconall.png");
      background-position: 0 0;
    }
    .bottomLink:hover{
      background-position: 0 -60px;
    }
    .comIcon {
      display: block;
      float: left;
      width: 14px;
      height: 11px;
      background: url("../../public/static/iconall.png") no-repeat;
      background-position: 0 -24px;
      margin: 9px 5px 9px 10px;
    }
    .comNb {
      float: left;
      margin: 7px 0 0 0;
      line-height: 1.4;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
}
.comTitle {
  margin: 8px 0 3px;
  width: 140px;
  font-size: 14px;
  .comTitleText {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    text-decoration: none;
    color: #000;
    font-size: 14px;
  }
  .comTitleText:hover{
    text-decoration: underline;
  }
}
</style>