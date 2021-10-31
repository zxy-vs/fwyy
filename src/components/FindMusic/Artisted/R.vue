<template>
  <div class="R">
    <div class="R_btn">
      <div class="btn">
        <a href="javascript:;" class="btn1" @click="Play"
          ><span><em></em>播放</span></a
        >
        <a href="javascript:;" class="btn2"></a>
        <a href="javascript:;" class="btn3">
          <span class="r_text">收藏热门50</span></a
        >
        <div class="btn_r">
          <div class="r_btn">
            <span class="r_t">
              <span>{{ select[indexs] }}</span>
              <em class="r_icon"></em>
            </span>
            <ul class="r_select">
              <li
                v-for="(item, index) of select"
                :key="index"
                @click="indexs = index"
                :class="indexs == index ? 'bgc' : ''"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <table class="R_list" v-if="RList.length">
      <tr
        v-for="(item, index) of RList"
        :key="index"
        :class="index % 2 == 0 ? '' : 'even'"
      >
        <td width="94" style="width: 94px">
          <div class="hd">
            <span class="num">{{ index + 1 }}</span>
            <span :class="['ply',item.id==state.ids?'ccolor':'']" @click="Played(item.id,index)"></span>
          </div>
        </td>
        <td width="309" style="width: 309px">
          <div class="f_cb">
            <span class="txt">
              <router-link :to="'/song?id=' + item.id">{{
                item.name
              }}</router-link>
              <router-link class="mv" v-if="item.mv" :to="'/mv?id='+item.mv"></router-link>
            </span>
          </div>
        </td>
        <td width="89" style="width: 89px">
          <span class="t">{{ Times(item.dt) }}</span>
          <div class="opt">
            <a href="javascript:;" class="a"></a>
            <a href="javascript:;" class="s"></a>
            <a href="javascript:;" class="f"></a>
            <a href="javascript:;" class="x"></a>
          </div>
        </td>
        <td width="148" style="width: 148px">
          <router-link :to="'/album?id=' + item.al.id" class="al">{{
            item.al.name
          }}</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref} from "@vue/reactivity";
