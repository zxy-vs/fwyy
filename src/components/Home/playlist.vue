<template>
  <div class="pl" v-if="list.length&&data">
    <slot :data="data"></slot>
    <ul class="plList" ref="num">
      <template v-for="(item, index) of list" :key="index">
        <li v-if="item.creator.province == 440000">
          <GlobalComList :list="item" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { api } from '../../untils/baseProxy';
export default {
  setup() {
    const Route = useRoute();
    const num = ref(null);
    const pl = reactive({
      list: [],
      data: [],
      async getList(id) {
        await axios
          .get(api+"/user/playlist?limit=999&uid=" + id)
          .then((res) => {
            this.list = res.playlist;
          });
        if (num.value) {
          this.data = num.value.children.length;
        }
      },
    });

    watchEffect(() => {
      pl.getList(Route.query.id);
    });
    return {
      ...toRefs(pl),
      num,
    };
  },
};
</script>

<style lang="less" scoped>
.pl {
  width: 100%;
  height: 100%;
  .plList {
    width: 950px;
    height: 100%;
    margin: 20px 0 0 -50px;
    display: flex;
    flex-wrap: wrap;
    li {
      list-style: none;
      width: 140px;
      height: 204px;
      margin-left: 50px;
      margin-bottom: 30px;
    }
  }
}
</style>