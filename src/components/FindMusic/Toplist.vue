<template>
  <div class="toplist">
    <div class="tl_l">
      <h2>云音乐特色榜</h2>
      <ul v-if="lList.length">
        <template v-for="(item, index) of lList" :key="index">
          <h2 v-if="index == 4"><span>全球媒体榜</span></h2>
          <router-link
            :to="'/discover/toplist?id=' + item.id"
            @click="trans(item.id)"
          >
            <li :class="indexs == item.id ? 'selectLi' : ''">
              <img v-lazy="`${item.coverImgUrl}?param=40y40`" alt="" />
              <div class="l_ct">
                <p>{{ item.name }}</p>
                <p class="l_c">
                  {{ item.updateFrequency }}
                </p>
              </div>
            </li>
          </router-link>
        </template>
      </ul>
    </div>
    <div class="tl_r">
      <div class="g_wrap">
        <div class="g_logo">
          <img :src="`${quan.coverImgUrl}?param=150y150`" alt="" />
          <span></span>
        </div>
        <div class="g_title">
          <h2>{{ quan.name }}</h2>
          <div class="g_gx">
            <i></i>
            <span>最近更新：{{ Time(quan.trackNumberUpdateTime) }}</span>
            <!-- <span> ({{ updateFrequency }}) </span>  无数据-->
          </div>
          <global-com-btn
            :quan="quan"
            :subscribedCount="subscribedCount"
            :info="info"
            @playing="playing"
          />
        </div>
      </div>
      <div class="g_List">
        <div class="g_Lhead">
          <h2>歌曲列表</h2>
          <span>{{ quan.trackCount }}首歌</span>
          <div class="header_r">
            播放：<strong>{{ quan.playCount }}</strong
            >次
          </div>
        </div>
        <table class="R_list" v-if="TpList.length">
          <tr>
            <th width="77"></th>
            <th width="326">歌曲标题</th>
            <th width="91">时长</th>
            <th width="173">歌手</th>
          </tr>
          <tr
            v-for="(item, index) of TpList"
            :key="index"
            :class="index % 2 == 0 ? '' : 'even'"
          >
            <td width="77" style="width: 77px">
              <div class="hd">
                <span class="num">{{ index + 1 }}</span>
                <!-- <span
                  :class="[
                    item.lastRank - item.rank > 0 ? 'top' : '',
                    item.lastRank - item.rank < 0 && item.lastRank != -1
                      ? 'bottom'
                      : '',
                    item.no == 0 ? 'new' : '',
                  ]"
                >
                  <i></i
                  ><span class="urnk">{{
                    abs(item.lastRank - index - 1)
                  }}</span></span
                > -->
                <!-- 无数据 -->
              </div>
            </td>
            <td width="326" style="width: 326px">
              <div :class="['f_cb', index <= 2 ? 'f_cb1' : '']">
                <router-link
                  v-if="index <= 2"
                  class="img"
                  :to="'/song?id=' + item.id"
                >
                  <img
                    :src="`${item.al.picUrl}?param=50y50&quality=100`"
                    alt=""
                /></router-link>
                <span
                  :class="['ply', item.id == state.ids ? 'ccolor' : '']"
                  @click="Played(index)"
                ></span>
                <span class="txt">
                  <router-link :to="'/song?id=' + item.id">{{
                    item.name
                  }}</router-link>
                  <span class="hui" v-if="item.alia[0]"
                    >-({{ item.alia[0] }})</span
                  >
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
            <td width="173" style="width: 173px">
              <div class="name">
                <template v-for="(items, indexs) of item.ar" :key="indexs">
                  <router-link :to="'/artist?id=' + items.id" class="ar">{{
                    items.name
                  }}</router-link>
                  <span class="line" v-if="item.ar.length - 1 != indexs"
                    >/</span
                  >
                </template>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { watchEffect } from "@vue/runtime-core";
