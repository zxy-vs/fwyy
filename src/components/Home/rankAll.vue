<template>
  <ul v-if="list.length">
    <li v-for="(item, index) of list" :key="index">
      <div class="hd">
        <span 
         :class="['play', item.song.id == state.ids ? 'playing' : '']"
         @click="Played(index)"></span>
        <span class="num">{{ index + 1 }}.</span>
      </div>
      <div class="song">
        <div class="tt">
          <div class="txt">
            <router-link :to="'/song?id=' + item.song.id" class="name">{{
              item.song.name
            }}</router-link>
            <span>
              <em>&nbsp;-&nbsp;</em>
              <span>
                <template v-for="(items, indexs) of item.song.ar" :key="indexs">
                  <router-link :to="'/artist?id=' + items.id">{{
                    items.name
                  }}</router-link>
                  <span v-if="item.song.ar.length - 1 != indexs"
                    >&nbsp;/&nbsp;</span
                  >
                </template>
              </span>
            </span>
          </div>
        </div>
        <div class="opt">
          <a href="javascript:;" class="a"></a>
          <a href="javascript:;" class="s"></a>
          <a href="javascript:;" class="f"></a>
          <a href="javascript:;" class="x"></a>
        </div>
      </div>
      <div class="tops">
        <span :style="'width:' + item.score + '%;'"></span>
      </div>
    </li>
  </ul>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { watchEffect } from "@vue/runtime-core";
import { useStore } from 'vuex';
export default {
  setup() {
    const Route = useRoute();
    const {state,dispatch} = useStore()
    const Week = reactive({
      list: [],
      async getList(id) {
          await axios.get(`/api/user/record?uid=${id}&type=0`).then((res) => {
            this.list = res.allData;
            if (this.list.length >= 10) {
              this.list.length = 10;
            }
          });
      },
    });
    const ao = document.querySelector("audio");
    const Played = async (index) => {
      state.ids = Week.list[index].song.id;
      await dispatch("getAudios", state.ids);
      await dispatch("getPlayText", state.ids);
      clearInterval(state.tst);
      const pg = document.querySelector(".c_cur");
      state.tst = setInterval(() => {
        pg.style.width =
          (100 / parseInt(state.time / 1000)) * state.currentTime + "%";
      }, 1000 / 60);
      state.isPlay = true;
      if (ao.played) {
        ao.load();
        ao.play();
      } else {
        ao.play();
      }
    };
    watchEffect(() => {
      if (Route.path == "/home") {
        Week.getList(Route.query.id);
      }
    });
    return {
      ...toRefs(Week),
      Played,state
    };
  },
};
</script>

<style lang="less" scoped>
ul {
  border: 1px solid #e2e2e2;
  border-top: none;
  li {
    height: 38px;
    line-height: 38px;
    overflow: hidden;
    .hd {
      float: left;
      width: 72px;
      height: 38px;
      overflow: hidden;
      .play {
        float: right;
        display: inline;
        margin-top: 10px;
        width: 17px;
        height: 17px;
        cursor: pointer;
        background: url("../../../public/static/table.png") no-repeat;
        background-position: 0 -103px;
      }
      .play:hover {
        background-position-y: -128px;
      }
      .playing {
        background-position: -20px -128px;
      }
      .num {
        float: left;
        display: inline;
        padding-left: 5px;
        padding-right: 8px;
        width: 50px;
        line-height: 38px;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        color: #666;
      }
    }
    .song {
      float: left;
      position: relative;
      z-index: 1;
      zoom: 1;
      padding-left: 10px;
      width: 480px;
      height: 38px;
      line-height: 38px;
      overflow: hidden;
      .tt {
        float: left;
        width: 100%;
        .txt {
          position: relative;
          max-width: 99%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .name {
            font-weight: bold;
            color: #333;
          }
          span {
            color: #aeaeae;
            a {
              color: #aeaeae;
              font-weight: normal;
            }
          }
          a:hover {
            text-decoration: underline;
          }
        }
      }
      .opt {
        position: absolute;
        z-index: 1;
        right: 0;
        top: 11px;
        display: none;
        width: 92px;
        height: 20px;
        overflow: hidden;
        a {
          float: left;
          margin-top: 2px;
          width: 18px;
          height: 16px;
          margin-right: 4px;
          background: url("../../../public/static/table.png") no-repeat;
        }
        .a {
          width: 13px;
          height: 13px;
          background: url("../../../public/static/icon.png") no-repeat;
          background-position: 0 -700px;
        }
        .s {
          background-position: 0 -174px;
        }
        .f {
          background-position: 0 -195px;
        }
        .x {
          background-position: -81px -174px;
        }
      }
    }
    .tops {
      float: right;
      position: relative;
      z-index: 1;
      zoom: 1;
      width: 319px;
      height: 38px;
      line-height: 38px;
      span {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 38px;
        background-color: #4eb4f5;
        opacity: 0.1;
      }
    }
  }
  li:hover {
    background-color: #f3f3f3;
    .opt {
      display: block;
      .a:hover {
        background-position-x: -22px;
      }
      .s:hover {
        background-position-x: -20px;
      }
      .f:hover {
        background-position-x: -20px;
      }
      .x:hover {
        background-position-x: -104px;
      }
    }
  }
  li:nth-of-type(even) {
    background-color: #f7f7f7;
  }
  li::after {
    clear: both;
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
  }
}
</style>