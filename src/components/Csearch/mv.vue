<template>
  <ul class="mv">
    <li v-for="(item, index) of lists" :key="index">
      <div class="mv_img">
        <img :src="`${item.coverUrl}?param=159y90`" alt="" />
        <p class="head"><span></span>{{ NumberW(item.playTime) }}</p>
        <p class="foot">{{ Times(item.durationms) }}</p>
        <router-link :to="'/video?id='+item.vid" class="link"></router-link>
      </div>
      <h4>
        <i v-if="item.type==0"></i>
        <router-link :to="'/video?id='+item.vid"
          >{{item.title}}</router-link
        >
      </h4>
      <h5>by <router-link :to="'/home?id='+item.creator[0].userId" class="hui">{{item.creator[0].userName}}</router-link></h5>
    </li>
  </ul>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { Times } from "../../untils/TimeTran";
import { NumberW } from "../../untils/NumberW.js";
import { api } from '../../untils/baseProxy';
export default {
  setup() {
    const Route = useRoute();
    const list = reactive({
      lists: [],
      async getnavList(key, type = 1) {
        await axios
          .get(`${api}/cloudsearch?keywords=${key}&type=${type}&limit=20`)
          .then((res) => {
            this.lists = res.result.videos;
          });
      },
    });
    watchEffect(() => {
      list.getnavList(Route.query.key, Route.query.type);
    });
    return {
      ...toRefs(list),
      Times,
      NumberW,
    };
  },
};
</script>

<style lang="less" scoped>
.mv {
  margin-left: -26px;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 185px;
    padding: 0 0 40px 26px;
    line-height: 1.5;
    overflow: hidden;
    .mv_img {
      width: 159px;
      height: 90px;
      position: relative;
      img {
        width: 100%;
        height: 90px;
        border: 0;
      }
      .head {
        position: absolute;
        top: 0;
        right: 0;
        padding-right: 5px;
        width: 90px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        box-sizing: border-box;
        text-align: right;
        text-shadow: -2px 1px rgb(0 0 0 / 40%);
        background: url("../../../public/static/mask.png") no-repeat;
        background-position: 0 0;
        margin: 0;
        span {
          display: inline-block;
          margin: -2px 2px 0 0;
          width: 15px;
          height: 10px;
          background: url("../../../public/static/icon2.png") no-repeat;
          background-position: -60px -310px;
          overflow: hidden;
          vertical-align: middle;
        }
      }
      .foot {
        position: absolute;
        bottom: 0;
        left: 0;
        padding-left: 5px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        text-shadow: -2px 1px rgb(0 0 0 / 40%);
        width: 159px;
        background: url("../../../public/static/mask.png") no-repeat;
        background-position: 0 -25px;
        margin: 0;
      }
      .link {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
      }
    }
    h4 {
      display: block;
      width: 100%;
      height: auto;
      margin: 7px 0 1px;
      border: none;
      font-size: 14px;
      font-weight: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      a {
        color: #000;
        white-space: nowrap;
      }
      i {
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
        margin: -2px 4px auto auto;
        width: 26px;
        height: 16px;
         background: url("../../../public/static/icon2.png") no-repeat;
        background-position: -270px -480px;
      }
    }
    h5 {
      width: 100%;
      font-weight: normal;
      margin: 0;
      .hui {
        color: #666;
      }
    }
    a:hover {
      text-decoration: underline;
    }
  }
}
</style>