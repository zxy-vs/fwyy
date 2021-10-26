<template>
  <div>
    <section class="mains">
      <div class="mains_l">
        <div class="mains_l_top">
          <div class="top_img">
            <img :src="quan.coverImgUrl" alt="" />
            <span></span>
          </div>
          <div class="top_text">
            <div class="t_t">
              <i><span></span></i>
              <div class="t_title">
                <h2>{{ quan.name }}</h2>
              </div>
            </div>
            <div class="t_u">
              <router-link :to="'/home?id=' + creator.userId" class="u_img">
                <img :src="`${creator.avatarUrl}?param=40y40`" alt="" />
              </router-link>
              <router-link :to="'/home?id=' + creator.userId" class="g_title">{{
                creator.nickname
              }}</router-link>
              <img class="v_logo" src="../../assets/img/vlogo.png" alt="" />
              <span>{{ birthday }}创建</span>
            </div>
            <div class="t_b">
              <global-com-btn
                :quan="quan"
                :info="info"
                :subscribedCount="subscribedCount"
                @playing="Played"
              />
            </div>
            <div class="t_tag">
              <b>标签：</b>
              <router-link
                to="#"
                class="tag_c"
                v-for="(item, index) of quan.tags"
                :key="index"
              >
                <span>{{ item }}</span>
              </router-link>
            </div>
            <p class="t_x"><b>介绍：</b>{{ quan.description }}</p>
          </div>
        </div>
        <div class="mains_l_bottom">
          <relate-list :quan="quan" :data="data" />
        </div>
      </div>
      <div class="mains_r">
        <GlobalComMR />
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import RelateList from "./Related/RelateList.vue";
import { Time } from "../../untils/TimeTrans";
import { useStore } from "vuex";
import { watchEffect } from "@vue/runtime-core";
import { api } from "../../untils/baseProxy";
export default {
  components: { RelateList },
  setup() {
    const { state, dispatch, commit } = useStore();
    const Route = useRoute();
    const stateL = reactive({
      quan: [],
      info: [],
      creator: [],
      birthday: "",
      data: [],
      subscribedCount: 0,
      async getquan(id) {
        await axios.get(api + "/playlist/detail?id=" + id).then((res) => {
          this.quan = res.playlist;
          this.creator = res.playlist.creator;
          this.data = res.playlist.tracks;
          this.birthday = Time(this.creator.birthday);
          this.subscribedCount = res.playlist.subscribedCount;
          document.title = this.quan.name+' - 歌单 - 网易云音乐';
        });
      },
      async Played() {
        state.songList = stateL.quan.trackIds;
        state.songListIndex = 0;
        state.ids = state.songList[state.songListIndex].id;
        await dispatch("getAudios", state.songList[state.songListIndex].id);
        await dispatch("getPlayText", state.songList[state.songListIndex].id);
        commit("isSetPlay");
        const ao = document.querySelector("audio");
        if (ao.played) {
          ao.load();
          ao.play();
        } else {
          ao.play();
        }
      },
    });
    watchEffect(() => {
      if (Route.path == "/playlist") {
        stateL.getquan(Route.query.id);
      }
    });
    return {
      ...toRefs(stateL),
    };
  },
};
</script>

<style lang="less" scoped>
div {
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
      min-height: 400px;
      padding: 47px 30px 40px 39px;
      .mains_l_top {
        width: 100%;
        .top_img {
          float: left;
          width: 200px;
          height: 200px;
          position: relative;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
          span {
            display: block;
            width: 208px;
            height: 208px;
            position: absolute;
            top: -4px;
            left: -4px;
            background: url("../../../public/static/coverall.png") no-repeat;
            background-position: 0 -1285px;
          }
        }
        .top_text {
          float: right;
          width: 410px;
          height: 100%;
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
              background-position: 0 -243px;
              span {
                display: inline-block;
                width: 8px;
                height: 8px;
                position: absolute;
                top: 2px;
                background-size: cover;
                left: 34px;
                background: url("../../assets/img/white-r-icon@3x.png");
              }
            }
            .t_title {
              margin-left: 64px;
              h2 {
                line-height: 24px;
                font-size: 20px;
                font-weight: normal;
              }
            }
          }
          .t_u {
            margin: 0 0 20px;
            line-height: 35px;
            .u_img {
              display: inline-block;
              margin-right: 10px;
              width: 35px;
              height: 35px;
              img {
                width: 35px;
                height: 35px;
              }
            }
            .g_title:hover {
              text-decoration: underline;
            }
            .v_logo {
              width: 13px;
              height: 13px;
              margin-left: 2px;
              vertical-align: text-top;
            }
            span {
              margin-left: 15px;
              color: #999;
            }
          }
          .t_tag {
            margin: 25px 0 5px;
            line-height: 22px;
            b {
              // float: left;
              font-weight: normal;
              color: #666;
            }
            .tag_c {
              color: #666;
              display: inline-block;
              padding-right: 10px;
              height: 22px;
              margin: 0px 10px 3px 0;
              background: url("../../../public/static/button2.png") no-repeat;
              background-position: right -27px;
              span {
                display: inline-block;
                height: 22px;
                line-height: 22px;
                background: url("../../../public/static/button2.png") no-repeat;
                background-position: 0 0;
                padding: 0 3px 0 13px;
              }
            }
            .tag_c:hover {
              background-position-y: -1430px;
              span {
                background-position-y: -1400px;
              }
            }
          }
          .t_x {
            margin-top: 4px;
            line-height: 18px;
            color: #666;
          }
        }
      }
      .mains_l_bottom {
        width: 100%;
        float: left;
        margin-top: 27px;
      }
    }
    .mains_r {
      width: 268px;
      border: 1px solid #d3d3d3;
      border-width: 0 0 0 1px;
    }
  }
}
</style>