<template>
  <div class="f_c">
    <div class="f_bg"></div>
    <div class="f_h"></div>
    <div class="f_k">
      <div class="k_l">
        <span class="key"></span>
      </div>
      <div class="k_r"></div>
    </div>
    <div class="f_content" ref="fc">
      <div class="btns">
        <a href="javascript:;" class="back" @click="back" title="上一首"></a>
        <a
          href="javascript:;"
          :class="isPlay ? 'play' : 'pause'"
          @click="trans"
          :title="isPlay ? '播放' : '暂停'"
        ></a>
        <a href="javascript:;" class="next" @click="next" title="下一首"></a>
      </div>
      <div class="f_img">
        <img
          :src="
            picUrl
              ? `${picUrl}?param=34y34`
              : require('../../../public/static/default_album.jpg')
          "
          alt=""
        />
        <router-link :to="'/song?id=' + ids"></router-link>
      </div>
      <div class="f_progress" ref="fp">
        <div class="play_text">
          <router-link
            :to="'/song?id=' + playText.id"
            class="p_name ellipsis"
            :title="playText.name"
            >{{ playText.name }}</router-link
          >
          <router-link to="#" class="p_mv" title="MV"></router-link>
          <span class="p_author ellipsis" v-if="playText.ar">
            <span
              class="p_author_c"
              v-for="(item, index) of playText.ar"
              :key="index"
            >
              <router-link to="#" :title="item.name">{{
                item.name
              }}</router-link>
              <span v-if="!(index == playText.ar.length - 1)"
                >&nbsp;/&nbsp;</span
              >
            </span>
          </span>
        </div>
        <div class="f_p_c">
          <div class="c_p">
            <div class="c_rdy"></div>
            <div class="c_cur" ref="cur">
              <span class="c_btn" :title="Times(currentTime * 1000)"
                ><i></i
              ></span>
            </div>
          </div>
          <span class="c_time"
            ><em>{{ Times(currentTime * 1000) }}</em> / {{ Times(time) }}</span
          >
        </div>
      </div>
      <div class="f_oper">
        <router-link to="#" class="pip" title="画中画歌词"></router-link>
        <router-link to="#" class="flag" title="收藏"></router-link>
        <router-link to="#" class="share" title="分享"></router-link>
      </div>
      <div class="f_ctrl">
        <div class="m_vol" v-show="isTT">
          <div class="f_barbg"></div>
          <div class="vbg">
            <div class="curr" ref="curr"></div>
            <span class="btn" ref="btn"></span>
          </div>
        </div>
        <a
          href="javascript:;"
          class="f_volume"
          title="音量"
          @click="isTT = !isTT"
          ref="fv"
        ></a>
        <a href="javascript:;" class="mode" title="循环" ref="mode"></a>
        <span class="f_add">
          <span class="tip">已添加到播放列表</span>
          <router-link to="#" title="播放列表">11</router-link>
        </span>
        <div class="mode_show" ref="ms">随机</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { Times } from "../../untils/TimeTran";
