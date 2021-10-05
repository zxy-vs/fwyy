<template>
  <div>
    <div class="R_tabel_header">
      <h2>包含歌曲列表</h2>
      <span>{{ quan.size }}首歌</span>
    </div>
    <table class="R_list" v-if="data.length">
      <tr>
        <th width="77"></th>
        <th width="345">歌曲标题</th>
        <th width="91">时长</th>
        <th width="127">歌手</th>
      </tr>
      <tr
        v-for="(item, index) of data"
        :key="index"
        :class="index % 2 == 0 ? '' : 'even'"
      >
        <td width="77" style="width: 77px">
          <div class="hd">
            <span class="num">{{ index + 1 }}</span>
            <span
              :class="['ply', item.id == state.ids ? 'ccolor' : '']"
              @click="Played(index)"
            ></span>
          </div>
        </td>
        <td width="345" style="width: 326px">
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
        <td width="91" style="width: 91px">
          <span class="t">{{ Times(item.dt) }}</span>
          <div class="opt">
            <a href="javascript:;" class="a"></a>
            <a href="javascript:;" class="s"></a>
            <a href="javascript:;" class="f"></a>
            <a href="javascript:;" class="x"></a>
          </div>
        </td>
        <td width="127" style="width: 127px">
          <div class="name">
            <template v-for="(items, indexs) of item.ar" :key="indexs">
              <router-link :to="'/artist?id=' + items.id" class="ar">{{
                items.name
              }}</router-link>
              <span class="line" v-if="item.ar.length - 1 != indexs">/</span>
            </template>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { Times } from "../../../untils/TimeTran";
import { useStore } from "vuex";
export default {
  props: ["quan", "data"],
  setup(props) {
    const { state,dispatch } = useStore();
    const ao = document.querySelector('audio')
    const Played = async (index) => {
      console.log(props.data[index].id);
      state.ids = props.data[index].id;
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
    return {
      Times,
      state,Played
    };
  },
};
</script>
<style lang="less" scoped>
.R_tabel_header {
  width: 100%;
  height: 35px;
  border-bottom: 2px solid #c20c0c;
  h2 {
    float: left;
    font-size: 20px;
    font-weight: normal;
    margin: 0;
  }
  span {
    float: left;
    margin: 9px 0 0 20px;
  }
  .header_r {
    float: right;
  }
}
.R_list {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #d9d9d9;
  border-top: 0;
  tr {
    background-color: #f7f7f7;
    th {
      height: 36px;
      padding: 8px 10px;
      font-weight: normal;
      background: url("../../../../public/static/table.png") no-repeat;
      background-color: #f7f7f7;
      background-position: 0 0;
      background-repeat: repeat-x;
      border: 1px solid #d9d9d9;
    }
    td {
      padding: 6px 10px;
      line-height: 18px;
      text-align: left;
      position: relative;
      .hd {
        .ply {
          float: right;
          display: block;
          width: 17px;
          height: 17px;
          cursor: pointer;
          background: url("../../../../public/static/table.png") no-repeat;
          background-position: 0 -103px;
        }
        .ply:hover {
          background-position-y: -128px;
        }
        .ccolor {
          background-position: -20px -128px;
        }
        .num {
          display: inline-block;
          line-height: 18px;
          text-align: left;
          margin-left: 5px;
          width: 25px;
          color: #999;
        }
      }
      .f_cb {
        width: 215px;
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
            background: url("../../../../public/static/table.png") no-repeat;
            background-position: 0 -151px;
          }
        }
      }
      .opt {
        display: none;
        position: absolute;
        bottom: 6px;
        width: 100%;
        a {
          float: left;
          margin-top: 2px;
          width: 18px;
          height: 16px;
          margin-right: 4px;
          background: url("../../../../public/static/table.png") no-repeat;
        }
        .a {
          width: 13px;
          height: 13px;
          background: url("../../../../public/static/icon.png") no-repeat;
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
        width: 127px;
        height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .ar {
          float: left;
          display: block;
          color: #333;
        }
        .line {
          float: left;
        }
        .ar:hover {
          text-decoration: underline;
        }
      }
    }
    td:hover {
      .t {
        display: none;
      }
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
  }
  .even {
    background-color: #fff;
  }
}
</style>