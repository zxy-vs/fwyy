<template>
  <div class="playList">
    <div class="PL_header">
      <h3>
        <span class="PL_lei">{{ cat }}</span>
        <a href="javascript:;" ref="select">选择分类<i></i><span></span> </a>
      </h3>
      <div class="h_r">
        <router-link to="/discover/playlist">热门</router-link>
      </div>
    </div>
    <div class="PL_hList" v-show="isHead" ref="HList">
      <div class="hd">
        <i></i>
      </div>
      <div class="bd">
        <div class="title">
          <router-link to="/discover/playlist?order=hot" @click="title = '全部'"
            >全部风格</router-link
          >
        </div>
        <dl v-for="(item, index) of Hlist" :key="index">
          <dt>
            <i :class="classs[index]"></i><span>{{ item }}</span>
          </dt>
          <dd>
            <template v-for="(items, indexs) of HHlist[index]" :key="indexs">
              <router-link
                :to="`/discover/playlist/?cat=${items}&order=hot`"
                @click="title = items"
                >{{ items }}</router-link
              >
              <span class="line">|</span>
            </template>
          </dd>
        </dl>
      </div>
      <div class="ft"></div>
    </div>
    <ul v-if="list.length" class="PL_list">
      <li v-for="(item, index) of list" :key="index">
        <global-com-list :list="item" />
      </li>
    </ul>
    <div class="PL_pag">
      <a-pagination v-model:current="current" :total="total" />
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute} from 'vue-router';
import { api } from '../../untils/baseProxy';
export default {
  setup() {
    const Route = useRoute()
    const PL = reactive({
      list: [],
      Hlist: [],
      HHlist: [],
      cat:'',
      total:0,
      async getList(order='hot', cat='全部', offset=0) {
        await axios
          .get(
            `${api}/top/playlist?order=${order}&cat=${cat}&limit=35&offset=${
              offset * 35
            }`
          )
          .then((res) => {
            this.cat = cat
            this.list = res.playlists;
            this.total = Math.ceil(res.total/35)*10
          });
      },
      async getHead() {
        await axios.get(api+"/playlist/catlist").then((res) => {
          this.Hlist = res.categories;
          let o = [];
          let I = [];
          let II = [];
          let III = [];
          let IIII = [];
          for (let item of res.sub) {
            if (item.category == 0) {
              o.push(item.name);
            } else if (item.category == 1) {
              I.push(item.name);
            } else if (item.category == 2) {
              II.push(item.name);
            } else if (item.category == 3) {
              III.push(item.name);
            } else {
              IIII.push(item.name);
            }
          }
          this.HHlist.push(o);
          this.HHlist.push(I);
          this.HHlist.push(II);
          this.HHlist.push(III);
          this.HHlist.push(IIII);
        });
      },
    });
    PL.getHead();
    const classs = ["", "first", "two", "tree", "four"];
    const current = ref(1);
    const isHead = ref(false);
    const select = ref(null);
    const HList = ref(null);
    onMounted(() => {
      select.value.onclick = function (e) {
        e.stopPropagation();
        isHead.value = !isHead.value;
        HList.value.onmouseover = function () {
            isHead.value = true;
            document.documentElement.onclick=null
        };
        HList.value.onmouseleave = function () {
          document.documentElement.onclick = function () {
            isHead.value = false;
            document.documentElement.onclick=null
          };
        };
        document.documentElement.onclick = function () {
            isHead.value = false;
          };
      };
    });
    watchEffect(() => {
      PL.getList(Route.query.order,Route.query.cat,current.value-1);
    });
    return {
      ...toRefs(PL),
      current,
      classs,
      isHead,
      select,
      HList,
    };
  },
};
</script>

