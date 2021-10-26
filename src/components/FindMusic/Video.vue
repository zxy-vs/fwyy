<template>
  <div class="Mv">
    <div class="M_l">
      <div class="title">
        <h2>
          {{ stateList.title }}
        </h2>
        <span class="name">
          by <router-link to="">{{ creator.nickname }}</router-link>
        </span>
      </div>
      <div class="playmv">
        <video :src="video" width="640" height="360" controls autoplay></video>
      </div>
      <div class="btns">
        <a href="javascript:;" class="btn3 bg2"
          ><span><i></i>({{ stateList.praisedCount }})</span></a
        >
        <a href="javascript:;" class="btn3"
          ><span>({{ stateList.subscribeCount }})</span></a
        >
        <a href="javascript:;" class="btn3 bg1"
          ><span>({{ stateList.shareCount }})</span>
        </a>
      </div>
    </div>
    <div class="M_r">
      <h3>
        <span>MV简介</span>
      </h3>
      <div class="mv_txt">
        <p>发布时间：{{ Time(stateList.publishTime) }}</p>
        <p>播放次数：{{ NumberW(stateList.playTime) }}次</p>
        <p class="intr" v-html="stateList.desc"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { NumberW } from "../../untils/NumberW";
import { watchEffect } from "@vue/runtime-core";
import { Time } from "../../untils/TimeTrans";
import { api } from '../../untils/baseProxy';
import { useStore } from 'vuex';
export default {
  setup() {
    const Route = useRoute();
    document.querySelector('audio').pause();
    const {state} = useStore()
    state.isPlay = false
    const stat = reactive({
      stateList: [],
      video: "",
      creator: [],
      async getStateList(id) {
        await axios.get(api+"/video/detail?id=" + id).then((res) => {
          this.stateList = res.data;
          this.creator = res.data.creator;
          document.title = this.stateList.title
        });
      },
      async getVideo(id) {
        await axios.get(api+"/video/url?id=" + id).then((res) => {
          this.video = res.urls[0].url;
        });
      },
    });
    watchEffect(() => {
      if (Route.path == "/video") {
        stat.getStateList(Route.query.id);
        stat.getVideo(Route.query.id);
      }
    });

    return {
      ...toRefs(stat),
      NumberW,
      Time,
    };
  },
};
</script>

<style lang="less" scoped>
.Mv {
  width: 982px;
  margin: auto;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  display: flex;
  .M_l {
    width: 710px;
    height: 100%;
    border-right: 1px solid #d3d3d3;
    padding: 24px 30px 40px 39px;
    .title {
      padding-top: 10px;
      margin-bottom: 8px;
      height: 32px;
      h2 {
        margin: 0;
        float: left;
        max-width: 100%;
        margin-top: -10px;
        margin-right: 8px;
        font-size: 24px;
        line-height: 32px;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        i {
          float: left;
          margin: 7px 5px auto auto;
          display: block;
          width: 29px;
          height: 18px;
          background: url("../../../public/static/icon2.png") no-repeat;
          background-position: -230px -480px;
        }
      }
      .name {
        float: left;
        margin: 4px 0 8px;
        line-height: 17px;
        a {
          color: #0c73c2;
        }
        a:hover {
          text-decoration: underline;
        }
      }
    }
    .btns {
      margin: 12px 0 45px;
      .btn3 {
        float: left;
        display: block;
        padding-right: 5px;
        margin-right: 6px;
        color: #333;
        background: url("../../../public/static/button2.png") no-repeat;
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
          background: url("../../../public/static/button2.png") no-repeat;
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
        background-position: 0 -59px;
        position: relative;
        i {
          position: absolute;
          left: 6px;
          top: 0;
          display: block;
          width: 17px;
          height: 15px;
          margin: 8px 6px 0 0;
          background: url("../../../public/static/button2.png") no-repeat;
          background-position: 0 -95px;
        }
      }
      .bg2:hover span {
        background-position: 0 -141px;
      }
    }
  }
  .M_r {
    padding: 20px 40px 40px 30px;
    width: 270px;
    h3 {
      width: 100%;
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
      font-weight: bold;
    }
    .mv_txt {
      margin-top: -4px;
      padding-bottom: 34px;
      p {
        line-height: 18px;
        color: #999;
        margin: 0;
      }
      .intr {
        margin-top: 10px;
        color: #333;
      }
    }
  }
}
</style>