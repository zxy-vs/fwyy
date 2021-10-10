<template>
  <table class="R_list" v-if="lists">
    <tr
      v-for="(item, index) of lists"
      :key="index"
      :class="index % 2 != 0 ? '' : 'even'"
    >
      <td width="40" style="width: 40px">
        <span
          :class="['ply', item.id == state.ids ? 'ccolor' : '']"
          @click="Played(index)"
        ></span>
      </td>
      <td width="370" style="width: 370px">
        <div class="f_cb">
          <span class="txt">
            <router-link :to="'/song?id=' + item.id">{{
              item.name
            }}</router-link>
            <span class="hui" v-if="item.alia[0]">-({{ item.alia[0] }})</span>
            <router-link
              class="mv"
              v-if="item.mv"
              :to="'/mv?id=' + item.mv"
            ></router-link>
          </span>
        </div>
      </td>
      <td width="96" style="width: 96px">
        <div class="opt">
          <a href="javascript:;" class="a"></a>
          <a href="javascript:;" class="s"></a>
          <a href="javascript:;" class="f"></a>
          <a href="javascript:;" class="x"></a>
        </div>
      </td>
      <td width="130" style="width: 130px">
        <div class="name">
          <template v-for="(items, indexs) of item.ar" :key="indexs">
            <router-link :to="'/artist?id=' + items.id" class="ar">{{
              items.name
            }}</router-link>
            <span class="line" v-if="item.ar.length - 1 != indexs">/</span>
          </template>
        </div>
      </td>
      <td width="156" style="width: 156px">
        <router-link :to="'/album?id=' + item.al.id" class="ar al">{{
          item.al.name
        }}</router-link>
      </td>
      <td width="72" style="width: 72px">
        <span class="t">{{ Times(item.dt) }}</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { Times } from "../../untils/TimeTran";
export default {
  setup() {
    const { state,dispatch } = useStore();
    const Route = useRoute();
    const list = reactive({
      lists: [],
      async getnavList(key, type = 1) {
        await axios
          .get(`/api/cloudsearch?keywords=${key}&type=${type}&limit=20`)
          .then((res) => {
            this.lists = res.result.songs;
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
      Times,
      Played,
    };
  },
};
</script>

<style lang="less" scoped>
.R_list {
  width: 100%;
  border: 1px solid #d9d9d9;
  tr {
    padding: 10px 10px 8px 18px;
    border: 1px solid #fff;
    background-color: #f7f7f7;
    td {
      height: 43px;
      line-height: 18px;
      text-align: left;
      padding: 10px 0 8px;
      position: relative;
      .ply {
        float: left;
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
        width: 370px;
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
      }
      .opt {
        display: none;
        position: absolute;
        bottom: 12px;
        width: 100%;
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
      .name {
        max-width: 100%;
        height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
    }
    td:nth-of-type(1) {
      padding-left: 18px;
    }
    td:nth-of-type(6) {
      padding-right: 10px;
    }
  }
  tr:hover {
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
  .even {
    background-color: #fff;
  }
}
</style>