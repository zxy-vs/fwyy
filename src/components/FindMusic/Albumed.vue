<template>
  <div>
    <section class="mains">
      <div class="mains_l">
        <div class="mains_l_top">
          <div class="top_img">
            <img :src="album.picUrl" alt="" />
            <span></span>
          </div>
          <div class="top_text">
            <div class="t_t">
              <i></i>
              <div class="t_title">
                <h2>{{album.name }}</h2>
              </div>
            </div>
            <div class="t_tag">
              <b>歌手：</b>
              <span v-for="(item, index) of album.artists" :key="index">
                <!--  -->
                <router-link :to="'/artist?id='+item.id">
                  {{ item.name }}
                </router-link>
                <i v-if="album.artists.length - 1 != index">&nbsp;/&nbsp;</i>
              </span>
            </div>
            <div class="t_tag">
              <b>发行时间：</b>
              <span>{{Time(album.publishTime)}}</span>
            </div>
            <div class="t_tag" v-if="album.company">
              <b>发行公司：</b>
                <span>{{album.company}}</span>
            </div>
            <div class="t_b">
              <global-com-btn
                :quan="quan"
                :info="info"
                :subscribedCount="subscribedCount"
                @playing="Played"
              />
            </div>
          </div>
        </div>
        <div class="mains_l_center">
          <label >介绍： </label><span v-html="quan.description"></span>
        </div>
        <div class="mains_l_bottom">
           <alb-list :quan="quan" :data="data" />
        </div>
      </div>
      <div class="mains_r"></div>
    </section>
  </div>
</template>

<script>
import {reactive,toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import GlobalComBtn from "../../GlobalCom/GlobalComBtn.vue";
import { Time } from "../../untils/TimeTrans";
// import { nHbr } from "../../untils/nHbr";
import { useStore } from "vuex";
import AlbList from './Albumed/AlbList.vue';
export default {
  components: { GlobalComBtn, AlbList },
  setup() {
    const { state, dispatch, commit } = useStore();
    const {
      query: { id: id },
    } = useRoute();
    const stateL = reactive({
      quan: [],
      info:[],
      album:[],
      data: [],
      subscribedCount: 0,
      async getquan(id) {
        await axios.get("/api/album?id=" + id).then((res) => {
          this.quan = res.album;
          this.album = res.album
          this.info = res.album.info
          this.data = res.songs;
        });
      },
      async Played() {
        state.songList = stateL.data;
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
    stateL.getquan(id);
    return {
      ...toRefs(stateL),Time
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
          width: 209px;
          height: 177px;
          background: url("../../../public/static/coverall.png") no-repeat;
          background-position: 0 -986px;
          position: relative;
          margin-right: 20px;
          img {
            width: 177px;
            height: 177px;
          }
          span {
            display: block;
            width: 177px;
            height: 177px;
            position: absolute;
            top: 0px;
            left: 0px;
            background: url("../../../public/static/coverall.png") no-repeat;
            background-position: 0 -986px;
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
              background-position: 0 -186px;
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
          .t_tag {
            margin-top: 4px;
            line-height: 18px;
            b {
              font-weight: normal;
              color: #666;
            }
            a{
                color: #0c73c2;
                text-decoration: none;
            }
            a:hover{
                text-decoration: underline;
            }
            span{
                color: #666;
            }
          }
          .t_x {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-top: 4px;
            line-height: 18px;
            color: #666;
          }
          .t_b {
            margin-top: 20px;
          }
        }
      }
      .mains_l_center{
        float: left;
        width: 100%;
        max-height: 200px;
        margin-top: 20px;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
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