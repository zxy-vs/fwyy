<template>
<div>
    <div class="comList">
    <img v-if="list.coverImgUrl" :src="`${list.coverImgUrl}?param=140y140`" alt="" />
    <img v-if="list.picUrl" v-lazy='`${list.picUrl}?param=140y140`' alt="" />
    <router-link :to="'/playlist?id='+list.id" class="comLink"></router-link>
    <div class="comBottom">
      <router-link to="#" class="bottomLink"></router-link>
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
export default {
  props:['list'],
  setup(props){
    props.list.playCount
    const count = computed(()=>{
      return  NumberW(parseInt(props.list.playCount))
    })
    return{
      count
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