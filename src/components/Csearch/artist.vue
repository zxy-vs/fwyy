<template>
    <ul class="BBX_show">
    <template v-for="(item, index) of lists" :key="index">
      <li>
        <div class="BBX_img">
          <img :src="`${item.picUrl}?param=130y130`" alt="" />
          <router-link :to="'/artist?id=' + item.id"></router-link>
        </div>
        <p>
          <router-link :to="'/artist?id=' + item.id">{{
            item.name
          }}</router-link>
          <router-link
            :to="'/home?id='+item.accountId"
            :class="['icon', index >= 10 ? 'icon1' : '']"
          ></router-link>
        </p>
      </li>
    </template>
  </ul>
</template>
<script>
import { reactive, toRefs } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { api } from '../../untils/baseProxy';
export default {
  setup() {
    const Route = useRoute();
    const list = reactive({
      lists: [],
      async getnavList(key, type = 1) {
        await axios
          .get(`${api}/cloudsearch?keywords=${key}&type=${type}&limit=20`)
          .then((res) => {
            this.lists = res.result.artists;
          });
      },
    });
    watchEffect(() => {
      list.getnavList(Route.query.key,Route.query.type);
    });
    return {
      ...toRefs(list),
    };
  },
};
</script>


<style lang="less" scoped>
.BBX_show {
  margin: 20px 0 0 -17px;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 147px;
    height: 184px;
    overflow: hidden;
    padding: 0 0 30px 17px;
    line-height: 1.4;
    .BBX_img {
      position: relative;
      width: 130px;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
      }
      a {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("../../../public/static/coverall.png") no-repeat;
        background-position: 0 -680px;
      }
    }
    p {
      width: 100%;
      margin-top: 8px;
      a {
        color: #000;
        vertical-align: middle;
        float: left;
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
      a:hover {
        text-decoration: underline;
      }
      .icon {
        float: right;
        display: block;
        width: 17px;
        height: 18px;
        background: url("../../../public/static/icon.png") no-repeat;
        background-position: 0 -740px;
      }
      .icon1 {
        float: left;
        margin: 4px 0 0 2px;
      }
    }
  }
}
</style>