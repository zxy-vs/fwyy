<template>
  <img :src="state.picUrl" alt="" class="imgbg" />
  <div class="bd_list">
    <ul class="f_cbss" ref="ul">
      <li
        :class="state.ids == item.id ? 'select' : ''"
        v-for="(item, index) of state.songList"
        :key="index"
        @click="PLay(item.id, index)"
      >
        <div class="col c1">
          <span class="icon"></span>
        </div>
        <div class="col c2">{{ item.name }}</div>
        <div class="col c3">
          <div class="icns">
            <i class="del" @click="del(index)" ref="dell"></i>
            <i class="dl"></i>
            <i class="fx"></i>
            <i class="sc"></i>
          </div>
        </div>
        <div class="col c4">
          <span v-for="(items, indexs) of item.ar" :key="indexs">
            <router-link :to="'/artist?id=' + items.id">{{
              items.name
            }}</router-link>
            <em v-if="indexs != item.ar.length - 1">/</em> </span
          ><span v-for="(items, indexs) of item.artists" :key="indexs">
            <router-link :to="'/artist?id=' + items.id">{{
              items.name
            }}</router-link>
            <em v-if="indexs != item.artists.length - 1">/</em>
          </span>
          <span v-for="(items, indexs) of item.alia" :key="indexs">
            <router-link :to="'/artist?id=' + items.id">{{
              items.name
            }}</router-link>
            <em v-if="indexs != item.alia.length - 1">/</em>
          </span>
        </div>
        <div class="col c5" v-if="item.dt">{{ Times(item.dt) }}</div>
        <div class="col c5" v-if="item.duration">
          {{ Times(item.duration) }}
        </div>
        <div class="col c6">
          <a href="javascript:;" class="links"></a>
        </div>
      </li>
    </ul>
  </div>
  <div class="bline" ref="btn">
    <span :style="'height:' + hh + 'px;'"></span>
  </div>
  <div class="msk2"></div>
  <div class="listlyric">
    <div class="lsit_lyric" ref="pp">
      <template v-for="(item, index) of state.songTxt" :key="index">
        <p
          v-if="index % 2 && index != 0"
          :title="state.songTxt[index - 1]"
          :class="[
            (NT(state.songTxt[index - 1]) <= state.currentTime &&
              NT(state.songTxt[index + 1]) > state.currentTime) ||
            state.songTxt.length - 2 == index
              ? 'z_sel'
              : '',
          ]"
        >
          {{ item }}
        </p>
      </template>
    </div>
  </div>
  <div class="bline bline1" ref="btn1">
    <span :style="'height:' + hh1 + 'px;'"></span>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { Times } from "../../../untils/TimeTran";
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { NT } from "../../../untils/TimeN";
export default {
  setup() {
    const { state, dispatch } = useStore();
    const ul = ref(null);
    const btn = ref(null);
    const btn1 = ref(null);
    const hh = ref();
    const hh1 = ref();
    const pp = ref(null);
    let btnn = ref(null);
    let btnn1 = ref(null);
    const del = (index) => {
      state.songList.splice(index, 1);
    };
    onMounted(async () => {
      btnn = await setInterval(() => {
        hh.value =
          (btn.value.parentNode.offsetHeight / ul.value.offsetHeight) *
          btn.value.parentNode.offsetHeight;
      }, 1000 / 60);
      btn.value.onmousedown = function (e) {
        e.preventDefault();
        let y =
          e.clientY -
          (document.documentElement.clientHeight -
            53 +
            document.querySelector(".f_list").offsetTop) -
          btn.value.parentNode.offsetTop -
          btn.value.children[0].offsetTop;
        document.documentElement.onmousemove = function (e) {
          let maxTop = btn.value.parentNode.offsetHeight - hh.value,
            minTop = 0,
            top =
              e.clientY -
              (document.documentElement.clientHeight -
                53 +
                document.querySelector(".f_list").offsetTop) -
              btn.value.parentNode.offsetTop -
              y;
          top = Math.max(minTop, top);
          top = Math.min(maxTop, top);
          btn.value.children[0].style.top = top + "px";
          ul.value.style.top =
            -top / (btn.value.parentNode.offsetHeight / ul.value.offsetHeight) +
            "px";
        };
        document.documentElement.onmouseup = function () {
          document.documentElement.onmousemove = null;
          document.documentElement.onmouseup = null;
        };
      };
      ul.value.parentNode.onmouseenter = function () {
        ul.value.onmousewheel = function (e) {
          if (e.wheelDelta < 0) {
            if (
              ul.value.offsetHeight - ul.value.parentNode.offsetHeight >
              -ul.value.offsetTop
            ) {
              ul.value.style.top = ul.value.offsetTop - 10 + "px";
              btn.value.children[0].style.top =
                -ul.value.offsetTop *
                  (btn.value.parentNode.offsetHeight / ul.value.offsetHeight) +
                "px";
            }
          } else {
            if (ul.value.offsetTop < 0) {
              ul.value.style.top = ul.value.offsetTop + 10 + "px";
              btn.value.children[0].style.top =
                -ul.value.offsetTop *
                  (btn.value.parentNode.offsetHeight / ul.value.offsetHeight) +
                "px";
            }
          }
        };
      };
      btnn1 = await setInterval(() => {
        hh1.value =
          (btn1.value.parentNode.offsetHeight / pp.value.offsetHeight) *
          btn1.value.parentNode.offsetHeight;
      }, 1000 / 60);
      btn1.value.onmousedown = function (e) {
        e.preventDefault();
        let y =
          e.clientY -
          (document.documentElement.clientHeight -
            53 +
            document.querySelector(".f_list").offsetTop) -
          btn1.value.parentNode.offsetTop -
          btn1.value.children[0].offsetTop;
        document.documentElement.onmousemove = function (e) {
          let maxTop = btn.value.parentNode.offsetHeight - hh1.value,
            minTop = 0,
            top =
              e.clientY -
              (document.documentElement.clientHeight -
                53 +
                document.querySelector(".f_list").offsetTop) -
              btn1.value.parentNode.offsetTop -
              y;
          top = Math.max(minTop, top);
          top = Math.min(maxTop, top);
          btn1.value.children[0].style.top = top + "px";
          pp.value.style.top =
            -top /
              (btn1.value.parentNode.offsetHeight / pp.value.offsetHeight) +
            "px";
        };
        document.documentElement.onmouseup = function () {
          document.documentElement.onmousemove = null;
          document.documentElement.onmouseup = null;
        };
      };
      pp.value.parentNode.onmouseenter = function () {
        pp.value.onmousewheel = function (e) {
          if (e.wheelDelta < 0) {
            if (
              pp.value.offsetHeight - pp.value.parentNode.offsetHeight >
              -pp.value.offsetTop
            ) {
              pp.value.style.top = pp.value.offsetTop - 10 + "px";
              btn1.value.children[0].style.top =
                -pp.value.offsetTop *
                  (btn1.value.parentNode.offsetHeight / pp.value.offsetHeight) +
                "px";
            }
          } else {
            if (pp.value.offsetTop < 0) {
              pp.value.style.top = pp.value.offsetTop + 10 + "px";
              btn1.value.children[0].style.top =
                -pp.value.offsetTop *
                  (btn1.value.parentNode.offsetHeight / pp.value.offsetHeight) +
                "px";
            }
          }
        };
      };
      let ao = document.querySelector("audio");
      ao.addEventListener("play", function () {
        pp.value.style.top = -pp.value.querySelector(".z_sel").offsetTop + "px";
        if (ul.value.querySelector(".select")) {
          if (ul.value.querySelector(".select").offsetTop >= 230) {
            ul.value.style.top =
              230 - ul.value.querySelector(".select").offsetTop + "px";
            btn.value.children[0].style.top =
              (ul.value.querySelector(".select").offsetTop /
                ul.value.offsetHeight) *
                (btn.value.offsetHeight - btn.value.children[0].offsetHeight) +
              "px";
          }
        }
      });
      ao.addEventListener("timeupdate", function () {
        if (pp.value.querySelector(".z_sel")) {
          btn1.value.children[0].style.top =
            (pp.value.querySelector(".z_sel").offsetTop /
              pp.value.offsetHeight) *
              (btn1.value.offsetHeight - hh1.value) +
            "px";
          if (pp.value.querySelector(".z_sel").offsetTop >= 128) {
            pp.value.style.top =
              128 - pp.value.querySelector(".z_sel").offsetTop + "px";
          }
        }
      });
    });
    const PLay = async (id, index) => {
      if (!ul.value.querySelector(".select")) {
        state.ids = id;
        state.songListIndex = index;
        await dispatch("getAudios", state.ids);
        await dispatch("getPlayText", state.ids);
        clearInterval(state.tst);
        const pg = document.querySelector(".c_cur");
        state.tst = setInterval(() => {
          pg.style.width =
            (100 / parseInt(state.time / 1000)) * state.currentTime + "%";
        }, 1000 / 60);
        state.isPlay = true;
        let ao = document.querySelector("audio");
        if (ao.played) {
          ao.load();
          ao.play();
        } else {
          ao.play();
        }
      }
    };
    onBeforeUnmount(() => {
      clearInterval(btnn);
      clearInterval(btnn1);
    });
    return {
      state,
      Times,
      PLay,
      ul,
      btn,
      btn1,
      hh,
      hh1,
      pp,
      NT,
      del,
    };
  },
};
</script>

