<template>
  <div class="Artisted">
    <div class="A_l">
      <div class="l_title">
        <h3>{{ GSList.name }}</h3>
        <img :src="`${GSList.picUrl}?param=640y300`" alt="" />
        <div class="img"></div>
        <router-link
          v-if="GSList.accountId"
          :to="'/home?id=' + GSList.accountId"
          class="l_cc"
        ></router-link>
        <a href="javascript:;" class="l_ss"></a>
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
          :Album="Album"
          :Mv="Mv"
        ></component>
      </keep-alive>
    </div>
    <div class="A_r">
      <h3>
        <span>热门歌手</span>
      </h3>
      <ul class="A_img">
        <li v-for="item,index of AImg" :key="index">
          <router-link :to="'/artist?id='+item.id">
            <img
              :src="`${item.picUrl}?param=50y50`"
              alt=""
            />
          </router-link>
          <p>
            <router-link :to="'/artist?id='+item.id">{{item.name}}</router-link>
          </p>
        </li>
      </ul>
      <h3>
        <span>网易云音乐多端下载</span>
      </h3>
      <ul class="Rm_load"></ul>
      <p class="Rm_loads">同步歌单，随时畅听320k好音乐</p>
    </div>
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
import { api } from "../../untils/baseProxy";
import { useStore } from 'vuex';
export default {
  components: { R, S, X, Y },
  setup() {
    const Route = useRoute();
    const {state} = useStore()
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
      Mv: [],
      AImg: [],
      async getImg(id) {
        await axios.get(api + "/simi/artist?id=" + id).then((res) => {
          console.log(res);
          this.AImg = res.artists
          this.AImg.length =6
        });
      },
      async getGSList(id) {
        await axios.get(api + "/artists?id=" + id).then((res) => {
          this.GSList = res.artist;
          document.title = res.artist.name+' - 歌手 - 网易云音乐'
          state.title = res.artist.name+' - 歌手 - 网易云音乐'
          this.RList = res.hotSongs;
        });
      },
      async getDesc(id) {
        await axios.get(api + "/artist/desc?id=" + id).then((res) => {
          this.Desc = res;
        });
      },
      async getAlbum(id) {
        await axios
          .get(api + "/artist/album?limit=999&id=" + id)
          .then((res) => {
            this.Album = res.hotAlbums;
          });
      },
      async getMv(id) {
        await axios.get(api + "/artist/mv?id=" + id).then((res) => {
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
        GS.getImg(Route.query.id);
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
  display: flex;
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
  .A_r {
    width: 270px;
    padding: 20px 40px 40px 30px;
    h3 {
      width: 100%;
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
      span {
        font-weight: bold;
      }
    }
    .A_img {
      margin-left: -25px;
      li {
        float: left;
        width: 75px;
        height: 92px;
        padding-left: 25px;
        .img {
          display: block;
          width: 50px;
          height: 50px;
          img {
            width: 50px;
            height: 50px;
          }
        }
        p {
          margin: 0;
          margin-top: 7px;
          text-align: center;
          a {
            width: 50px;
            vertical-align: middle;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          a:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .A_img::after {
      clear: both;
      content: ".";
      display: block;
      height: 0;
      visibility: hidden;
    }
    .Rm_load {
      height: 65px;
      margin-bottom: 10px;
      background: url("../../../public/static/sprite.png") no-repeat;
      background-position: 0 -392px;
    }
    .Rm_loads {
      color: #999;
    }
  }
}
</style>