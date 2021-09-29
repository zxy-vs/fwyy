<template>
  <div class="album">
    <h3>
      <div class="A_title">热门新碟</div>
    </h3>
    <ul class="amc">
      <li v-for="(item, index) of lbtList" :key="index">
        <album-com :item="item" />
      </li>
    </ul>
    <h3>
      <div class="A_title">全部新碟</div>
      <ul class="a_title">
        <li v-for="(item, index) of TL" :key="index">
          <router-link :to="item.url">{{ item.name }}</router-link>
          <span class="line" v-if="!(index == TL.length - 1)">|</span>
        </li>
      </ul>
    </h3>
    <ul class="amc">
      <li v-for="(item, index) of quanList" :key="index">
        <album-com :item="item" />
      </li>
    </ul>
     <div class="a_pag">
      <a-pagination v-model:current="offset" :total="total" />
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import AlbumCom from "./Album/AlbumCom.vue";
import { watchEffect } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
export default {
  components: { AlbumCom },
  setup() {
      const Route = useRoute()
    const lbt = reactive({
      lbtList: [],
      quanList: [],
      offset:1,
      total:0,
      async getlbt() {
        await axios.get("/api/album/newest").then((res) => {
          this.lbtList = res.albums;
          this.lbtList.length = 10;
        });
      },
      async getquanList(offset,area='ALL') {
        await axios.get(`/api/album/new?offset=${(offset-1)*35}&limit=35&area=${area}`).then(res=>{
            this.quanList = res.albums
            this.total = Math.ceil(res.total/35)*10
        })
      },
    });
    lbt.getlbt();
    
    const TL = ref([
      { name: "全部", url: "/discover/album?area=ALL" },
      { name: "华语", url: "/discover/album?area=ZH" },
      { name: "欧美", url: "/discover/album?area=EA" },
      { name: "韩国", url: "/discover/album?area=KR" },
      { name: "日本", url: "/discover/album?area=JP" },
    ]);
    watchEffect(()=>{
        lbt.getquanList(lbt.offset,Route.query.area)
    })
    return {
      ...toRefs(lbt),
      TL,
    };
  },
};
</script>

<style lang="less" scoped>
.album {
  width: 982px;
  padding: 40px;
  margin: auto;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  background-color: #fff;
  line-height: 1.4;
  h3 {
    width: 100%;
    float: left;
    height: 42px;
    padding-top: 5px;
    padding-bottom: 11px;
    border-bottom: 2px solid #c20c0c;
    margin: 0;
    line-height: 24px;
    .A_title {
      float: left;
      font-size: 24px;
      font-weight: normal;
    }
    .a_title {
      float: left;
      margin: 5px 0 0 20px;
      height: 16px;
      li {
        float: left;
        height: 100%;
        a {
          color: #666;
        }
        a:hover {
          text-decoration: underline;
        }
        .line {
          margin: 0 10px;
          color: #c7c7c7;
        }
      }
    }
  }
  .amc {
    width: 950px;
    height: 100%;
    margin: 62px 0 0 -33px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 153px;
      height: 178px;
      overflow: hidden;
      margin: 0 0 30px 33px;
      line-height: 1.4;
    }
  }
  .a_pag{
      margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>