<template>
  <ul class="amc">
    <li v-for="(item, index) of lists" :key="index">
      <album-com :item="item" />
    </li>
  </ul>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import AlbumCom from "../FindMusic/Album/AlbumCom.vue";
import { api } from '../../untils/baseProxy';
export default {
  components: { AlbumCom },
  setup() {
    const Route = useRoute();
    const list = reactive({
      lists: [],
      async getnavList(key, type = 1) {
        await axios
          .get(`${api}/cloudsearch?keywords=${key}&type=${type}&limit=20`)
          .then((res) => {
            this.lists = res.result.albums;
          });
      },
    });
    watchEffect(() => {
      list.getnavList(Route.query.key, Route.query.type);
    });
    return {
      ...toRefs(list),
    };
  },
};
</script>

<style lang="less" scoped>
.amc {
  width: 933px;
  height: 100%;
  margin: 0 0 0 -33px;
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
</style>