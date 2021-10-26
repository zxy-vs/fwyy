<template>
  <div class="Rm">
    <h3>
      <span>喜欢这个歌单的人</span>
    </h3>
    <ul class="Rm_img">
      <li v-for="(item, index) of list" :key="index">
        <router-link :to="'/home?id=' + item.userId">
          <img :src="`${item.avatarUrl}?param=40y40`" alt="" />
        </router-link>
      </li>
    </ul>
    <h3>
      <span>热门歌单</span>
    </h3>
    <ul class="Rm_list">
      <li v-for="(item, index) of Lists" :key="index">
        <div class="L_img">
          <router-link :to="'/playlist?id=' + item.id">
            <img :src="`${item.coverImgUrl}?param=50y50`" alt="" />
          </router-link>
        </div>
        <div class="L_txt">
          <p>
            <router-link :to="'/playlist?id=' + item.id" class="tit">{{
              item.name
            }}</router-link>
          </p>
          <p>
            by
            <router-link :to="'/home?id=' + item.creator.userId" class="name">{{
              item.creator.nickname
            }}</router-link>
          </p>
        </div>
      </li>
    </ul>
    <h3>
      <span>网易云音乐多端下载</span>
    </h3>
    <ul class="Rm_load"></ul>
    <p class="Rm_loads">同步歌单，随时畅听320k好音乐</p>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  setup() {
    const Route = useRoute();
    const Rm = reactive({
      list: [],
      Lists: [],
      async getList(id) {
        await axios
          .get(`/api/playlist/subscribers?id=${id}&limit=8`)
          .then((res) => {
            this.list = res.subscribers;
          });
      },
      async getLists(id) {
        await axios.get(`/api/related/playlist?id=` + id).then((res) => {
          this.Lists = res.playlists;
        });
      },
    });
    watchEffect(() => {
      Rm.getList(Route.query.id);
      Rm.getLists(Route.query.id);
    });
    return {
      ...toRefs(Rm),
    };
  },
};
</script>

<style lang="less" scoped>
.Rm {
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
  .Rm_img {
    margin-left: -13px;
    padding-bottom: 25px;
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 0 0 13px 13px;
      width: 52px;
      height: 53px;
      a {
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  .Rm_list {
    margin-bottom: 25px;
    li {
      float: left;
      width: 200px;
      height: 50px;
      margin-bottom: 15px;
      line-height: 24px;
      .L_img {
        float: left;
        width: 50px;
        height: 50px;
      }
      .L_txt {
        margin-left: 60px;
        line-height: 24px;
        p {
          margin: 0;
          width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          color: #999;
          .tit {
            color: #000;
          }
          .name {
            // float: left;
            max-width: 106px;
            margin: 0 2px 0 4px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }
          a:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .Rm_list::after {
    clear: both;
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
  }
  .Rm_load {
    height: 65px;
    margin-bottom: 10px;
    background: url("../../public/static/sprite.png") no-repeat;
    background-position: 0 -392px;
  }
  .Rm_loads {
    color: #999;
  }
}
</style>