<template>
  <div class="djs_List">
    <div class="djs_l">
      <div class="djs_tit">
        <div class="djs_img">
          <img :src="`${List.picUrl}?param=200y200`" alt="" />
          <span></span>
        </div>
        <div class="cnt">
          <div class="c_tit">
            <i></i>
            <h2>{{ List.name }}</h2>
          </div>
          <div class="user">
            <img :src="`${dj.avatarUrl}?param=35y35`" alt="" />
            <span>{{ dj.nickname }}</span>
          </div>
          <div class="btns">
            <a href="javascript:;" class="f_flag">
              <span>订阅({{ List.subCount }})</span>
            </a>
            <a href="javascript:;" class="f_flag1" @click="Play"
              ><span>播放全部</span></a
            >
            <a href="javascript:;" class="btn3 bg1">
              <span>分享({{ List.shareCount }})</span>
            </a>
          </div>
          <p>
            <router-link
              :to="'/discover/djradio/category?id=' + List.categoryId"
              >{{ List.category }}</router-link
            >
            {{ List.desc }}
          </p>
        </div>
      </div>
      <div class="n_songtb">
        <div class="n_tit">
          <h3>节目列表</h3>
          <span>共{{ count }}期</span>
        </div>
        <table class="n_list" v-if="songList.length">
          <tr
            v-for="(item, index) of songList"
            :key="index"
            :class="index % 2 != 0 ? '' : 'even'"
          >
            <td width="82" style="width: 82px">
              <div class="hd">
                <span class="num">{{songList.length-index}}</span>
                <span
                  :class="['ply', item.id == state.ids ? 'ccolor' : '']"
                ></span>
              </div>
            </td>
            <td width="240" style="width: 240px">
              <div class="f_cb">
                <span class="txt">
                  <router-link :to="'/program?id=' + item.id">{{
                    item.name
                  }}</router-link>
                </span>
                <div class="opt">
                  <a href="javascript:;" class="a"></a>
                  <a href="javascript:;" class="f"></a>
                  <a href="javascript:;" class="x"></a>
                </div>
              </div>
            </td>
            <td width="80" style="width: 80px">
              <span class="t">播放{{ item.listenerCount }}</span>
            </td>
            <td width="90" style="width: 90px">
              <span class="t">赞{{ item.likedCount }}</span>
            </td>
            <td width="86" style="width: 86px">
              <span class="t hui">{{ Time(item.createTime) }}</span>
            </td>
            <td width="60" style="width: 60px">
              <span class="t hui">{{ Times(item.duration) }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="dj_r"></div>
  </div>
</template>

<script>
import { Times } from "../../../untils/TimeTran";
import { Time } from "../../../untils/TimeTrans";
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { api } from '../../../untils/baseProxy';
export default {
  setup() {
    const {
      query: { id: id },
    } = useRoute();
    const { state,commit,dispatch } = useStore();
    const Djs = reactive({
      List: [],
      dj: [],
      songList: [],
      count: 0,
      async getList(id) {
        await axios.get(api+"/dj/detail?rid=" + id).then((res) => {
          this.List = res.data;
          this.dj = res.data.dj;
          document.title =this.List.name+' - 主播 - 电台 - 网易云音乐'

        });
      },
      async getSongList(id) {
        await axios.get(api+"/dj/program?limit=999&rid=" + id).then((res) => {
          this.songList = res.programs;
          this.count = res.count;
        });
      },
    });
    Djs.getList(id);
    Djs.getSongList(id);
    return {
      ...toRefs(Djs),
      state,
      Times,
      Time
    };
  },
};
</script>

<style lang="less" scoped>
.djs_List {
  width: 982px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .djs_l {
    width: 709px;
    border-right: 1px solid #d3d3d3;
    padding: 47px 30px 40px 39px;
    .djs_tit {
      width: 640px;
      min-height: 200px;
      .djs_img {
        float: left;
        width: 200px;
        height: 200px;
        margin: 0 -220px 0 0;
        position: relative;
        img {
          width: 200px;
          height: 200px;
        }
        span {
          display: block;
          position: absolute;
          width: 208px;
          height: 208px;
          background: url("../../../../public/static/coverall.png") no-repeat;
          background-position: 0 -1285px;
          top: -4px;
          left: -4px;
        }
      }
      .cnt {
        margin-left: 230px;
        .c_tit {
          margin: 0 0 12px;
          line-height: 24px;
          display: flex;
          i {
            float: left;
            display: block;
            width: 55px;
            height: 24px;
            background: url("../../../../public/static/icon.png") no-repeat;
            background-position: 0 -1014px;
          }
          h2 {
            float: left;
            width: 346px;
            line-height: 24px;
            font-size: 20px;
            font-weight: normal;
            margin: 0;
            margin-left: 9px;
            margin-top: 1px;
          }
        }
        .user {
          margin: 0 0 20px;
          height: 35px;
          line-height: 35px;
          img {
            float: left;
            width: 35px;
            height: 35px;
            margin-right: 10px;
          }
          span {
            float: left;
            display: block;
            height: 35px;
            line-height: 35px;
            color: #0c73c2;
            padding-right: 2px;
          }
        }
        .btns {
          margin-bottom: 25px;
          margin-right: -10px;
          height: 31px;
          .f_flag {
            float: left;
            display: block;
            margin-right: 5px;
            height: 31px;
            overflow: hidden;
            line-height: 31px;
            color: #fff;
            padding: 0 5px 0 0;
            white-space: nowrap;
            min-width: 23px;
            background: url("../../../../public/static/button2.png") no-repeat;
            background-position: right -2163px;
            span {
              display: inline-block;
              height: 31px;
              min-width: 23px;
              overflow: hidden;
              line-height: 31px;
              padding: 0 7px 0 30px;
              background: url("../../../../public/static/button2.png") no-repeat;
              background-position: 0 -2125px;
            }
          }
          .f_flag1 {
            float: left;
            display: block;
            margin-right: 5px;
            height: 31px;
            overflow: hidden;
            line-height: 31px;
            color: #333;
            padding: 0 5px 0 0;
            white-space: nowrap;
            min-width: 23px;
            background: url("../../../../public/static/button2.png") no-repeat;
            background-position: right -2325px;
            span {
              display: inline-block;
              height: 31px;
              min-width: 23px;
              overflow: hidden;
              line-height: 31px;
              padding: 0 7px 0 30px;
              background: url("../../../../public/static/button2.png") no-repeat;

              background-position: 0 -2285px;
            }
          }
          .f_flag1:hover {
            background-position-y: -2720px;
            span {
              background-position: 0 -2680px;
            }
          }
          .f_flag:hover {
            background-position-y: -2558px;
            span {
              background-position: 0 -2516px;
            }
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
        }
        p {
          margin-top: 4px;
          line-height: 18px;
          color: #666;
          margin: 0;
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
        }
      }
    }
    .n_songtb {
      width: 640px;
      margin-top: 27px;
      .n_tit {
        height: 35px;
        border-bottom: 2px solid #c20c0c;
        h3 {
          float: left;
          font-size: 20px;
          line-height: 30px;
          margin: 0;
        }
        span {
          float: left;
          color: #999;
          margin: 9px 0 0 20px;
        }
      }
      .n_list {
        width: 100%;
        border: none;
        border-collapse: collapse;
        border-spacing: 0;
        border: 1px solid #d9d9d9;
        border-width: 0 1px 1px 1px;
        tr {
          background-color: #f7f7f7;
          td {
            height: 55px;
            position: relative;
            margin: 0;
            .hd {
              height: 18px;
              padding: 0px;
              margin: 0 10px;
              .ply {
                margin: auto;
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
                margin-left: 10px;
                color: #999;
              }
              .ccolor {
                background-position: -20px -128px;
              }
            }
            .f_cb {
              width: 230px;
              height: 18px;
              margin-right: 10px;
              .txt {
                position: relative;
                display: inline-block;
                line-height: 18px;
                max-width: 100%;
                border: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                a {
                  color: #333;
                  height: 55px;
                }
                a:hover {
                  text-decoration: underline;
                }
              }
            }
            .opt {
              display: none;
              position: absolute;
              right: 0;
              bottom: 18px;
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
              .f {
                background-position: 0 -195px;
              }
              .x {
                background-position: -81px -174px;
              }
            }
            .t {
              margin: 0 10px;
              color: #666;
            }
            .hui {
              color: #999;
            }
          }
        }
        tr:hover {
          background-color: #e6e6e6;
          td {
            .f_cb {
              width: 190px;
            }
            .opt {
              display: block;
              .a:hover {
                background-position-x: -22px;
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
  .djs_r {
    width: 270px;
  }
}
</style>