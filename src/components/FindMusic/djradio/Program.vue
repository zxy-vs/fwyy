<template>
  <div class="dj_pro">
    <div class="dj_l">
      <div class="dj_title">
        <div class="djj_img">
          <img :src="`${List.coverUrl}?param=140y140`" alt="" />
        </div>
        <div class="cnt">
          <div class="cntc">
            <i></i>
            <div class="tit">
              <h2>{{ mainSong.name }}</h2>
            </div>
          </div>
          <div class="rdiname">
            <i class="vlogo"></i>
            <router-link :to="'/djradio?id=' + Radio.id" class="vname">{{
              dj.brand
            }}</router-link>
            <a href="javascript:;" class="f_flag">
              <span><em></em>订阅({{ Radio.subCount }}) </span>
            </a>
          </div>
        </div>
      </div>
      <div class="dj_play">
        <div class="dj_btn">
          <a href="javascript:;" class="btn1" @click="Play"
            ><span><em></em>播放{{ Times(List.duration) }}</span></a
          >
          <a href="javascript:;" class="btn3 bg2"
            ><span><i></i>({{ List.likedCount }})</span></a
          >
          <a href="javascript:;" class="btn3 bg3"
            ><span>({{ List.commentCount }})</span>
          </a>
          <a href="javascript:;" class="btn3 bg1">
            <span>({{ List.shareCount }})</span>
          </a>
          <a href="javascript:;" class="btn3 bg2"><span>下载</span></a>
        </div>
        <div class="sub">
          <router-link
            :to="'/discover/djradio/category?id=' + Radio.categoryId"
            >{{ List.categoryName }}</router-link
          >
          <span class="strong"
            >{{ Radio.name }} 第<span>{{ Radio.programCount }}</span
            >期</span
          >
          <span class="hui">{{ Time(Radio.lastProgramCreateTime) }} 创建 </span>
          <span class="hui">播放：<span class="color">7898</span>次</span>
        </div>
        <p>介绍:<span v-html="List.description"></span></p>
      </div>
      <div class="n-songtb">
        <div class="n_title">
          <span class="strong">节目包含歌曲列表</span>
          <span class="hui">（{{SongList.length}}首歌）</span>
        </div>
        <div class="n_list">
          <table class="R_list" v-if="SongList.length">
            <tr
              v-for="(item, index) of SongList"
              :key="index"
              :class="index % 2 != 0 ? '' : 'even'"
            >
              <td width="54" style="width: 54px">
                <div class="hd">
                  <span class="num">{{ index + 1 }}</span>
                  <span
                    :class="['ply', item.id == state.ids ? 'ccolor' : '']"
                    @click="Played(index)"
                  ></span>
                </div>
              </td>
              <td width="258" style="width: 258px">
                <div class="f_cb">
                  <span class="txt">
                    <router-link :to="'/song?id=' + item.id">{{
                      item.name
                    }}</router-link>
                    <router-link
                      class="mv"
                      v-if="item.mv"
                      :to="'/mv?id=' + item.mv"
                    ></router-link>
                  </span>
                </div>
              </td>
              <td width="89" style="width: 89px">
                <span class="t">{{ Times(item.duration) }}</span>
                <div class="opt">
                  <a href="javascript:;" class="a"></a>
                  <a href="javascript:;" class="s"></a>
                  <a href="javascript:;" class="f"></a>
                  <a href="javascript:;" class="x"></a>
                </div>
              </td>
              <td width="90" style="width: 90px">
                <router-link
                  :to="'/artist?id=' + item.artists[0].id"
                  class="al"
                  >{{ item.artists[0].name }}</router-link
                >
              </td>
              <td width="89" style="width: 90px">
                <router-link :to="'/album?id=' + item.album.id" class="al1">{{
                  item.album.name
                }}</router-link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="dj_r"></div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { Time } from "../../../untils/TimeTrans";