import { Times } from "../../../untils/TimeTran";
import { useStore } from "vuex";
import { unique } from '../../../untils/Set';
export default {
  props: ["RList"],
  setup(props) {
    const { state,dispatch } = useStore();
    const select = ref(["热门单曲", "作词作品", "作曲作品"]);
    const indexs = ref(0);
    const ao = document.querySelector("audio");
    const Play = async () => {
      state.songList = props.RList;
      state.songListIndex = 0;
      state.ids = props.RList[state.songListIndex].id;
      await dispatch("getAudios", state.ids);
      await dispatch("getPlayText", state.ids);
      clearInterval(state.tst);
      const pg = document.querySelector(".c_cur");
      state.tst = setInterval(() => {
        pg.style.width = (100 / parseInt(state.time / 1000)) * state.currentTime + "%";
      }, 1000 / 60);
      state.isPlay = true;
      if (ao.played) {
        ao.load();
        ao.play();
      } else {
        ao.play();
      }
    };
     const Played = async (id,index) => {
      // console.log(props.RList[index].id);
      state.ids = id;
      await state.songList.push(props.RList[index]);
      state.songList = unique(state.songList);
      state.songListIndex = -1;
      await dispatch("getAudios", state.ids);
      await dispatch("getPlayText", state.ids);
      clearInterval(state.tst);
      const pg = document.querySelector(".c_cur");
      state.tst = setInterval(() => {
        pg.style.width = (100 / parseInt(state.time / 1000)) * state.currentTime + "%";
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
      select,
      indexs,
      Times,
      Play,
      Played,
      state
    }
  },
};
</script>

<style lang="less" scoped>
.R {
  .R_btn {
    width: 100%;
    height: 31px;
    margin: 20px 0 10px;
    .btn {
      .btn1 {
        float: left;
        display: block;
        padding-left: 5px;
        width: 65px;
        height: 31px;
        line-height: 31px;
        background: url("../../../../public/static/button2.png") no-repeat;
        background-position: 0 -387px;
        span {
          font-family: Arial, Helvetica, sans-serif;
          color: #fff;
          text-align: center;
          display: flex;
          justify-content: center;
          em {
            display: inline-block;
            z-index: 1;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin: 6px 2px 2px 0;
            background: url("../../../../public/static/button2.png") no-repeat;
            background-position: 0 -1622px;
            overflow: hidden;
          }
        }
      }
      .btn1:hover {
        background-position-y: -469px;
      }
      .btn2 {
        float: left;
        height: 31px;
        line-height: 30px;
        width: 32px;
        margin-right: 5px;
        cursor: pointer;
        display: block;
        background: url("../../../../public/static/button2.png") no-repeat;
        background-position: 0 -1588px;
      }
      .btn2:hover {
        background-position-x: -40px;
      }
      .btn3 {
        float: left;
        display: block;
        padding-right: 5px;
        margin-right: 6px;
        color: #333;
        background: url("../../../../public/static/button2.png") no-repeat;
        background-position: right -1020px;
        .r_text {
          display: block;
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          padding-right: 2px;
          padding-left: 28px;
          cursor: pointer;
          background: url("../../../../public/static/button2.png") no-repeat;
          background-position: 0 -977px;
        }
      }
      .btn3:hover {
        background-position: right -1106px;
        span {
          background-position: 0 -1063px;
        }
      }
      .btn_r {
        float: right;
        position: relative;
        .r_btn {
          color: #333;
          font-size: 12px;
          cursor: pointer;
          font-family: simsun, \5b8b\4f53;
          background: url("../../../../public/static/button2.png") no-repeat;
          background-position: right -100px;
          padding: 0 5px 0 0;
          white-space: nowrap;
          height: 31px;
          line-height: 31px;
          overflow: hidden;
          vertical-align: top;
          text-align: center;
          .r_t {
            display: inline-block;
            padding: 0 15px 0 20px;
            color: #333;
            background: url("../../../../public/static/button2.png") no-repeat;
            background-position: 0 -59px;
            vertical-align: top;
            text-align: center;
            cursor: pointer;
            height: 31px;
            line-height: 31px;
            overflow: hidden;
            .r_icon {
              display: inline-block;
              width: 8px;
              height: 5px;
              background: url("../../../../public/static/icon3.png") no-repeat;
              margin-left: 6px;
            }
          }
          .r_select {
            position: absolute;
            z-index: 1;
            display: none;
            width: 100px;
            height: 93px;
            margin-top: -2px;
            line-height: 30px;
            border: solid 1px #c3c3c3;
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
            box-shadow: 0 0 4px 0 rgb(0 0 0 / 10%);
            background-color: #fff;
            li {
              padding-left: 20px;
              text-align: left;
              border-bottom: solid 1px rgba(0, 0, 0, 0.1);
            }
            li:hover {
              background-color: rgba(0, 0, 0, 0.1);
            }
            .bgc {
              background-color: rgba(0, 0, 0, 0.1);
            }
          }
          .r_t:hover {
            background-position-y: -141px;
          }
        }
        .r_btn:hover {
          background-position-y: -182px;
          .r_select {
            display: block;
          }
        }
      }
    }
  }
  .R_list {
    width: 100%;
    border: none;
    border-collapse: collapse;
    border-spacing: 0;
    tr {
      background-color: #f7f7f7;
      td {
        height: 30px;
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
          .num {
            line-height: 18px;
            text-align: left;
            width: 25px;
            margin-left: 5px;
            color: #999;
          }
          .ccolor{
            background-position: -20px -128px;
          }
        }
        .f_cb {
          width: 269px;
          height: 18px;
          margin-right: 20px;
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
        .al {
          float: left;
          display: block;
          width: 128px;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .al:hover {
          text-decoration: underline;
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
}
</style>