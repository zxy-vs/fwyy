<template>
  <img
    src="https://p1.music.126.net/PZIMVQF_9SadsB-CWkJUdQ==/109951165597071582.jpg"
    alt=""
    class="imgbg"
  />
  <div class="bd_list">
    <ul class="f_cb" ref="ul">
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
            <i class="del"></i>
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
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { Times } from "../../../untils/TimeTran";
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const { state, dispatch } = useStore();
    const PLay = async (id, index) => {
      state.ids = id;
      console.log(1);
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
      const ao = document.querySelector("audio");
      if (ao.played) {
        ao.load();
        ao.play();
      } else {
        ao.play();
      }
    };
    const ul = ref(null);
    const btn = ref(null);
    const hh = ref();
    let btnn = ref(null);
    const songText = async (id) => {
      await axios.get(api + "/lyric?id=" + id).then((res) => {
        if (res.lrc) {
          this.lyric = res.lrc.lyric;
          this.lyric = this.lyric.replace(/\n/g, "<br>");
        } else {
          this.lyric = "此音乐为纯音乐，无歌词";
        }
      });
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
    });
    onBeforeUnmount(() => {
      clearInterval(btnn);
    });
    return {
      state,
      Times,
      PLay,
      ul,
      btn,
      hh,
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
  .f_cb {
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
</style>