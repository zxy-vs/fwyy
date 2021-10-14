<template>
  <div class="mytop"></div>
  <div class="Home">
    <div class="h_head">
      <div class="h_img">
        <img :src="`${profile.avatarUrl}?param=180y180`" alt="" />
      </div>
      <div class="h_txt">
        <div class="h_name">
          <div class="h_name_c">
            <div class="edit" v-if="profile.artistId">
              <router-link :to="'/artist?id=' + profile.artistId">
                <span>查看歌手页</span>
              </router-link>
            </div>
            <h2>
              <span class="tit">{{ profile.nickname }}</span>
              <span class="vip"></span>
              <span class="lv"
                >{{ list.level }}
                <i></i>
              </span>
              <span :class="['m', profile.gender == 2 ? 'w' : '']"></span>
            </h2>
            <div class="btn">
              <a href="javascript:;" class="ftxt">
                <span>发私信</span>
              </a>
              <a href="javascript:;" class="gz"> 关 注 </a>
            </div>
          </div>
          <template v-for="(item, index) of allAuthTypes" :key="index">
            <p class="dj_p" v-if="item.type != 400">
              <i
                :class="[
                  item.type <= 10 ? 'vv' : '',
                  item.type > 10 ? 'dr' : '',
                ]"
              ></i>
              {{ item.desc }}
              <span v-for="(items, indexs) of item.tags" :key="indexs">{{
                items
              }}</span>
            </p>
          </template>
        </div>
        <ul class="data">
          <li class="fst">
            <strong>{{ profile.eventCount }}</strong>
            <span>动态</span>
          </li>
          <li>
            <strong>{{ profile.follows }}</strong>
            <span>关注</span>
          </li>

          <li>
            <strong>{{ profile.followeds }}</strong>
            <span>粉丝</span>
          </li>
        </ul>
        <div class="gj" v-if="profile.signature">
          个人介绍：{{ profile.signature }}
        </div>
        <!-- <div class="gj">
          <span>所在地区：广东省 - 深圳市&nbsp;</span>
          <span class="age">&nbsp;年龄：95后</span>
        </div> -->
      </div>
    </div>
    <audios>
      <div class="f_tit">
        <h3>{{ profile.nickname }}创建的电台</h3>
      </div>
    </audios>
    <div>
      <div class="f_tit">
        <h3>听歌排行</h3>
        <h4>累积听歌{{ list.listenSongs }}首</h4>
        <div class="navv">
          <span :class="Is == 1 ? 'weight' : ''" @click="Is = 1">所有时间</span>
          <i></i>
          <span :class="Is == 0 ? 'weight' : ''" @click="Is = 0">最近一周</span>
        </div>
      </div>
      <keep-alive>
        <component :is="IsShow[Is]"></component>
      </keep-alive>
    </div>
    <playlist>
      <template #="{ data }"
        ><div class="f_tit">
          <h3>
            {{ profile.nickname }}创建的歌单
            <span></span>
            （{{ data }}）
          </h3>
        </div>
      </template>
    </playlist>
    <shou-playlist>
      <template #="{ data }"
        ><div class="f_tit">
          <h3>
            {{ profile.nickname }}收藏的歌单
            <span></span>
            （{{ data }}）
          </h3>
        </div>
      </template>
    </shou-playlist>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { watchEffect } from "@vue/runtime-core";
import playlist from "../components/Home/playlist.vue";
import ShouPlaylist from "../components/Home/shouPlaylist .vue";
import Audios from "../components/Home/audios.vue";
import rankWeek from "../components/Home/rankWeek.vue";
import RankAll from "../components/Home/rankAll.vue";
import {api} from '../untils/baseProxy'
export default {
  components: { playlist, ShouPlaylist, Audios, rankWeek, RankAll },
  setup() {
    const Route = useRoute();
    const Is = ref(0);
    const IsShow = ref(["rankWeek", "rankAll"]);
    const home = reactive({
      list: [],
      allAuthTypes: [],
      profile: [],
      async getList(id) {
        await axios.get(api+"/user/detail?uid=" + id).then((res) => {
          console.log(res);
          this.list = res;
          this.profile = res.profile;
          this.allAuthTypes = res.profile.allAuthTypes;
        });
      },
    });
    watchEffect(() => {
      if (Route.path == "/home") {
        home.getList(Route.query.id);
      }
    });
    return {
      ...toRefs(home),
      Is,
      IsShow,
    };
  },
};
</script>

