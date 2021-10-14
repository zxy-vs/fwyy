<template>
  <div class="rec">
    <GlobalComHeader :head="headList" />
    <ul v-if="list.length" class="recList">
        <li v-for="(item, index) of list" :key="index">
          <GlobalComList :list="item" />
        </li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { api } from '../../../untils/baseProxy';
export default {
  setup() {
    const headList = ref({
      title: "热门推荐",
      list: ["华语", "流行", "摇滚", "民谣", "电子"],
      titleUrl: "/discover/playlist",
      listUrl: [
        "/discover/playlist/?cat=华语&order=hot",
        "/discover/playlist/?cat=流行&order=hot",
        "/discover/playlist/?cat=摇滚&order=hot",
        "/discover/playlist/?cat=民谣&order=hot",
        "/discover/playlist/?cat=电子&order=hot",
      ],
      moreUrl: "/discover/playlist",
    });
    const contentList = reactive({
      list: [],
      async getlist() {
        await axios.get(api+"/personalized").then((res) => {
          this.list = res.result;
          this.list.length = 8
        });
      },
    });
    contentList.getlist();
    return {
      headList,
      ...toRefs(contentList),
    };
  },
};
</script>

<style lang="less" scoped>
.rec {
  width: 100%;
  .recList {
    margin: 20px 0 0 -42px;
    li {
      float: left;
      list-style: none;
      width: 140px;
      height: 204px;
      margin-left: 42px;
      margin-bottom: 30px;
    }
  }
}
</style>