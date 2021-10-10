<template>
  <div class="csearch">
    <div class="c_top"></div>
    <div class="c_c">
      <div class="c_search" ref="searchs">
        <input type="text" v-model="keyss" ref="clicks" />
        <router-link
          :to="`/search?type=${Route.query.type}&key=${keyss}`"
          class="btn"
        ></router-link>
        <div :class="['c_s_c', isShow ? 'c_s_n' : '']" v-show="keyss != ''">
          <p>
            <router-link :to="`/search?type=${Route.query.type}&key=${keyss}`"
              >搜“{{ keyss }}” 相关用户</router-link
            >
            >
          </p>
          <template v-if="Lists">
            <div class="item" v-for="(item, index) of Lists.order" :key="index">
              <h3>
                <i></i>
                <span>{{ listHead[item] }}</span>
              </h3>
              <ul>
                <li v-for="(items, indexs) of Lists[item]" :key="indexs">
                  <router-link :to="`/${listUrl[item]}?id=${items.id}`"
                    >{{ items.name }}
                    <span v-if="items.artists"
                      >-
                      <template
                        v-for="(itemm, indexx) of items.artists"
                        :key="indexx"
                      >
                        {{ itemm.name }}
                      </template>
                    </span></router-link
                  >
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
      <div class="remind">
        搜索“ {{ Route.query.key }} ”，找到
        <span v-if="ttype.length">{{ ttype.length }}</span> 首单曲
      </div>
      <ul class="s_nav">
        <li v-for="(item, index) of nav" :key="index">
          <router-link
            :to="`/search?type=${item.type}&key=${Route.query.key}`"
            :class="Route.query.type == item.type ? 'select' : ''"
            ><span>{{ item.name }}</span></router-link
          >
        </li>
      </ul>
      <div class="nav_Lists" v-for="(item, index) of nav" :key="index">
        <component
          :is="item.isCom"
          v-if="Route.query.type == item.type"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import songs from "../components/Csearch/songs.vue";
import song from "../components/Csearch/song.vue";
import artist from "../components/Csearch/artist.vue";
import album from "../components/Csearch/album.vue";
import mv from "../components/Csearch/mv.vue";
import djradio from "../components/Csearch/djradio.vue";
import user from "../components/Csearch/user.vue";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
export default {
  components: { songs, song, artist, album, mv, djradio, user },
  setup() {
    const Route = useRoute();
    const Router = useRouter();
    const isShow = ref(false);
    const nav = ref([
      { name: "单曲", isCom: "song", type: "1" },
      { name: "歌手", isCom: "artist", type: "100" },
      { name: "专辑", isCom: "album", type: "10" },
      { name: "视频", isCom: "mv", type: "1014" },
      { name: "歌词", isCom: "song", type: "1006" },
      { name: "歌单", isCom: "songs", type: "1000" },
      { name: "电台", isCom: "djradio", type: "1009" },
      { name: "用户", isCom: "user", type: "1002" },
    ]);
    const listHead = ref({
      songs: "单曲",
      artists: "歌手",
      albums: "专辑",
      playlists: "歌单",
    });
    const listUrl = ref({
      songs: "song",
      artists: "artist",
      albums: "album",
      playlists: "playlist",
    });
    const keyss = ref("");
    keyss.value = Route.query.key;
    const search = reactive({
      Lists: [],
      ttype: [],
      async getList(key) {
        await axios.get("/api/search/suggest?keywords=" + key).then((res) => {
          this.Lists = res.result;
        });
      },
      async getnavList(key, type = 1) {
        await axios
          .get(`/api/cloudsearch?keywords=${key}&type=${type}&limit=20`)
          .then((res) => {
            console.log(res.result);
            if (res.result.songs) {
              this.ttype = res.result.songs;
            } else if (res.result.artists) {
              this.ttype = res.result.artists;
            } else if (res.result.albums) {
              this.ttype = res.result.albums;
            } else if (res.result.videos) {
              this.ttype = res.result.videos;
            } else if (res.result.playlists) {
              this.ttype = res.result.playlists;
            } else if (res.result.djRadios) {
              this.ttype = res.result.djRadios;
            } else if (res.result.userprofiles) {
              this.ttype = res.result.userprofiles;
            }
          });
      },
    });
    const clicks = ref(null);
    const searchs = ref(null);
    const transs = (key) => {
      keyss.value = key;
    };
    onMounted(() => {
      searchs.value.onmouseleave = function () {
        document.documentElement.onclick = function () {
          isShow.value = false;
        };
      };
      searchs.value.onclick = function () {
        isShow.value = true;
        document.documentElement.onclick = null;
      };
      clicks.value.onkeydown = function (e) {
        if (e.keyCode == 13) {
          Router.push(`/search?type=1&key=${keyss.value}`);
        }
      };
    });
    watchEffect(() => {
      transs(Route.query.key);
      search.getnavList(Route.query.key, Route.query.type);
    });
    watchEffect(() => {
      search.getList(keyss.value);
    });
    return {
      nav,
      listHead,
      ...toRefs(search),
      listUrl,
      keyss,
      searchs,
      isShow,
      Route,
      clicks,
    };
  },
};
</script>