import { onMounted } from "@vue/runtime-core";
export default {
  setup(props, { emit }) {
    const { state, commit, dispatch } = useStore();
    state.isPlay = false;
    state.currentTime = 0;
    const trans = () => {
      if (state.playText.name) {
        commit("isTransPlay");
        if (state.isPlay == false) {
          emit("pauseAo");
          clearInterval(state.tst);
        } else {
          emit("playAo");
          state.tst = setInterval(() => {
            cur.value.style.width =
              (100 / parseInt(state.time / 1000)) * state.currentTime + "%";
          }, 1000 / 60);
        }
      } else {
        alert("没有歌曲哦，请点击你喜欢的歌曲进行播放");
      }
    };
    const storeFu = async () => {
      state.ids = state.songList[state.songListIndex].id;
      await dispatch("getAudios", state.songList[state.songListIndex].id);
      await dispatch("getPlayText", state.songList[state.songListIndex].id);
      state.isPlay = true;
      emit("playAo");
      state.tst = setInterval(() => {
        cur.value.style.width =
          (100 / parseInt(state.time / 1000)) * state.currentTime + "%";
      }, 1000 / 60);
    };
    const next = () => {
      if (state.songList.length - 1 > state.songListIndex) {
        state.songListIndex++;
        storeFu();
      } else {
        state.songListIndex = 0;
        storeFu();
      }
    };
    const randoms = () => {
      let index = Math.floor(Math.random() * state.songList.length);
      state.songListIndex = index;
      storeFu();
    };
    const back = () => {
      if (state.songListIndex > 0) {
        state.songListIndex--;
        storeFu();
      } else {
        state.songListIndex = state.songList.length - 1;
        storeFu();
      }
    };
    const isTT = ref(false);
    const cur = ref(null);
    const fp = ref(null);
    const mode = ref(null);
    const btn = ref(null);
    const curr = ref(null);
    const fc = ref(null);
    const fv = ref(null);
    const ms = ref(null);
    const modeList = ["mode", "mode1", "mode2"];
    onMounted(() => {
      let bf = btn.value.parentNode;
      if (state.isVolume == 0) {
        fv.value.className = "f_volume";
      } else {
        fv.value.className = "f_volume1";
      }
      curr.value.style.height = state.isVolume * 93 + "px";
      btn.value.style.top = 81 - state.isVolume * 100 + "px";
      mode.value.className = modeList[state.isLoop];
      mode.value.onclick = function () {
        if (state.isLoop == 0) {
          // state.isLoop=1;
          commit("setisLoop", 1);
          setT('单曲循环')
          this.className = modeList[state.isLoop];
        } else if (state.isLoop == 1) {
          commit("setisLoop", 2);
          // state.isLoop=2;
          setT('随机')
          this.className = modeList[state.isLoop];
        } else if (state.isLoop == 2) {
          commit("setisLoop", 0);
          // state.isLoop = 0;
           setT('循环')
          this.className = modeList[state.isLoop];
        }
      };
      document.querySelector("audio").onended = function () {
        if (state.isLoop == 0) {
          next();
        }
        if (state.isLoop == 2) {
          randoms();
        }
      };
      function setT(text){
        clearTimeout(tt)
        ms.value.innerHTML = text
        ms.value.style.display = 'block'
        let tt = setTimeout(() => {
          ms.value.style.display = 'none'
        }, 2000);
      }
      let tbtn = cur.value.children[0];
      let maxLeft = 466,
        minLeft = 0;
      tbtn.onmousedown = function (e) {
        var x = e.pageX - cur.value.offsetWidth;
        fp.value.onmousemove = function (e) {
          let Left = e.pageX - x;
          Left = Math.max(Left, minLeft);
          Left = Math.min(Left, maxLeft);
          cur.value.style.width = (Left / maxLeft) * 100 + "%";
          state.currentTime = parseInt((state.time * Left) / maxLeft / 1000);
          emit("jump");
        };
        fp.value.onmouseleave = fpqingshu;
        fp.value.onmouseup = fpqingshu;
        function fpqingshu() {
          fp.value.onmousemove = null;
          fp.value.onmouseup = null;
          fp.value.onmouseleave = null;
        }
      };
      btn.value.onmousedown = function (e) {
        let ch = document.documentElement.clientHeight;
        let oft =
          ch + bf.parentNode.offsetTop - fc.value.offsetHeight + bf.offsetTop;
        //页面的长度+vbg的偏移量-底部的长度+volume的槽偏移量==槽到页面头部的距离
        bf.parentNode.onmousemove = function (e) {
          let top = e.clientY - oft,
            maxTop = 81,
            minTop = 0;
          top = Math.max(minTop, top);
          top = Math.min(maxTop, top);
          btn.value.style.top = top + "px";
          commit("setisVolume", (81 - top) / 100);
          curr.value.style.height = state.isVolume * bf.offsetHeight + "px";
          if (state.isVolume == 0) {
            fv.value.className = "f_volume";
          } else {
            fv.value.className = "f_volume1";
          }
        };
        bf.parentNode.onmouseleave = bfqingshu;
        bf.parentNode.onmouseup = bfqingshu;
        function bfqingshu() {
          bf.parentNode.onmousemove = null;
          bf.parentNode.onmouseup = null;
          bf.parentNode.onmouseleave = null;
        }
      };
    });

    return {
      ...toRefs(state),
      trans,
      Times,
      cur,
      fp,
      next,
      back,
      mode,
      isTT,
      btn,
      curr,
      fc,
      fv,
      ms
    };
  },
};
</script>

