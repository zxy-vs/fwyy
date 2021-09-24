<template>
  <div class="mains">
    <div class="mains_l">
      <div class="song">
        <div class="s_img">
          <img :src="`${al.picUrl}?param=130y130`" alt="" />
          <span></span>
        </div>
        <div class="s_text">
          <div class="t_t">
            <i></i>
            <div class="t_title">
              <h2>{{ quan.name }}</h2>
            </div>
          </div>
          <p class="t_a">
            歌手：
            <span v-for="(item, index) of ar" :key="index">
              <router-link to="#">{{ item.name }}</router-link>
              <span v-if="!(index==ar.length-1)"> / </span>
            </span>
          </p>
          <p class="t_a">
            所属专辑：<router-link to="#">{{ al.name }}</router-link>
          </p>
          <div class="t_btn">
            <global-com-btn :quan="quan" :info="info" @getids="getid" />
          </div>
          <div class="t_song" v-html="lyric"></div>
        </div>
      </div>
    </div>
    <div class="mains_r"></div>
  </div>
</template>

<script>
import { reactive, toRef, toRefs } from "@vue/reactivity";
import GlobalComBtn from "../../GlobalCom/GlobalComBtn.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  components: { GlobalComBtn },
  setup() {
    const {
      query: { id: id },
    } = useRoute();
    const { state,commit, dispatch } = useStore();
    const getid = async () => {
      state.ids = id
      await dispatch("getAudios", id);
      commit('setPlayText',stateL.quan)
      state.picUrl = stateL.quan.al.picUrl
      commit('isSetPlay')
      state.time = stateL.quan.dt
      const ao = document.querySelector("audio");
      if (ao.played) {
        ao.load();
        ao.play();
      } else {
        ao.play();
      }
    };
    const stateL = reactive({
      quan: [],
      al: [],
      ar: [],
      lyric: "",
      info:[],
      subscribedCount: 0,
      async getquan(id) {
        await axios.get("/api/song/detail?ids=" + id).then((res) => {
          this.quan = res.songs[0];
          this.al = res.songs[0].al;
          this.ar = res.songs[0].ar;
        });
        await axios.get("/api/lyric?id=" + id).then((res) => {
          if (res.lrc) {
            this.lyric = res.lrc.lyric;
            this.lyric = this.lyric.replace(/\n/g, "<br>");
          } else {
            this.lyric = "此音乐为纯音乐，无歌词";
          }
        });
      },
    });
    stateL.getquan(id);
    return {
      ...toRefs(stateL),
      getid,
    };
  },
};
</script>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.mains {
  width: 980px;
  height: 100%;
  margin: auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  background-color: #fff;
  display: flex;
  .mains_l {
    width: 709px;
    .song {
      margin-top: -10px;
      padding: 47px 30px 40px 39px;
      .s_img {
        float: left;
        width: 206px;
        margin-right: -226px;
        position: relative;
        animation: rotate 10s linear infinite;
        img {
          width: 130px;
          height: 130px;
          margin: 34px;
        }
        span {
          position: absolute;
          display: block;
          width: 206px;
          height: 205px;
          top: -4px;
          left: -4px;
          background: url("../../../public/static/coverall.png");
          background-position: -140px -580px;
        }
      }
      .s_text {
        width: 414px;
        float: right;
        .t_t {
          position: relative;
          margin: 0 0 12px;
          line-height: 24px;
          i {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 54px;
            height: 24px;
            background: url("../../../public/static/icon.png");
            background-position: 0 -463px;
          }
          .t_title {
            margin-left: 64px;
            h2 {
              line-height: 24px;
              font-size: 24px;
              font-weight: normal;
            }
          }
        }
        .t_a {
          margin: 10px 0;
          span {
            a {
              color: #0c73c2;
            }
            a:hover {
              text-decoration: underline;
            }
          }
        }
        .t_song {
          margin-top: 13px;
          min-height: 80px;
          line-height: 23px;
        }
      }
    }
  }
  .mains_r {
    width: 268px;
    border: 1px solid #d3d3d3;
    border-width: 0 0 0 1px;
  }
}
</style>