<style lang="less" scoped>
.mytop {
  width: 100%;
  height: 5px;
  background-color: #c20c0c;
}
.Home {
  width: 982px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  padding: 40px;
  .h_head {
    margin-bottom: 43px;
    display: flex;
    .h_img {
      width: 188px;
      margin-right: 40px;
      position: relative;
      img {
        display: block;
        width: 188px;
        height: 188px;
        padding: 3px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }
    }
    .h_txt {
      width: 670px;
      .h_name {
        padding-bottom: 12px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;
        .h_name_c {
          .edit {
            float: right;
            margin-top: 4px;
            clear: both;
            a {
              display: inline-block;
              height: 31px;
              line-height: 31px;
              overflow: hidden;
              vertical-align: top;
              text-align: center;
              color: #333;
              padding: 0 5px 0 0;
              white-space: nowrap;
              background: url("../../public/static/button2.png") no-repeat;
              background-position: right -100px;
              span {
                display: inline-block;
                height: 31px;
                line-height: 31px;
                overflow: hidden;
                color: #333;
                background: url("../../public/static/button2.png") no-repeat;
                background-position: 0 -59px;
                vertical-align: top;
                text-align: center;
                padding: 0 15px 0 20px;
              }
            }
            a:hover {
              background-position-y: -182px;
              span {
                background-position-y: -141px;
              }
            }
          }
          h2 {
            margin: 0;
            padding-bottom: 3px;
            float: left;
            span {
              display: block;
              float: left;
            }
            .tit {
              max-width: 260px;
              margin-top: 3px;
              font-size: 22px;
              font-weight: normal;
              line-height: 30px;
              color: #000;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
            }
            .vip {
              width: 57px;
              height: 36px;
              background: url("../../public/static/vip5.png") no-repeat;
              background-size: 100% 20px;
              background-position: center;
              float: left;
              margin-left: 10px;
            }
            .lv {
              margin: 8px 0 0 10px;
              height: 19px;
              overflow: hidden;
              padding-left: 29px;
              line-height: 21px;
              color: #e03a24;
              font-size: 14px;
              font-weight: bold;
              font-style: italic;
              vertical-align: middle;
              background: url("../../public/static/icon2.png") no-repeat;
              background-position: -135px -190px;
              i {
                display: block;
                overflow: hidden;
                float: right;
                width: 9px;
                height: 19px;
                background: url("../../public/static/icon2.png") no-repeat;
                background-position: -191px -190px;
              }
            }
            .m {
              display: block;
              margin: 9px 0 0 8px;
              width: 20px;
              height: 20px;
              background: url("../../public/static/icon.png") no-repeat;
              background-position: -41px -57px;
            }
            .w {
              background-position: -41px -27px;
            }
          }
          .btn {
            float: left;
            a {
              float: left;
              display: block;
              color: #333;
              margin: 4px 0 0 15px;
              background: url("../../public/static/button.png") no-repeat;
            }
            .ftxt {
              width: 75px;
              height: 31px;
              background-position: 0 -810px;
              span {
                display: inline-block;
                height: 29px;
                line-height: 29px;
                padding-left: 30px;
              }
            }
            .gz {
              width: 70px;
              height: 31px;
              padding-left: 30px;
              background-position: 0 -720px;
              color: #fff;
              line-height: 30px;
            }
            .ftxt:hover {
              background-position-y: -845px;
            }
            .gz:hover {
              background-position-x: -80px;
            }
          }
        }
        .h_name_c::after {
          clear: both;
          content: ".";
          display: block;
          height: 0;
          visibility: hidden;
        }
        .dj_p {
          width: 100%;
          margin: 0;
          margin-top: 8px;
          line-height: 20px;
          white-space: nowrap;
          color: #666;
          font-size: 14px;
          i {
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
            width: 68px;
            height: 20px;
            margin-right: 6px;
            background: url("../../public/static/icon2.png") no-repeat;
            background-position: -150px -480px;
          }
          .vv {
            background-position: 0 -480px;
          }
          .dr {
            background-position: -75px -480px;
          }
          span {
            display: inline-block;
            height: 18px;
            margin-left: 5px;
            padding: 0 2px;
            vertical-align: middle;
            color: rgba(0, 0, 0, 0.4);
            font-size: 12px;
            line-height: 16px;
            text-align: center;
            border: solid 1px rgba(0, 0, 0, 0.3);
            border-radius: 2px;
          }
        }
      }
      .data {
        height: 41px;
        margin-bottom: 15px;
        li {
          float: left;
          height: 40px;
          padding: 0 40px 0 20px;
          border-left: 1px solid #ddd;
          color: #666;
          strong {
            display: block;
            margin-top: -4px;
            font-size: 24px;
            line-height: 28px;
            height: 28px;
            font-weight: normal;
            cursor: pointer;
          }
          span {
            display: block;
            text-indent: 2px;
            cursor: pointer;
          }
        }
        .fst {
          padding-left: 0;
          border-left: none;
        }
      }
      .gj {
        margin-bottom: 5px;
        line-height: 21px;
        color: #666;
        .age {
          margin-left: 20px;
        }
      }
    }
  }
  .f_tit {
    height: 35px;
    padding-bottom: 2px;
    border-bottom: 2px solid #c20c0c;
    position: relative;
    h3 {
      float: left;
      position: relative;
      margin: 0;
      font-size: 20px;
      line-height: 28px;
      span {
        position: absolute;
        display: inline-block;
        width: 8px;
        height: 8px;
        top: 1px;
        background: url("../assets/img/black-r-icon@3x.png") no-repeat;
        background-size: cover;
      }
    }
    h4 {
      margin: 0;
      float: left;
      display: inline;
      margin-top: 5px;
      margin-left: 10px;
      line-height: 26px;
      font-weight: 400;
      color: #666;
    }
    .navv {
      position: absolute;
      z-index: 1;
      right: 0;
      bottom: 5px;
      span {
        float: right;
        margin-left: 8px;
        line-height: 26px;
        color: #666;
        cursor: pointer;
      }
      i {
        width: 1px;
        height: 12px;
        margin-top: 7px;
        background-color: #999;
        float: right;
        margin-left: 8px;
      }
      .weight {
        color: #333;
        font-weight: 700;
      }
    }
  }
}
</style>