<style lang="less" scoped>
.csearch {
  .c_top {
    width: 100%;
    height: 5px;
    background-color: #c20c0c;
  }
  .c_c {
    width: 982px;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    margin: auto;
    padding: 40px;
    .c_search {
      position: relative;
      width: 420px;
      height: 40px;
      margin: 0 auto;
      z-index: 10;
      background: url("../../public/static/sprite.png") no-repeat;
      input {
        float: left;
        width: 320px;
        height: 17px;
        margin: 12px 0 0 20px;
        padding: 0;
        background: #fff;
        border: 0;
        outline: none;
      }
      .btn {
        display: block;
        float: right;
        width: 50px;
        height: 40px;
        background: url("../../public/static/sprite.png") no-repeat;
        background-position-x: -370px;
      }
      .btn:hover {
        background-position-x: -430px;
      }
      .c_s_c {
        display: none;
        position: absolute;
        top: 44px;
        left: 0;
        width: 418px;
        z-index: 120;
        left: 0;
        box-sizing: border-box;
        border: 1px solid #bebebe;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 4px 7px #555;
        text-shadow: 0 1px 0 rgb(255 255 255 / 90%);
        p {
          margin: 0;
          height: 37px;
          padding: 11px 10px;
          border-bottom: 1px solid #e2e2e2;
          a {
            color: #666;
          }
          a:hover {
            background-color: #e2e2e2;
          }
        }
        .item {
          width: 100%;
          height: 100%;
          h3 {
            margin: 0;
            float: left;
            width: 62px;
            margin-right: -100px;
            padding: 10px 0 0 10px;
            line-height: 17px;
            font-weight: normal;
            i {
              float: left;
              width: 14px;
              height: 15px;
              margin: 2px 4px 0 0;
              background: url("../../public/static/icon.png") no-repeat;
              background-position: -35px -300px;
            }
            .g {
              background-position: -50px -300px;
            }
            .z {
              background-position: -35px -320px;
            }
            .d {
              background-position: -50px -320px;
            }
            span {
              float: left;
              line-height: 17px;
            }
          }
          ul {
            margin: 0;
            margin-left: 62px;
            margin-top: -1px;
            padding: 6px 0 5px;
            border-top: 1px solid #e2e2e2;
            border-left: 1px solid #e2e2e2;
            li {
              width: 100%;
              a {
                display: block;
                width: 100%;
                color: #000;
                text-indent: 12px;
                line-height: 24px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            li:hover {
              background-color: #e2e2e2;
            }
          }
        }
        .item:nth-of-type(even) {
          ul {
            background-color: #f9f8f8;
          }
        }
      }
      .c_s_n {
        display: block;
      }
    }
    .remind {
      margin: 28px 0 17px;
      color: #999;
      span {
        color: #c20c0c;
      }
    }
    .s_nav {
      margin: 0;
      height: 39px;
      border: 1px solid #ccc;
      border-width: 0 1px;
      background: url("../../public/static/tab.png") no-repeat;
      background-position: 0 0;
      background-repeat: repeat-x;
      li {
        float: left;
        height: 39px;
        position: relative;
        a {
          float: left;
          color: #333;
          height: 39px;
          padding-left: 2px;
          background: url("../../public/static/tab.png") no-repeat;
          span {
            display: block;
            width: 110px;
            height: 39px;
            font-size: 14px;
            padding: 2px 2px 0 0;
            line-height: 37px;
            text-align: center;
            background: url("../../public/static/tab.png") no-repeat;
          }
        }
        .select {
          background-position: left -90px;
          span {
            background-position: right -90px;
          }
        }
      }
    }
    .nav_Lists {
      margin-top: 20px;
    }
  }
}
</style>