import GlobalComBtn from "../../GlobalCom/GlobalComBtn.vue";
import { Time } from "../../untils/TimeTrans";
import { Times } from "../../untils/TimeTran";
import { useStore } from "vuex";
import { api } from "../../untils/baseProxy";
import { unique } from "../../untils/Set";
export default {
  components: { GlobalComBtn },
  setup() {
    const { state, commit, dispatch } = useStore();
    const Route = useRoute();
    const LList = reactive({
      indexs: Route.query.id ? Route.query.id : "19723756",
      lList: [],
      updateFrequency: "",
      trans(index) {
        this.indexs = index;
      },
      indexss(id = "19723756") {
        this.indexs = id;
      },
      async getlList() {
        await axios.get(api + "/toplist").then((res) => {
          this.lList = res.list;
        });
      },
    });
    LList.getlList();
    const ctt = reactive({
      TpList: [],
      quan: [],
      subscribedCount: [],
      info: [],
      async getctt(id = "19723756") {
        await axios.get(api + "/playlist/detail?id=" + id).then((res) => {
          this.quan = res.playlist;
          this.subscribedCount = res.playlist.subscribedCount;
          this.TpList = res.playlist.tracks;
          document.title = this.quan.name + "- 排行榜 - 网易云音乐";
          state.title = this.quan.name + "- 排行榜 - 网易云音乐";
        });
      },
    });
    const ao = document.querySelector("audio");
    watchEffect(() => {
      if (Route.path == "/discover/toplist") {
        ctt.getctt(Route.query.id);
        LList.indexss(Route.query.id);
      }
    });
    const playing = async () => {
      state.songList = ctt.TpList;
      state.songListIndex = 0;
      state.ids = ctt.TpList[state.songListIndex].id;
      await dispatch("getAudios", ctt.TpList[state.songListIndex].id);
      await dispatch("getPlayText", ctt.TpList[state.songListIndex].id);
      commit("isSetPlay");
      if (ao.played) {
        ao.load();
        ao.play();
      } else {
        ao.play();
      }
    };
    const Played = async (index) => {
      state.ids = ctt.TpList[index].id;
      await state.songList.push(ctt.TpList[index]);
      state.songList = unique(state.songList);
      const uls = document.querySelector('.f_cbss')
      uls.querySelector('.select').click()
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
    const abs = (num) => {
      return Math.abs(num);
    };
    return {
      ...toRefs(LList),
      Route,
      ...toRefs(ctt),
      Time,
      playing,
      Times,
      state,
      abs,
      Played,
    };
  },
};
</script>
<style lang="less" scoped>
.toplist {
  width: 980px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-top: 0;
  border-bottom: 0;
  display: flex;
  .tl_l {
    width: 240px;
    height: 100%;
    padding-top: 40px;
    h2 {
      padding: 0 10px 12px 15px;
      font-size: 14px;
      color: #000;
      font-weight: bold;
      font-family: simsun, \5b8b\4f53;
      margin: 0px;
    }
    ul {
      width: 100%;
      a {
        display: block;
        width: 100%;
        height: 100%;
        color: #000;
        li {
          width: 100%;
          padding: 10px 0 10px 20px;
          height: 62px;
          display: flex;
          img {
            width: 42px;
            height: 42px;
            margin-right: 10px;
          }
          .l_ct {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
              margin: 0;
            }
            .l_c {
              color: #999;
            }
          }
        }
        li:hover {
          background-color: #e6e6e6;
        }
        .selectLi {
          background-color: #e6e6e6;
        }
      }
    }
  }
  .tl_r {
    width: 740px;
    height: 100%;
    background-color: #fff;
    border-left: 1px solid #d3d3d3;
    .g_wrap {
      width: 100%;
      padding: 40px;
      display: flex;
      .g_logo {
        width: 158px;
        height: 158px;
        border: 1px solid #ccc;
        position: relative;
        img {
          width: 150px;
          height: 150px;
          position: absolute;
          top: 3px;
          left: 3px;
        }
        span {
          display: block;
          position: absolute;
          width: 150px;
          height: 150px;
          top: 3px;
          left: 3px;
          background: url("../../../public/static/coverall.png") no-repeat;
          background-position: -230px -380px;
        }
      }
      .g_title {
        width: 473px;
        margin-left: 28px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h2 {
          line-height: 24px;
          font-size: 20px;
          margin: 15px 0 3px;
        }
        .g_gx {
          margin: 0 0 20px;
          line-height: 35px;
          i {
            float: left;
            margin: 9px 5px 0 3px;
            width: 13px;
            height: 13px;
            background: url("../../../public/static/icon.png") no-repeat;
            background-position: -18px -682px;
          }
          span {
            color: #666;
          }
          span:nth-of-type(2) {
            color: #999;
          }
        }
      }
    }
    .g_List {
      padding: 0 30px 40px 40px;
      .g_Lhead {
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
          margin-top: 5px;
          strong {
            color: #c20c0c;
          }
        }
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
          background: url("../../../public/static/table.png") no-repeat;
          background-color: #f7f7f7;
          background-position: 0 0;
          background-repeat: repeat-x;
          border: 1px solid #d9d9d9;
        }
        td {
          // height: 30px;
          padding: 6px 10px;
          line-height: 18px;
          text-align: left;
          position: relative;
          .hd {
            span {
              display: block;
              width: 100%;
              text-align: center;
              color: #999;
              i {
                margin: -1px 2px 0 0;
                display: inline-block;
                width: 6px;
                height: 6px;
                background: url("../../../public/static/icon.png") no-repeat;
                background-position: -74px -274px;
              }
              .urnk {
                display: inline;
              }
            }
            .new {
              i {
                margin: 0;
                width: 16px;
                height: 17px;
                background-position: -67px -283px;
              }
              .urnk {
                display: none;
              }
            }
            .top {
              color: #c20c0c;
              i {
                vertical-align: middle;
                background-position: -74px -304px;
              }
            }
            .bottom {
              color: #4abbeb;
              i {
                vertical-align: middle;
                background-position: -74px -324px;
              }
            }
            .num {
              display: inline-block;
              line-height: 18px;
              text-align: center;
              width: 25px;
              color: #999;
            }
          }
          .f_cb {
            width: 215px;
            height: 18px;
            .ply {
              margin-right: 8px;
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
          .f_cb1 {
            width: 100%;
            height: 50px;
            img {
              float: left;
              width: 50px;
              height: 50px;
              margin-right: 14px;
            }
            .ply {
              margin-top: 16px;
            }
            .txt {
              max-width: 191px;
              margin-top: 16px;
            }
          }
          .opt {
            display: none;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
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
}
</style>