<template>
  <div>
    <div class="n_b_s">
      <img :src="`${item.picUrl}?param=130y130`" alt="" />
      <router-link :to="'/album?id=' + item.id" class="n_s"></router-link>
      <a href="javascript:;" class="n_p" @click="play(item.id)"></a>
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
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { api } from '../../../untils/baseProxy';
export default {
  props: ["item"],
  setup(props) {
    const {state,commit,dispatch} = useStore()
    let play;
    if (props.item) {
      play = async (id) => {
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
    }
    return { play };
  }
}
</script>

<style lang="less" scoped>
.n_b_s {
  width: 130px;
  height: 130px;
  margin-bottom: 7px;
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
    width: 153px;
    height: 130px;
    background: url("../../../../public/static/coverall.png") no-repeat;
    background-position: 0 -845px;
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
</style>