import { Times } from "../../../untils/TimeTran";
import { useStore } from "vuex";
export default {
  setup() {
    const { state,commit,dispatch } = useStore();
    const {
      query: { id: id },
    } = useRoute();
    const PGM = reactive({
      List: [],
      Radio: [],
      mainSong: [],
      dj: [],
      SongList: [],
      async getList(id) {
        await axios.get("/api/dj/program/detail?id=" + id).then((res) => {
          this.List = res.program;
          this.Radio = res.program.radio;
          this.mainSong = res.program.mainSong;
          this.dj = res.program.dj;
          this.SongList = res.program.songs;
        });
      },
    });
    PGM.getList(id);
    const nHbr = (text) => {
      console.log(text);
      const space = /\n/g;
      return text.replace(space, "<br>");
    };
    const ao = document.querySelector('audio')
    const Played = async (index) => {
      state.ids = PGM.SongList[index].id;
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
    const Play = async () => {
      state.songList = PGM.SongList;
      state.songListIndex = 0;
      state.ids = PGM.SongList[state.songListIndex].id;
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
      ...toRefs(PGM),
      Time,
      nHbr,
      Times,
      state,
      Played,Play
    };
  },
};
</script>

<style lang="less" scoped>
.dj_pro {
  width: 982px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .dj_l {
    width: 709px;
    border-right: 1px solid #d3d3d3;
    padding: 47px 30px 40px 39px;
    .dj_title {
      width: 640px;
      height: 148px;
      .djj_img {
        padding: 3px;
        border: 1px solid #d5d5d5;
        float: left;
        position: relative;
        display: block;
        margin: 0 -220px 0 0;
        width: 148px;
        height: 148px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cnt {
        float: right;
        width: 100%;
        .cntc {
          margin-left: 170px;
          padding-top: 18px;
          margin-bottom: 29px;
          display: flex;
          i {
            display: block;
            width: 73px;
            height: 24px;
            background: url("../../../../public/static/icon2.png") no-repeat;
            background-position: 0 -75px;
          }
          h2 {
            display: block;
            padding-left: 7px;
            padding-top: 1px;
            max-width: 390px;
            line-height: 24px;
            font-size: 20px;
            font-weight: normal;
            margin: 0;
          }
        }
        .rdiname {
          float: right;
          width: 470px;
          position: relative;
          .vlogo {
            float: left;
            display: block;
            margin-right: 7px;
            margin-top: 5px;
            width: 16px;
            height: 17px;
            background: url("../../../../public/static/icon2.png") no-repeat;
            background-position: -50px -20px;
            overflow: hidden;
          }
          .vname {
            float: left;
            display: block;
            color: #666;
            font-size: 16px;
            line-height: 30px;
          }
          .vname:hover {
            text-decoration: underline;
          }
          .f_flag {
            float: left;
            display: block;
            margin-left: 17px;
            height: 28px;
            overflow: hidden;
            line-height: 29px;
            color: #333;
            padding: 0 5px 0 0;
            white-space: nowrap;
            min-width: 23px;
            background: url("../../../../public/static/button2.png") no-repeat;
            background-position: right -2400px;
            span {
              display: inline-block;
              height: 28px;
              min-width: 23px;
              overflow: hidden;
              line-height: 29px;
              padding: 0 10px;
              background: url("../../../../public/static/button2.png") no-repeat;
              background-position: 0 -2370px;
              em {
                display: inline-block;
                width: 14px;
                height: 14px;
                vertical-align: middle;
                background: url("../../../../public/static/icon2.png") no-repeat;
                background-position: -50px 0;
                margin: 0px 4px 0 0;
              }
            }
          }
        }
      }
    }
    .dj_play {
      margin-top: 20px;
      .dj_btn {
        margin-bottom: 25px;
        margin-right: -10px;
        width: 420px;
        height: 31px;
        margin: 0 10px 25px 0;
        .btn1 {
          float: left;
          display: block;
          padding-left: 5px;
          height: 31px;
          line-height: 31px;
          background: url("../../../../public/static/button2.png") no-repeat;
          background-position: 0 -387px;
          margin-right: 10px;
          span {
            font-family: Arial, Helvetica, sans-serif;
            color: #fff;
            text-align: center;
            display: flex;
            justify-content: center;
            padding-right: 5px;
            background: url("../../../../public/static/button2.png") no-repeat;
            background-position: right -676px;
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
          span {
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
        .bg1 span {
          background-position: 0 -1225px;
        }
        .bg1:hover span {
          background-position: 0 -1268px;
        }
        .bg2 span {
          background-position: 0 -2761px;
          position: relative;
          i {
            position: absolute;
            left: 8px;
            top: 0;
            display: block;
            width: 17px;
            height: 15px;
            margin: 8px 6px 0 0;
            background: #fff url("../../../../public/static/button2.png")
              no-repeat;
            background-position: 0 -95px;
          }
        }
        .bg2:hover span {
          background-position: 0 -2805px;
        }
        .bg3 span {
          background-position: 0 -1465px;
        }
        .bg3:hover span {
          background-position: 0 -1508px;
        }
      }
      .sub {
        height: 35px;
        line-height: 35px;
        a {
          display: inline-block;
          height: 16px;
          overflow: hidden;
          padding: 0 6px;
          border: 1px solid #999;
          line-height: 16px;
          color: #999;
          vertical-align: middle;
          font-size: 12px;
          margin: -3px 9px 0 0;
          color: #cc0000;
          border-color: #cc0000;
        }
        a:hover {
          background-color: rgba(238, 174, 174, 0.2);
        }
        .strong {
          display: inline-block;
          padding-bottom: 2px;
          max-width: 42%;
          margin-right: 5px;
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          font-size: 14px;
          font-weight: bold;
        }
        .hui {
          margin-left: 18px;
          color: #999;
          .color {
            color: #c20c0c;
            font-weight: bold;
          }
        }
      }
      p {
        line-height: 23px;
        color: #666;
        padding: 0;
        margin: 0;
        max-height: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .n-songtb {
      margin-top: 27px;
      .n_title {
        height: 32px;
        padding: 0 10px;
        margin-bottom: -1px;
        overflow: hidden;
        background: #f7f7f7;
        border: 1px solid #d9d9d9;
        line-height: 33px;
        .strong {
          font-weight: bold;
        }
        .hui {
          color: #666;
        }
      }
      .n_list {
        border: 1px solid #d9d9d9;
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
              margin: 0;
              .hd {
                width: 54px;
                padding: 0px;
                margin: 0px;
                .ply {
                  float: right;
                  display: block;
                  width: 17px;
                  height: 17px;
                  cursor: pointer;
                  background: url("../../../../public/static/table.png")
                    no-repeat;
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
                .ccolor {
                  background-position: -20px -128px;
                }
              }
              .f_cb {
                width: 218px;
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
                    background: url("../../../../public/static/table.png")
                      no-repeat;
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
                  background: url("../../../../public/static/table.png")
                    no-repeat;
                }
                .a {
                  width: 13px;
                  height: 13px;
                  background: url("../../../../public/static/icon.png")
                    no-repeat;
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
                width: 48px;
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .al1 {
                float: left;
                display: block;
                width: 107px;
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .al:hover {
                text-decoration: underline;
              }
              .al1:hover {
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
    }
  }
  .dj_r {
    width: 270px;
  }
}
</style>