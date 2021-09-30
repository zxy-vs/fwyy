<template>
  <div class="Artisted">
    <div class="A_l">
      <div class="l_title">
        <h3>{{ GSList.name }}</h3>
        <img :src="`${GSList.picUrl}?param=640y300`" alt="" />
        <div class="img"></div>
        <router-link to="#" class="l_cc"></router-link>
        <router-link to="#" class="l_ss"></router-link>
      </div>
      <ul class="l_nav">
        <li v-for="(item, index) of name" :key="index">
          <span
            @click="isShow = index"
            :class="index == isShow ? 'selects' : ''"
            >{{ item }}</span
          >
        </li>
      </ul>
      <keep-alive>
        <component
          :is="is[isShow]"
          :RList="RList"
          :GSList="GSList"
          :Desc="Desc"
          :Album='Album'
          :Mv='Mv'
        ></component>
      </keep-alive>
    </div>
    <div class="A_r"></div>
  </div>
</template>
<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import R from "./Artisted/R.vue";
import S from "./Artisted/S.vue";
import X from "./Artisted/X.vue";
import Y from "./Artisted/Y.vue";
import { useRoute } from "vue-router";
import { watchEffect } from "@vue/runtime-core";
export default {
  components: { R, S, X, Y },
  setup() {
    const Route = useRoute();
    const nav = reactive({
      name: ["热门作品", "所有专辑", "相关MV", "艺人介绍"],
      is: ["R", "S", "X", "Y"],
      isShow: 0,
    });
    const GS = reactive({
      GSList: [],
      RList: [],
      Desc: [],
      Album: [],
      Mv:[],
      async getGSList(id) {
        await axios.get("/api/artists?id=" + id).then((res) => {
          this.GSList = res.artist;
          this.RList = res.hotSongs;
        });
      },
      async getDesc(id) {
        await axios.get("/api/artist/desc?id=" + id).then((res) => {
          this.Desc = res;
        });
      },
      async getAlbum(id) {
        await axios.get("/api/artist/album?limit=999&id=" + id).then((res) => {
          this.Album = res.hotAlbums;
        });
      },
      async getMv(id) {
        await axios.get("/api/artist/mv?id=" + id).then((res) => {
          this.Mv = res.mvs;
        });
      },
    });
    watchEffect(() => {
      if (Route.path == "/artist") {
        GS.getGSList(Route.query.id);
        GS.getDesc(Route.query.id);
        GS.getAlbum(Route.query.id);
        GS.getMv(Route.query.id);
      }
    });
    return {
      ...toRefs(nav),
      ...toRefs(GS),
    };
  },
};
</script>

<style lang="less" scoped>
.Artisted {
  width: 982px;
  margin: auto;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  .A_l {
    width: 710px;
    height: 100%;
    border-right: 1px solid #d3d3d3;
    padding: 47px 30px 40px 39px;
    .l_title {
      width: 100%;
      height: 100%;
      margin-top: -20px;
      position: relative;
      h3 {
        height: 34px;
        line-height: 24px;
        font-weight: normal;
        font-size: 24px;
        color: #333;
        margin: 0;
      }
      img {
        display: block;
        width: 640px;
        height: 300px;
      }
      .img {
        position: absolute;
        width: 640px;
        height: 300px;
        top: 34px;
        left: 0;
        background: url("../../../public/static/ban_mask.png") no-repeat;
      }
      .l_cc {
        display: block;
        position: absolute;
        bottom: 19px;
        right: 115px;
        width: 96px;
        height: 32px;
        background: url("../../../public/static/iconall.png") no-repeat;
        background-position: 0 -1156px;
      }
      .l_cc:hover {
        background-position-y: -1196px;
      }
      .l_ss {
        display: block;
        position: absolute;
        bottom: 19px;
        right: 19px;
        width: 76px;
        height: 32px;
        background: url("../../../public/static/iconall.png") no-repeat;
        background-position: 0 -500px;
      }
      .l_ss:hover {
        background-position-y: -540px;
      }
    }
    .l_nav {
      margin-top: -1px;
      width: 640px;
      height: 39px;
      border: 1px solid #ccc;
      border-width: 0 1px;
      background: url("../../../public/static/tab.png") no-repeat;
      background-position: 0 0;
      background-repeat: repeat-x;
      li {
        float: left;
        height: 39px;
        font-size: 14px;
        position: relative;
        span {
          float: left;
          display: block;
          width: 134px;
          height: 37px;
          font-size: 14px;
          padding: 2px 2px 0 2px;
          margin-top: 1px;
          line-height: 37px;
          cursor: pointer;
          text-align: center;
          color: #333;
          background: url("../../../public/static/tab.png") no-repeat;
        }
        span:hover {
          background-position: right -45px;
        }
        .selects {
          height: 38px;
          border-left: 1px solid #ccc;
          background-position: right -90px;
        }
        .selects:hover {
          background-position: right -90px;
        }
      }
    }
  }
}
</style>