<style lang="less" scoped>
.f_c {
  position: relative;
  .f_bg {
    width: 100%;
    height: 53px;
    margin-right: 67px;
    background: url("../../../public/static/playbar.png") repeat-x 0 9999px;
    background-position: 0 0;
  }
  .f_h {
    position: absolute;
    top: -10px;
    width: 100%;
    height: 20px;
    cursor: pointer;
  }
  .f_k {
    .k_l {
      position: absolute;
      top: -14px;
      right: 15px;
      width: 52px;
      height: 67px;
      background: url("../../../public/static/playbar.png");
      background-position: 0 -380px;
      .key {
        display: block;
        width: 18px;
        height: 18px;
        margin: 6px 0 0 17px;
        background: url("../../../public/static/playbar.png");
        background-position: -80px -380px;
        cursor: pointer;
      }
      .key:hover {
        background-position-y: -400px;
      }
    }
    .k_r {
      position: absolute;
      top: -1px;
      right: 1px;
      width: 15px;
      height: 54px;
      background: url("../../../public/static/playbar.png");
      background-position: -52px -393px;
    }
  }
  .f_content {
    position: absolute;
    top: 7px;
    left: 50%;
    width: 980px;
    height: 47px;
    transform: translateX(-50.8%);
    .btns {
      float: left;
      width: 137px;
      padding: 6px 0 0 0;
      a {
        display: block;
        background: url("../../../public/static/playbar.png");
        float: left;
        margin-right: 8px;
        text-indent: -9999px;
      }
      .back {
        width: 28px;
        height: 28px;
        margin-top: 5px;
        background-position: 0 -130px;
      }
      .back:hover {
        background-position-x: -30px;
      }
      .pause {
        width: 36px;
        height: 36px;
        margin-top: 0;
        background-position: 0 -204px;
      }
      .pause:hover {
        background-position-x: -40px;
      }
      .play {
        width: 36px;
        height: 36px;
        margin-top: 0;
        background-position: 0 -165px;
      }
      .play:hover {
        background-position-x: -40px;
      }
      .next {
        width: 28px;
        height: 28px;
        margin-top: 5px;
        background-position: -80px -130px;
      }
      .next:hover {
        background-position-x: -110px;
      }
    }
    .f_img {
      float: left;
      position: relative;
      margin: 6px 15px 7px 0;
      width: 34px;
      height: 34px;
      img {
        width: 34px;
        height: 34px;
      }
      a {
        position: absolute;
        top: 0px;
        left: 0px;
        display: block;
        width: 34px;
        height: 35px;
        background: url("../../../public/static/playbar.png");
        background-position: 0 -80px;
      }
    }
    .f_progress {
      float: left;
      width: 581px;
      position: relative;
      .play_text {
        width: 100%;
        height: 28px;
        overflow: hidden;
        color: #e8e8e8;
        text-shadow: 0 1px 0 #171717;
        line-height: 28px;
        a {
          color: #e8e8e8;
          float: left;
        }
        a:hover {
          text-decoration: underline;
        }
        .ellipsis {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
        .p_name {
          max-width: 300px;
          text-shadow: 0 1px 0 #171717;
          line-height: 28px;
        }
        .p_mv {
          width: 19px;
          height: 17px;
          margin: 6px 0 0 3px;
          background: url("../../../public/static/playbar.png") no-repeat;
          background-position: 0 -57px;
        }
        .p_mv:hover {
          background-position-x: -20px;
        }
        .p_author {
          float: left;
          max-width: 220px;
          margin-left: 15px;
          .p_author_c {
            float: left;
            max-width: 220px;
          }
          span {
            color: #9b9b9b;
          }
          a {
            color: #9b9b9b;
          }
        }
      }
      .f_p_c {
        width: 466px;
        position: relative;
        .c_p {
          width: 466px;
          height: 9px;
          background: url("../../../public/static/statbar.png") no-repeat;
          background-position: right 0px;
          .c_rdy {
            width: 0%;
            height: 100%;
            background: url("../../../public/static/statbar.png") no-repeat;
            background-position: right -30px;
          }
          .c_cur {
            position: absolute;
            top: 0;
            left: 0;
            width: 0%;
            height: 100%;
            background: url("../../../public/static/statbar.png") no-repeat;
            background-position: left -66px;
            .c_btn {
              cursor: pointer;
              position: absolute;
              top: -7px;
              right: -13px;
              width: 22px;
              height: 24px;
              margin-left: -11px;
              background: url("../../../public/static/iconall.png") no-repeat;
              background-position: 0 -250px;
              i {
                visibility: hidden;
                position: absolute;
                left: 5px;
                top: 5px;
                width: 12px;
                height: 12px;
                background: url("../../../public/static/loading.gif") no-repeat;
              }
            }
            .c_btn:hover {
              background-position-y: -280px;
            }
          }
        }
        .c_time {
          position: absolute;
          top: -6px;
          right: -84px;
          color: #797979;
          text-shadow: 0 1px 0 #121212;
          em {
            font-style: normal;
            text-align: left;
            font-size: inherit;
            color: #a1a1a1;
          }
        }
      }
    }
    .f_oper {
      float: left;
      width: 87px;
      a {
        float: left;
        width: 25px;
        height: 25px;
        margin: 11px 2px 0 0;
        text-indent: -9999px;
      }
      a:hover {
        background-position-y: -189px;
      }
      .pip {
        background: url("../../assets/img/收藏.png") no-repeat;
      }
      .flag {
        background: url("../../../public/static/playbar.png") no-repeat;
        background-position: -88px -163px;
      }
      .share {
        background: url("../../../public/static/playbar.png") no-repeat;
        background-position: -114px -163px;
      }
      .pip:hover {
        background-position-y: -25px;
      }
    }
    .f_ctrl {
      float: left;
      position: relative;
      z-index: 10;
      width: 126px;
      padding-left: 13px;
      background: url("../../../public/static/playbar.png") no-repeat;
      background-position: -147px -238px;
      .m_vol {
        position: absolute;
        // top: -113px;
        bottom: 36px;
        left: 9px;
        width: 32px;
        height: 113px;
        .f_barbg {
          position: absolute;
          top: 0;
          left: 0;
          width: 32px;
          height: 113px;
          background: url("../../../public/static/playbar.png") no-repeat;
          background-position: 0 -503px;
        }
        .vbg {
          padding: 4px 0;
          position: absolute;
          top: 11px;
          left: 14px;
          width: 4px;
          height: 93px;
          .curr {
            position: absolute;
            width: 4px;
            height: 0px;
            bottom: 4px;
            left: 0;
            bottom: 0;
            background: url("../../../public/static/playbar.png") no-repeat;
            background-position: -40px bottom;
            overflow: hidden;
          }
          .btn {
            display: block;
            position: absolute;
            left: -7px;
            width: 18px;
            height: 20px;
            top: 81px;
            background: url("../../../public/static/iconall.png") no-repeat;
            background-position: -40px -250px;
            cursor: pointer;
          }
          .btn:hover {
            background-position-y: -280px;
          }
        }
      }
      a {
        display: block;
        float: left;
        width: 25px;
        height: 25px;
        margin: 11px 2px 0 0;
        background: url("../../../public/static/playbar.png") no-repeat;
      }
      .f_volume {
        background-position: -104px -69px;
      }
      .f_volume:hover {
        background-position-x: -126px;
      }
      .f_volume1 {
        background-position: -2px -248px;
      }
      .f_volume1:hover {
        background-position-x: -31px;
      }
      .mode {
        background-position: -3px -344px;
      }
      .mode:hover {
        background-position-x: -33px;
      }
      .mode1 {
        background-position: -66px -344px;
      }
      .mode1:hover {
        background-position-x: -93px;
      }
      .mode2 {
        background-position: -66px -248px;
      }
      .mode2:hover {
        background-position-x: -93px;
      }
      .f_add {
        display: block;
        float: left;
        width: 59px;
        height: 36px;
        position: relative;
        .tip {
          visibility: hidden;
          position: absolute;
          top: -51px;
          left: -65px;
          width: 152px;
          height: 49px;
          background: url("../../../public/static/playbar.png") no-repeat;
          background-position: 0 -287px;
          text-align: center;
          color: #fff;
          line-height: 37px;
        }
        a {
          display: block;
          float: left;
          width: 59px;
          height: 25px;
          padding-left: 21px;
          background: url("../../../public/static/playbar.png") no-repeat;
          background-position: -42px -68px;
          line-height: 27px;
          text-align: center;
          color: #666;
          text-shadow: 0 1px 0 #080707;
          text-indent: 0;
          text-decoration: none;
        }
        a:hover {
          background-position-y: -98px;
        }
      }
      .mode_show {
        display: none;
        position: absolute;
        top: -35px;
        left: 12px;
        width: 81px;
        height: 39px;
        line-height: 34px;
        background: url("../../../public/static/playbar.png") no-repeat;
        background-position: 0 -457px;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>