<template>
  <div>
    <div class="s_nav_bgc">
      <div class="find">
        <ul class="s_nav">
          <li v-for="(item, index) of list" :key="index">
            <router-link :to="item.path"
              ><em>{{ item.title }}</em></router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { provide, reactive } from "vue";
export default {
  setup() {
    const list = reactive([
      { path: "/discover", title: "推荐" },
      { path: "/discover/toplist", title: "排行榜" },
      { path: "/discover/playlist", title: "歌单" },
      { path: "/discover/djradio", title: "主播电台" },
      { path: "/discover/artist", title: "歌手" },
      { path: "/discover/album", title: "新碟上架" },
    ]);
    return {
      list,
    };
  },
};
</script>

<style lang="less" scoped>
.s_nav_bgc {
  width: 100%;
  height: 100%;
  background-color: #c20c0c;
  margin-top:-12px;//有问题
  .find {
    width: 1100px;
    height: 34px;
    margin: auto;
    .s_nav {
      padding-left: 180px;
      li {
        float: left;
        list-style: none;
        a {
          text-decoration: none;
          color: #fff;
          em {
            display: inline-block;
            height: 20px;
            margin: 7px 17px 0;
            padding: 0 13px;
            font-style: normal;
            text-align: left;
            font-size: 12px;
            line-height: 20px;
          }
          &.router-link-active {
            em {
              background-color: #9b0909;
              border-radius: 20px;
            }
          }
        }
      }
    }
  }
}
</style>