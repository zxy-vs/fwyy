<template>
  <table class="R_list" v-if="lists">
    <tr
      v-for="(item, index) of lists"
      :key="index"
      :class="index % 2 != 0 ? '' : 'even'"
    >
      <td width="46" style="width: 46px">
        <span
          :class="['ply', item.id == state.ids ? 'ccolor' : '']"
        ></span>
          <!-- @click="Played(index)" -->

      </td>
      <td width="70" style="width: 70px">
        <router-link :to="'/playlist?id=' + item.id"
          ><img :src="`${item.coverImgUrl}?param=180y180`" alt=""
        /></router-link>
      </td>
      <td width="327" style="width: 327px">
        <div class="f_cb">
          <span class="txt">
            <router-link :to="'/playlist?id=' + item.id">{{
              item.name
            }}</router-link>
          </span>
          <div class="opt">
            <a href="javascript:;" class="a"></a>
            <a href="javascript:;" class="s"></a>
            <a href="javascript:;" class="f"></a>
          </div>
        </div>
      </td>
      <td width="60" style="width: 60px">
        <span class="t">{{ item.trackCount }}首</span>
      </td>
      <td width="200" style="width: 200px">
        <div class="name">
          <span> by </span>
          <router-link :to="'/home?id=' + item.creator.userId" class="ar">{{
            item.creator.nickname
          }}</router-link>
        </div>
      </td>
      <td width="98" style="width: 98px">
        <span class="t">收藏：{{ item.bookCount }}</span>
      </td>
      <td width="99" style="width: 99px">
        <span class="t">收听：{{ NumberW(item.playCount) }}</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { NumberW } from "../../untils/NumberW";
import { api } from "../../untils/baseProxy";
export default {
  setup() {
    const { state, dispatch } = useStore();
    const Route = useRoute();
    const list = reactive({
      lists: [],
      async getnavList(key, type = 1) {
        await axios
          .get(`${api}/cloudsearch?keywords=${key}&type=${type}&limit=20`)
          .then((res) => {
            this.lists = res.result.playlists;
          });
      },
    });
    const ao = document.querySelector("audio");
    const Played = async (index) => {
      state.ids = list.lists[index].id;
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
      list.getnavList(Route.query.key, Route.query.type);
    });
    return {
      state,
      ...toRefs(list),
      NumberW,
      Played,
    };
  },
};
</script>

<style lang="less" scoped>
.R_list {
  width: 901px;
  border: 1px solid #d9d9d9;
  tr {
    border: 1px solid #fff;
    background-color: #f7f7f7;
    td {
      height: 72px;
      line-height: 18px;
      text-align: left;
      padding: 5px 10px;
      position: relative;
      .ply {
        float: right;
        display: block;
        width: 17px;
        height: 17px;
        cursor: pointer;
        background: url("../../../public/static/table.png") no-repeat;
        background-position: 0 -103px;
      }
      .ply:hover {
        background-position-y: -128px;
      }
      .ccolor {
        background-position: -20px -128px;
      }
      .f_cb {
        width: 307px;
        height: 18px;
        .txt {
          position: relative;
          display: inline-block;
          padding-right: 25px;
          margin-right: -25px;
          line-height: 18px;
          max-width: 99%;
          border: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a {
            color: #333;
            height: 30px;
          }
          a:hover {
            text-decoration: underline;
          }
          .hui {
            color: #aeaeae;
          }
          .mv {
            position: absolute;
            top: 0;
            right: 0;
            width: 23px;
            height: 17px;
            margin: 1px 0 0 0;
            background: url("../../../public/static/table.png") no-repeat;
            background-position: 0 -151px;
          }
        }
        .opt {
          display: none;
          position: absolute;
          right: 10px;
          bottom: 24px;
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
        }
      }
      .t {
        color: #999;
      }
      .name {
        max-width: 100%;
        height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          float: left;
          margin-right: 10px;
        }
        .ar {
          float: left;
          display: block;
          max-width: 69px;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ar:hover {
          text-decoration: underline;
        }
      }
      .ar {
        float: left;
        display: block;
        max-width: 69px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .line {
        float: left;
      }
      .ar:hover {
        text-decoration: underline;
      }
      .al {
        max-width: 107px;
      }
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  tr:hover {
    background-color: #f3f3f3;
    .f_cb {
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
      }
    }
  }
  .even {
    background-color: #fff;
  }
}
</style>