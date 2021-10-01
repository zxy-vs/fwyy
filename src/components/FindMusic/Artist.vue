<template>
  <div class="Artist">
    <div class="A_l">
      <template v-for="(item, index) of Blist" :key="index">
        <div :class="index != 0 ? 'blk' : ''">
          <h2>{{ item }}</h2>
          <ul class="title">
            <li v-for="(items, indexs) of BBlist[index]" :key="indexs">
              <router-link
                :class="
                  Route.query.type == items.type &&
                  Route.query.area == items.area
                    ? 'select': ''"
                :to="`/discover/artist?type=${items.type}&area=${items.area}&initial=-1`"
                >{{ items.name }}</router-link
              >
            </li>
          </ul>
        </div>
      </template>
    </div>
    <div class="A_r">
      <template v-for="(item, index) of BBlist" :key="index">
        <template v-for="(items, indexs) of BBlist[index]" :key="indexs">
          <div
            class="BBX_title"
            v-if="
              items.type == Route.query.type && items.area == Route.query.area
            "
          >
            <h3>{{ items.name }}</h3>
          </div>
        </template>
      </template>

      <ul class="BBX_ABC" v-if="Route.query.type != -1 && Route.query.type">
        <li v-for="(item, index) of ABC" :key="index">
          <router-link
            v-if="!(index == 0 || index == ABC.length - 1)"
            :class="Route.query.initial == 64 + index ? 'bgc' : ''"
            :to="`/discover/artist?type=${Route.query.type}&area=${
              Route.query.area
            }&initial=${64 + index}`"
            >{{ item }}</router-link
          >
          <router-link
            v-if="index == 0"
            :class="['ch', Route.query.initial == -1 ? 'bgc' : '']"
            :to="`/discover/artist?type=${Route.query.type}&area=${Route.query.area}&initial=-1`"
            >{{ item }}</router-link
          >
          <router-link
            v-if="index == ABC.length - 1"
            :class="['ch', Route.query.initial == 0 ? 'bgc' : '']"
            :to="`/discover/artist?type=${Route.query.type}&area=${Route.query.area}&initial=0`"
            >{{ item }}</router-link
          >
        </li>
      </ul>
      <BBX :GList="GList" />
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import BBX from "./Artist/BBX.vue";
export default {
  components: { BBX },
  setup() {
    const Route = useRoute();
    const Router = useRouter();
    Router.replace('/discover/artist?type=-1&area=-1&initial=-1')
    const Blist = ref(["推荐", "华语", "欧美", "日本", "韩国", "其他"]);
    const BBlist = ref([
      [
        { name: "推荐歌手", type: -1, area: -1 },
        // { name: "入驻歌手", type: -1, area: -1 },
      ],
      [
        { name: "华语男歌手", type: 1, area: 7 },
        { name: "华语女歌手", type: 2, area: 7 },
        { name: "华语组合/乐队", type: 3, area: 7 },
      ],
      [
        { name: "欧美男歌手", type: 1, area: 96 },
        { name: "欧美女歌手", type: 2, area: 96 },
        { name: "欧美组合/乐队", type: 3, area: 96 },
      ],
      [
        { name: "日本男歌手", type: 1, area: 8 },
        { name: "日本女歌手", type: 2, area: 8 },
        { name: "日本组合/乐队", type: 3, area: 8 },
      ],
      [
        { name: "韩国男歌手", type: 1, area: 16 },
        { name: "韩国女歌手", type: 2, area: 16 },
        { name: "韩国组合/乐队", type: 3, area: 16 },
      ],
      [
        { name: "其他男歌手", type: 1, area: 0 },
        { name: "其他女歌手", type: 2, area: 0 },
        { name: "其他组合/乐队", type: 3, area: 0 },
      ],
    ]);
    const BBXS = reactive({
      GList: [],
      async getGList(type = -1, area = -1, initial = -1) {
        await axios
          .get(
            `/api/artist/list?type=${type}&area=${area}&initial=${initial}&limit=100`
          )
          .then((res) => {
            this.GList = res.artists;
          });
      },
    });
    const ABC = ref([
      "热门",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "其他",
    ]);
    watchEffect(() => {
      BBXS.getGList(Route.query.type, Route.query.area, Route.query.initial);
    });
    return {
      Blist,
      BBlist,
      ...toRefs(BBXS),
      Route,
      ABC,
    };
  },
};
</script>

<style lang="less" scoped>
.Artist {
  width: 982px;
  height: 100%;
  border: 1px solid #d3d3d3;
  margin: auto;
  border-width: 0 1px;
  display: flex;
  .A_l {
    width: 180px;
    padding: 51px 10px 40px;
    background-color: #f9f9f9;

    h2 {
      height: 25px;
      padding-left: 14px;
      font-size: 16px;
      line-height: 21px;
      font-weight: bold;
      font-family: "Microsoft Yahei";
      margin: 0;
    }
    .title {
      width: 100%;
      margin: 0;
      li {
        width: 160px;
        height: 29px;
        line-height: 29px;
        margin-bottom: 2px;
        a {
          display: block;
          width: 160px;
          height: 100%;
          padding-left: 27px;
          background: url("../../../public/static/singer.png") no-repeat;
          background-position: 0 -30px;
          color: #333;
        }
        a:hover {
          text-decoration: underline;
        }
        .select {
          color: #c20c0c;
          background-position: 0 0px;
        }
        .select:hover {
          text-decoration: none;
        }
      }
    }
    .blk {
      margin: 5px 0 0;
      padding-top: 16px;
      border-top: 1px solid #d3d3d3;
    }
  }
  .A_r {
    width: 799px;
    padding: 40px;
    border-left: 1px solid #d3d3d3;
    background-color: #fff;
    .BBX_title {
      height: 40px;
      border-bottom: 2px solid #c20c0c;
      h3 {
        padding: 0;
        margin: 0;
        float: left;
        font-size: 24px;
        line-height: 28px;
        font-weight: normal;
        font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
      }
    }
    .BBX_ABC {
      margin: 0;
      margin-top: 20px;
      width: 721px;
      height: 24px;
      margin-left: -3px;
      li {
        float: left;
        margin-left: 3px;
        font-size: 14px;
        a {
          display: block;
          min-width: 21px;
          line-height: 24px;
          text-align: center;
          color: #333;
          white-space: nowrap;
        }
        a:hover {
          text-decoration: underline;
        }
        .bgc {
          background: #c20c0c;
          border-radius: 2px;
          color: #fff;
        }
        .ch {
          width: 45px;
          height: 24px;
        }
      }
    }
  }
}
</style>