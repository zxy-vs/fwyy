<template>
  <div class="djradio">
    <div
      class="dj_logo"
      v-if="
        Route.path == '/discover/djradio' ||
        Route.path == '/discover/djradio/category'
      "
    >
      <ul class="dj_banner" v-show="isShow">
        <li v-for="(item, index) of logoList" :key="index">
          <router-link
            :class="Route.query.id == item.id ? 'select' : ''"
            :to="'/discover/djradio/category?id=' + item.id"
          >
            <div
              class="icon"
              :style="`background:url(${item.picWebUrl}) no-repeat ${
                Route.query.id == item.id ? '-48px' : '0'
              } 0;`"
            ></div>
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
      <ul class="dj_banner" v-if="!isShow">
        <li>
          <a href="https://music.163.com/#/topic?id=18652232" target="_blank">
            <div class="icon i"></div>
            <span>常见问题</span>
          </a>
        </li>
        <li>
          <a href="https://music.163.com/st/radioweb/apply#/" target="_blank">
            <div class="icon ii"></div>
            <span style="color: #5ab5e7">我要做主播</span>
          </a>
        </li>
      </ul>
      <span class="dj_bttn dj_l" @click="isShow = !isShow"></span>
      <span class="dj_bttn dj_r" @click="isShow = !isShow"></span>
      <div class="dj_ol">
        <span :class="isShow ? 'z_curr' : ''"></span>
        <span :class="!isShow ? 'z_curr' : ''"></span>
      </div>
    </div>
    <router-view></router-view>
    <div class="dj_show" v-if="Route.path == '/discover/djradio'">
      <div class="s_list">
        <div class="blk s_l">
          <div class="s_title">
            <h3>
              <router-link to="/discover/djradio/recommend"
                >推荐节目</router-link
              >
            </h3>
            <router-link to="/discover/djradio/recommend" class="more"
              >更多 ></router-link
            >
          </div>
          <ul class="s_plist">
            <li v-for="(item, index) of SList" :key="index">
              <a href="javascript:;" class="s_img">
                <img :src="`${item.coverUrl}?param=40x40`" alt="" />
                <i></i>
              </a>
              <div class="s_txt">
                <router-link
                  :to="'/program?id=' + item.id"
                  :title="item.name"
                  >{{ item.name }}</router-link
                >
                <router-link
                  :to="'/djradio?id=' + item.radio.id"
                  class="hui"
                  :title="item.dj.brand"
                  >{{ item.dj.brand }}</router-link
                >
              </div>
              <router-link
                :to="'/discover/djradio/category?id=' + item.categoryId"
                class="tag"
                >{{ item.radio.category }}</router-link
              >
            </li>
          </ul>
        </div>
        <div class="blk s_r">
          <div class="s_title">
            <h3>
              <router-link to="/discover/djradio/rank">节目排行榜</router-link>
            </h3>
            <router-link to="/discover/djradio/rank" class="more"
              >更多 ></router-link
            >
          </div>
          <ul class="s_plist">
            <li v-for="(item, index) of PList" :key="index">
              <div class="rank">
                <span class="red">{{ index + 1 }}</span>
                <span
                  :class="[
                    item.lastRank - item.rank > 0 ? 'top' : '',
                    item.lastRank - item.rank < 0 && item.lastRank != -1
                      ? 'bottom'
                      : '',
                    item.lastRank == -1 ? 'new' : '',
                  ]"
                >
                  <i></i
                  ><span class="urnk">{{
                    abs(item.lastRank - index - 1)
                  }}</span></span
                >
              </div>
              <a href="javascript:;" class="s_img two">
                <img :src="`${item.program.coverUrl}?param=40x40`" alt="" />
                <i></i>
              </a>
              <div class="s_txt tw">
                <router-link
                  :to="'/program?id=' + item.program.id"
                  :title="item.program.name"
                  >{{ item.program.name }}</router-link
                >
                <router-link
                  :to="'/djradio?id=' + item.program.radio.id"
                  class="hui"
                  :title="item.program.dj.brand"
                  >{{ item.program.dj.brand }}</router-link
                >
              </div>
              <span class="pgm">
                <i style="width: 100%">
                  <i></i>
                </i>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="s_dj" v-for="(item, index) of ShowList" :key="index">
        <global-com-dj :data="item" />
        <ul class="rdilist">
          <li v-for="(items, indexs) of Flist[index]" :key="indexs">
            <global-com-dj-t :data="items" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import GlobalComDjT from "../../GlobalCom/GlobalComDjT.vue";
import GlobalComDj from "../../GlobalCom/GlobalComDj.vue";
import { api } from '../../untils/baseProxy';
export default {
  components: { GlobalComDjT, GlobalComDj },
  setup() {
    const Route = useRoute();
    const Flist = reactive([[], [], [], [], []]);
    const logo = reactive({
      logoList: [],
      SList: [],
      PList: [],
      isShow: true,
      async getLogo() {
        await axios.get(api+"/dj/catelist").then((res) => {
          this.logoList = res.categories;
        });
      },
      async getSlist() {
        await axios.get(api+"/program/recommend").then((res) => {
          this.SList = res.programs;
        });
      },
      async getPlist() {
        await axios.get(api+"/dj/program/toplist?limit=10").then((res) => {
          this.PList = res.toplist;
        });
      },
      async getFList1() {
        await axios.get(api+"/dj/recommend/type?type=2").then((res) => {
          Flist[0] = res.djRadios;
          Flist[0].length = 4;
        });
      },
      async getFList2() {
        await axios.get(api+"/dj/recommend/type?type=6").then((res) => {
          Flist[1] = res.djRadios;
          Flist[1].length = 4;
        });
      },
      async getFList3() {
        await axios.get(api+"/dj/recommend/type?type=3").then((res) => {
          Flist[2] = res.djRadios;
          Flist[2].length = 4;
        });
      },
      async getFList4() {
        await axios.get(api+"/dj/recommend/type?type=2001").then((res) => {
          Flist[3] = res.djRadios;
          Flist[3].length = 4;
        });
      },
      async getFList5() {
        await axios.get(api+"/dj/recommend/type?type=11").then((res) => {
          Flist[4] = res.djRadios;
          Flist[4].length = 4;
        });
      },
    });
    logo.getLogo();
    logo.getSlist();
    logo.getPlist();
    logo.getFList1();
    logo.getFList2();
    logo.getFList3();
    logo.getFList4();
    logo.getFList5();
    const abs = (num) => {
      return Math.abs(num);
    };
    const ShowList = ref([
      { name: "音乐推荐", url: "/discover/djradio/category?id=2" },
      { name: "生活", url: "/discover/djradio/category?id=6" },
      { name: "情感", url: "/discover/djradio/category?id=3" },
      { name: "创作翻唱", url: "/discover/djradio/category?id=2001" },
      { name: "知识", url: "/discover/djradio/category?id=11" },
    ]);
    return {
      ...toRefs(logo),
      Route,
      abs,
      ShowList,
      Flist,
    };
  },
};
</script>

<style lang="less" scoped>
.djradio {
  width: 982px;
  padding: 40px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .dj_logo {
    width: 100%;
    height: 194px;
    margin-bottom: 20px;
    position: relative;
    .dj_banner {
      width: 933px;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-left: -33px;
      li {
        margin: 0 0 25px 33px;
        a {
          display: block;
          width: 70px;
          height: 70px;
          text-align: center;
          color: #888;
          .icon {
            width: 48px;
            height: 48px;
            margin: 2px auto 0;
          }
          .i {
            background: url("../../../public/static/radio_faq.png") no-repeat;
          }
          .ii {
            background: url("../../../public/static/radio_apply.png") no-repeat;
          }
          span {
            margin-top: -3px;
          }
        }
        a:hover {
          background: url("../../../public/static/radio_bg.png") no-repeat;
          background-position: 0 0;
        }
        .select {
          background: url("../../../public/static/radio_bg.png") no-repeat;
          background-position: -70px 0;
          .icon {
            background-position: -48px 0;
          }
          span {
            color: #d35757;
          }
        }
        .select:hover {
          background-position: -70px 0;
        }
      }
    }
    .dj_bttn {
      position: absolute;
      top: 50%;
      width: 20px;
      height: 30px;
      margin-top: -15px;
      opacity: 0.25;
      text-indent: -9999px;
      cursor: pointer;
      background: url("../../../public/static/radio_slide.png") no-repeat;
    }
    .dj_bttn:hover {
      opacity: 0.4;
    }
    .dj_l {
      left: -26px;
      background-position: 0 -30px;
    }
    .dj_r {
      right: -26px;
      background-position: -30px -30px;
    }
    .dj_ol {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0px;
      width: 100%;
      height: 20px;
      text-align: center;
      line-height: 0;
      span {
        display: inline-block;
        width: 20px;
        height: 20px;
        cursor: pointer;
        background: url("../../../public/static/radio_slide.png") no-repeat 0 0;
      }
      span:hover {
        background-position: -30px 0;
      }
      .z_curr {
        background-position: -30px 0;
      }
    }
  }
  .dj_show {
    width: 100%;
    height: 100%;
    .s_list {
      margin-top: 10px;
      width: 100%;
      height: 643px;
      .blk {
        width: 426px;
        .s_title {
          height: 40px;
          border-bottom: 2px solid #c20c0c;
          h3 {
            float: left;
            font-size: 24px;
            line-height: 28px;
            font-weight: normal;
            a {
              font-size: 24px;
              font-weight: normal;
              font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
              color: #333;
            }
            a:hover {
              text-decoration: underline;
            }
          }
          .more {
            float: right;
            margin-top: 14px;
            color: #666;
          }
          .more:hover {
            text-decoration: underline;
          }
        }
      }
      .s_plist {
        height: 600px;
        border: 1px solid #e2e2e2;
        border-top: none;
        margin: 0;
        li {
          width: 424px;
          height: 60px;
          padding: 10px 0;
          line-height: 40px;
          .rank {
            float: left;
            width: 47px;
            margin: 6px 0 0 0;
            text-align: center;
            line-height: normal;
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
            .red {
              font-size: 14px;
              color: #da4545;
            }
          }
          .s_img {
            display: block;
            float: left;
            width: 40px;
            height: 40px;
            margin-left: 20px;
            position: relative;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
            i {
              position: absolute;
              display: none;
              width: 22px;
              height: 22px;
              top: 50%;
              left: 50%;
              overflow: hidden;
              margin: -11px 0 0 -11px;
              background: url("../../../public/static/iconall.png") no-repeat;
              background-position: 0 -85px;
            }
          }
          .two {
            margin: 0;
          }
          .s_img:hover {
            i {
              display: block;
            }
          }
          .s_txt {
            float: left;
            width: 254px;
            margin: 1px 0 0 10px;
            line-height: 20px;
            a {
              width: 254px;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
              line-height: 20px;
              color: #333;
            }
            a:hover {
              text-decoration: underline;
            }
            .hui {
              color: #999;
            }
          }
          .tw {
            width: 208px;
            a {
              width: 208px;
            }
          }
          .tag {
            display: inline-block;
            position: relative;
            top: -1px;
            height: 18px;
            overflow: hidden;
            padding: 0 6px;
            border: 1px solid #999;
            line-height: 16px;
            color: #999;
            vertical-align: middle;
            font-size: 12px;
            margin: 1px 0 0 10px;
          }
          .tag:hover {
            border: 1px solid #333;
            color: #333;
          }
          .pgm {
            float: left;
            display: block;
            height: 8px;
            margin-top: 16px;
            position: relative;
            width: 100px;
            background: url("../../../public/static/table.png") no-repeat;
            background-position: 0 -240px;
            line-height: normal;
            i {
              display: block;
              height: 8px;
              overflow: hidden;
              padding: 0 4px;
              background: url("../../../public/static/table.png") no-repeat;
              background-position: right -318px;
              i {
                display: block;
                height: 8px;
                overflow: hidden;
                margin-left: -4px;
                padding: 0 0 0 4px;
                background: url("../../../public/static/table.png") no-repeat;
                background-position: 0 -304px;
              }
            }
          }
        }
        li:nth-of-type(even) {
          background-color: #f7f7f7;
        }
        li:hover {
          background-color: #eee;
        }
      }
      .s_l {
        float: left;
      }
      .s_r {
        float: right;
      }
    }
    .s_dj {
      margin-top: 35px;
      .rdilist {
        margin-left: -30px;
        width: 930px;
        height: 322px;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 435px;
          height: 160px;
          margin-left: 30px;
          padding: 20px 0;
          border-bottom: 1px solid #e7e7e7;
        }
      }
    }
  }
}
</style>