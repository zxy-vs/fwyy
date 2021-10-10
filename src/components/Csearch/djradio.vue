<template>
  <h2>声音主播</h2>
  <ul>
    <li v-for="(item, index) of lists" :key="index">
      <router-link to="" class="li_img">
        <img :src="`${item.picUrl}?param=200y200`" alt="" />
      </router-link>
      <h3>
        <router-link :to="'/djradio?id=' + item.id">{{
          item.name
        }}</router-link>
      </h3>
      <p>
        by <router-link :to="'/home?id='+item.dj.userId">{{ item.dj.nickname }}</router-link> &nbsp;<sup
          v-if="item.dj.authStatus"
        ></sup
        ><i  v-if="item.dj.gender" :class="item.dj.gender == 2 ? 'woman' : ''"></i>
      </p>
    </li>
  </ul>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  setup() {
    const Route = useRoute();
    const list = reactive({
      lists: [],
      async getnavList(key, type = 1) {
        await axios
          .get(`/api/cloudsearch?keywords=${key}&type=${type}&limit=20`)
          .then((res) => {
            this.lists = res.result.djRadios;
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
h2 {
  margin: 0;
  margin-top: 38px;
  padding-bottom: 6px;
  border-bottom: 1px solid #dadada;
  line-height: 17px;
  font-weight: bold;
}
ul {
  margin: 16px 0 0 -37px;
  display: flex;
  flex-wrap: wrap;
  li {
    margin: 0 0 40px 37px;
    width: 150px;
    .li_img {
      display: block;
      width: 150px;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h3 {
      margin: 13px 0 6px;
      line-height: 16px;
      font-size: 14px;
      font-weight: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      a {
        color: #333;
        line-height: 16px;
        font-size: 14px;
      }
    }
    p {
      line-height: 18px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0;
      a {
        color: #333;
      }
      sup {
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
        width: 12px;
        height: 13px;
        line-height: 18px;
        margin-top: 7px;
        background: url("../../../public/static/icon2.png") no-repeat;
        background-position: -110px -190px;
      }
      i {
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
        width: 14px;
        height: 15px;
        margin-left: 5px;
        margin-right: 5px;
        background: url("../../../public/static/icon.png") no-repeat;
        background-position: -70px -20px;
      }
      .woman {
        background-position: -70px 0;
      }
    }
    a:hover {
      text-decoration: underline;
    }
  }
}
</style>