<style lang="less" scoped>
.imgbg {
  position: absolute;
  left: 2px;
  top: -360px;
  z-index: 1;
  width: 980px;
  height: auto;
  opacity: 0.2;
}
.bd_list {
  position: absolute;
  left: 2px;
  top: 0;
  z-index: 4;
  height: 260px;
  width: 553px;
  overflow: hidden;
  .f_cbss {
    position: absolute;
    color: #ccc;
    overflow: hidden;
    margin: 0;
    background-color: #12121277;
    li {
      float: left;
      width: 100%;
      .col {
        float: left;
        padding-left: 10px;
        height: 28px;
        line-height: 28px;
        overflow: hidden;
        cursor: pointer;
        .icon {
          display: none;
          margin-top: 8px;
          width: 10px;
          height: 13px;
          background: url("../../../../public/static/playlist.png") no-repeat;
          background-position: -182px 0;
        }
        .icns {
          display: none;
          position: absolute;
          right: 0;
          top: 0;
          width: 100px;
          height: 23px;
          line-height: 28px;
          i {
            display: block;
            float: right;
            overflow: hidden;
            margin: 7px 0 0 10px;
            height: 16px;
            background: url("../../../../public/static/playlist.png") no-repeat;
          }
          .del {
            width: 13px;
            background-position: -51px 0;
          }
          .dl {
            width: 14px;
            background-position: -57px -50px;
          }
          .fx {
            width: 14px;
            background-position: 0 0;
          }
          .sc {
            width: 16px;
            background-position: -24px 0;
          }
          .del:hover,
          .fx:hover,
          .sc:hover {
            background-position-y: -20px;
          }
          .dl:hover {
            background-position-x: -80px;
          }
        }
        span {
          white-space: nowrap;
          a {
            color: #9b9b9b;
          }
          a:hover {
            text-decoration: underline;
          }
        }
        .links {
          display: block;
          float: right;
          overflow: hidden;
          margin: 7px 0 0 10px;
          width: 14px;
          height: 16px;
          margin-left: 0;
          background: url("../../../../public/static/playlist.png") no-repeat;
          background-position: -80px 0px;
        }
        .links:hover {
          background-position-y: -20px;
        }
      }
      .c1 {
        width: 20px;
      }
      .c2 {
        width: 266px;
      }
      .c3 {
        width: 88px;
        position: relative;
      }
      .c4 {
        width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .c5 {
        width: 45px;
        color: #666;
      }
      .c6 {
        width: 43px;
        padding-left: 6px;
      }
    }
    li:hover {
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
      .col {
        .icns {
          display: block;
        }
      }
    }
    .select {
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
      .col {
        color: #fff;
        a {
          color: #fff;
        }
        .icon {
          display: block;
        }
      }
    }
  }
}
.bline {
  position: absolute;
  left: 555px;
  top: -1px;
  z-index: 2;
  width: 6px;
  height: 260px;
  background: #000;
  opacity: 0.5;
  span {
    display: block;
    position: absolute;
    left: 0;
    top: 0px;
    width: 6px;
    border-radius: 5px;
    cursor: pointer;
    background: #868686;
    border: 1px solid #a6a6a6;
    opacity: 0.8;
  }
}
.msk2 {
  position: absolute;
  left: 560px;
  top: 0;
  z-index: 3;
  width: 420px;
  height: 250px;
  background: #121212;
  opacity: 0.01;
}
.listlyric {
  position: absolute;
  right: 40px;
  bottom: 0;
  z-index: 4;
  margin: 21px 0 20px 0;
  height: 219px;
  width: 354px;
  overflow: hidden;
  .lsit_lyric {
    position: absolute;
    width: 100%;
    p {
      margin: 0;
      color: #989898;
      word-wrap: break-word;
      text-align: center;
      line-height: 32px;
      height: auto !important;
      min-height: 32px;
      transition: color 0.7s linear;
    }
    .z_sel {
      color: #fff;
      font-size: 14px;
    }
  }
}

.bline1 {
  left: auto;
  right: 2px;
}
</style>