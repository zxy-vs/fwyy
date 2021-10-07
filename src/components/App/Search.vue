<template>
  <p>
    <router-link to="">搜“{{ keys }}” 相关用户</router-link> >
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
              <template v-for="(itemm, indexx) of items.artists" :key="indexx">
                {{ itemm.name }}
              </template>
            </span></router-link
          >
        </li>
      </ul>
    </div>
  </template>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  props: ["keys"],
  setup(props) {
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
    const search = reactive({
      Lists: [],
      async getList(key) {
        await axios.get("/api/search/suggest?keywords=" + key).then((res) => {
          this.Lists = res.result;
        });
      },
    });
    watch(
      () => props.keys,
      () => {
        search.getList(props.keys);
      }
    );
    return {
      listHead,
      ...toRefs(search),listUrl
    };
  },
};
</script>

<style lang="less" scoped>
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
    // border-right: 1px solid #e2e2e2;
    line-height: 17px;
    font-weight: normal;
    i {
      float: left;
      width: 14px;
      height: 15px;
      margin: 2px 4px 0 0;
      background: url("../../../public/static/icon.png") no-repeat;
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
</style>