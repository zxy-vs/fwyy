<template>
  <div class="btn">
    <a href="javascript:;" class="btn1" @click="Emits"
      ><span><em></em>播放</span></a
    >
    <a href="javascript:;" class="btn2"></a>
    <a href="javascript:;" class="btn3">
      <span v-if="subscribedCount">({{ NumberW(subscribedCount) }})</span
      ><span v-if="!subscribedCount">收藏</span>
    </a>
    <a href="javascript:;" class="btn3 bg1"
      ><span v-if="quan.shareCount">({{ NumberW(quan.shareCount) }})</span
      >
      <span v-else-if="info.shareCount">({{ NumberW(info.shareCount) }})</span>
      <span v-else>分享</span>
    </a>
    <a href="javascript:;" class="btn3 bg2"><span>下载</span></a>
    <a href="javascript:;" class="btn3 bg3"
      ><span v-if="quan.commentCount">({{ NumberW(quan.commentCount) }})</span
      ><span v-else-if="info.commentCount">({{ NumberW(info.commentCount) }})</span>
      <span v-else>({{ NumberW(quan.mark) }})</span>
    </a>
  </div>
</template>

<script>
import { NumberW } from "../untils/NumberW";
import { useStore } from "vuex";
export default {
  props: ["quan", "subscribedCount",'info'],
  setup(props, { emit }) {
    const { state } = useStore();
    const Emits = () => {
      emit("getids");
      emit("playing");
      clearInterval(state.tst);
      state.tst = setInterval(() => {
        document.querySelector(".c_cur").style.width =
          (100 / parseInt(state.time / 1000)) * state.currentTime + "%";
      }, 1000 / 60);
    };

    return {
      Emits,
      NumberW,
    };
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin-bottom: 25px;
  margin-right: -10px;
  width: 420px;
  height: 31px;
  margin: 0 10px 25px 0;
  .btn1 {
    float: left;
    display: block;
    padding-left: 5px;
    width: 65px;
    height: 31px;
    line-height: 31px;
    background: url("../../public/static/button2.png") no-repeat;
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
        background: url("../../public/static/button2.png") no-repeat;
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
    background: url("../../public/static/button2.png") no-repeat;
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
    background: url("../../public/static/button2.png") no-repeat;
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
      background: url("../../public/static/button2.png") no-repeat;
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
</style>