<template>
  <ul class="AM">
    <li v-for="(item, index) of Album" :key="index">
      <div class="n_b_s">
        <img :src="`${item.blurPicUrl}?param=120y120`" alt="" />
        <router-link :to="'/album?id=' + item.id" class="n_s"></router-link>
        <a href="javascript:;" class="n_p" @click="Play(item.id)"></a>
      </div>
      <p class="n_b_x">
        <router-link :to="'/album?id=' + item.id" class="n_w">{{
          item.name
        }}</router-link>
      </p>
      <p class="n_b_xs">
        <span v-for="(items, index) of item.artists" :key="index">
          <router-link :to="'/artist?id=' + items.id"
            >{{ items.name }}
          </router-link>
          <i v-if="item.artists.length - 1 != index">&nbsp;/&nbsp;</i>
        </span>
      </p>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex';
import { api } from '../../../untils/baseProxy';
export default {
  props: ["Album"],
  setup(props){
    const {state,commit,dispatch} = useStore()
    let Play
    if(props.Album){
      Play = async (id) => {
        await axios.get(api + "/album?id=" + id).then(async (res) => {
          state.songListIndex = 0
          state.songList = res.songs;
          state.ids = res.songs[state.songListIndex].id;
          await dispatch("getAudios", res.songs[state.songListIndex].id);
          await dispatch("getPlayText", res.songs[state.songListIndex].id);
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
    return {
      Play
    }
  }
  }
};
</script>

<style lang="less" scoped>
.AM {
  width: 658px;
  height: 100%;
  margin: 20px 0 0 -18px;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 163px;
    height: 205px;
    overflow: hidden;
    padding: 0 0 30px 18px;
    line-height: 1.4;
    .n_b_s {
      width: 120px;
      height: 120px;
      position: relative;
      line-height: 1.4;
      img {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
      }
      .n_s {
        position: absolute;
        display: block;
        text-decoration: none;
        width: 145px;
        height: 120px;
        background: url("../../../../public/static/coverall.png") no-repeat;
        background-position: -170px -850px;
      }
      .n_s:hover + .n_p {
        opacity: 1;
      }
      .n_p {
        z-index: 1;
        display: block;
        opacity: 0;
        position: absolute;
        width: 28px;
        height: 28px;
        right: 5px;
        bottom: 5px;
        background: url("../../../../public/static/iconall.png");
        background-position: 0 -140px;
      }
      .n_p:hover {
        opacity: 1;
        background-position-y: -170px;
      }
    }
    .n_b_x {
      margin: 9px 0 3px;
      font-size: 14px;
      display: flex;
      a {
        float: left;
        display: inline;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #666;
        font-size: 14px;
        text-decoration: none;
      }
      .n_w {
        color: #000;
        float: left;
        width: 100%;
        height: 100%;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #000;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    .n_b_xs {
      width: 100%;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      a {
        color: #666;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>