<style lang="less" scoped>
.playList {
  width: 982px;
  padding: 40px;
  margin: auto;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  background-color: #fff;
  position: relative;
  .PL_header {
    width: 100%;
    height: 42px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      float: left;
      .PL_lei {
        float: left;
        font-size: 24px;
        line-height: 31px;
      }
      a {
        float: left;
        display: block;
        margin: 2px 0 0 12px;
        width: 91px;
        height: 31px;
        font-size: 12px;
        line-height: 31px;
        text-align: center;
        color: #0c73c2;
        background: url("../../../public/static/button2.png") no-repeat;
        background-position: 0 -59px;
        position: relative;
        i {
          display: inline-block;
          width: 8px;
          height: 5px;
          margin-left: 5px;
          vertical-align: middle;
          background: url("../../../public/static/icon.png") no-repeat;
          background-position: -70px -543px;
        }
        span {
          display: block;
          width: 5px;
          height: 31px;
          position: absolute;
          top: 0;
          right: 0;
          background: url("../../../public/static/button2.png") no-repeat;
          background-position: right -100px;
        }
      }
      a:hover {
        background-position-y: -141px;
        span {
          background-position-y: -182px;
        }
      }
    }
    .h_r {
      float: right;
      a {
        border-radius: 3px;
        display: inline-block;
        color: #fff;
        width: 46px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        background: url("../../../public/static/button.png") no-repeat;
        background-position: 0 0;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
  .PL_hList {
    position: absolute;
    top: 75px;
    left: 0;
    z-index: 5;
    width: 720px;
    .hd {
      width: 100%;
      height: 32px;
      background: url("../../../public/static/sltlyr.png") no-repeat;
      i {
        position: absolute;
        top: 2px;
        left: 132px;
        display: block;
        width: 24px;
        height: 11px;
        background: url("../../../public/static/iconall.png") no-repeat;
        background-position: -48px 0;
        // vertical-align: middle;
      }
    }
    .bd {
      width: 100%;
      padding: 0 10px;
      background: url("../../../public/static/sltlyr.png") no-repeat;
      background-position: -720px 0;
      background-repeat: repeat-y;
      .title {
        width: 700px;
        height: 37px;
        padding-left: 26px;
        border-bottom: 1px solid #e6e6e6;
        font-weight: normal;
        a {
          display: block;
          width: 75px;
          height: 26px;
          background: url("../../../public/static/button.png") no-repeat;
          background-position: 0 -64px;
          text-align: center;
          line-height: 26px;
          color: #333;
        }
        a:hover {
          text-decoration: underline;
        }
      }
      dl {
        margin: 0;
        height: 100%;
        dt {
          float: left;
          display: inline;
          width: 70px;
          margin: 0 -100px 0 26px;
          padding-top: 15px;
          font-weight: bold;
          position: relative;
          span {
            position: absolute;
            top: 40%;
            right: 15px;
          }
          i {
            display: inline-block;
            margin-right: 8px;
            margin-bottom: 4px;
            width: 23px;
            height: 23px;
            background: url("../../../public/static/icon.png") no-repeat;
            background-position: -20px -735px;
          }
          .first {
            background-position: 0 -60px;
          }
          .two {
            background-position: 0 -88px;
          }
          .tree {
            background-position: 0 -117px;
          }
          .four {
            background-position: 0 -141px;
          }
        }
        dd {
          margin: 0;
          margin-left: 96px;
          padding: 16px 15px 0 15px;
          border-left: 1px solid #e6e6e6;
          line-height: 24px;
          a {
            color: #333;
            white-space: nowrap;
          }
          a:hover {
            text-decoration: underline;
          }
          .line {
            margin: 0 8px 0 10px;
            color: #d8d8d8;
            line-height: 24px;
          }
        }
      }
    }
    .ft {
      height: 20px;
      background: url("../../../public/static/sltlyr.png") no-repeat;
      background-position: -1440px -12px;
    }
  }
  .PL_list {
    width: 950px;
    height: 100%;
    margin: 30px 0 0 -50px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 140px;
      height: 188px;
      overflow: hidden;
      margin: 0 0 30px 50px;
      line-height: 1.4;
    }
  }
  .PL_pag {
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>