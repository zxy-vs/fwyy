<template>
  <div class="new">
    <GlobalComHeader :head="headList" />
    <div class="n_banner">
      <div class="n_b">
        <ul class="n_b_c" ref="content">
          <li v-for="(item, index) of lbtList" :key="index">
            <div class="n_b_s">
              <img v-lazy="item.picUrl" alt="" />
              <router-link
                :to="'/album?id=' + item.id"
                class="n_s"
              ></router-link>
              <a href="javascript:;" class="n_p" @click="Play(item.id)"></a>
            </div>
            <p class="n_b_x">
              <router-link :to="'/album?id=' + item.id" class="n_w">{{
                item.name
              }}</router-link>
            </p>
            <p class="n_b_x">
              <span v-for="(items, index) of item.artists" :key="index">
                <router-link :to="'/artist?id=' + item.artist.id"
                  >{{ items.name }}
                </router-link>
                <i v-if="item.artists.length - 1 != index">&nbsp;/&nbsp;</i>
              </span>
            </p>
          </li>
        </ul>
      </div>

      <span class="an n_b_l" ref="left"></span>
      <span class="an n_b_r" ref="right"></span>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { api } from "../../../untils/baseProxy";
import { useStore } from "vuex";
export default {
  setup() {
    const { state, commit, dispatch } = useStore();
    const headList = ref({
      title: "新碟上架",
      titleUrl: "/discover/album",
      moreUrl: "/discover/album",
    });
    let Play = async (id) => {
      await axios.get(api + "/album?id=" + id).then(async (res) => {
            state.songListIndex = 0;
            state.songList = res.songs;
            state.ids = res.songs[state.songListIndex].id;
            await dispatch("getAudios", res.songs[state.songListIndex].id);
            await dispatch("getPlayText", res.songs[state.songListIndex].id);
            commit("isSetPlay");
            const ao = document.querySelector("audio");
            if (ao.played) {
              ao.load();
              ao.play();
            } else {
              ao.play();
            }
          });
    };
    const lbt = reactive({
      lbtList: [],
      async getlbt() {
        await axios.get(api + "/album/newest").then((res) => {
          this.lbtList = res.albums;
          this.lbtList.length = 10;
        });
      },
    });
    lbt.getlbt();
    const left = ref(null);
    const right = ref(null);
    const content = ref(null);
    onMounted(() => {
      let ul = content.value;
      let num = 0;
      right.value.onclick = function () {
        if (ul.offsetLeft <= -1) {
          right.value.onclick = null;
        } else {
          num++;
          animation(ul, (-num * ul.offsetWidth) / 2 + 16);
        }
      };
      left.value.onclick = function () {
        if (ul.offsetLeft >= 0) {
          left.value.onclick = null;
        } else {
          num--;
          animation(ul, (-num * ul.offsetWidth) / 2 + 4);
        }
      };
    });
    function animation(obj, end) {
      clearInterval(obj.time);
      obj.time = setInterval(() => {
        let step = (end - obj.offsetLeft) / 10;
        step > 0 ? Math.ceil(step) : Math.floor(step);
        if (end == obj.offsetLeft) {
          obj.style.left = end + "px";
          clearInterval(obj.time);
        } else {
          obj.style.left = obj.offsetLeft + step + "px";
        }
      }, 1000 / 60);
    }
    return {
      headList,
      ...toRefs(lbt),
      left,
      right,
      content,
      Play,
    };
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.new {
  width: 100%;
  height: 243px;
  overflow: hidden;
  .n_banner {
    margin-top: 20px;
    width: 100%;
    height: 184px;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;
    position: relative;
    .n_b {
      width: 100%;
      height: 184px;
      overflow: hidden;
      .n_b_c {
        padding: 0 16px;

        width: 1332px;
        height: 150px;
        margin-top: 28px;
        position: absolute;
        top: 0;
        left: 0;
        li {
          float: left;
          list-style: none;
          float: left;
          width: 118px;
          height: 150px;
          margin-left: 11px;
          background: url("../../../../public/static/index.png") no-repeat;
          background-position: -260px 100px;
          .n_b_s {
            width: 107px;
            height: 100px;
            margin-bottom: 7px;
            position: relative;
            img {
              width: 100px;
              height: 100px;
              position: absolute;
            }
            .n_s {
              position: absolute;
              display: block;
              text-decoration: none;
              width: 118px;
              height: 100px;
              background: url("../../../../public/static/coverall.png")
                no-repeat;
              background-position: 0 -570px;
            }
            .n_s:hover + .n_p {
              opacity: 1;
            }
            .n_p {
              z-index: 1;
              display: block;
              opacity: 0;
              position: absolute;
              right: 12px;
              bottom: 4px;
              width: 26px;
              height: 26px;
              background: url("../../../../public/static/iconall.png");
              background-position: -42px -22px;
            }
            .n_p:hover {
              opacity: 1;
              background-position: -42px -52px;
            }
          }
          .n_b_x {
            width: 90%;
            line-height: 18px;
            height: 18px;
            display: flex;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            a {
              float: left;
              display: inline;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              color: #666;
              text-decoration: none;
            }
            .n_w {
              color: #000;
              float: left;
              width: 100%;
              height: 100%;
              display: block;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              color: #000;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    .an {
      display: inline-block;
      border-bottom: 1px solid #d3d3d3;
      position: absolute;
      top: 0;
      background: #f5f5f5 url("../../../../public/static/index.png") no-repeat;
      background-size: 580px 800px;
      width: 17px;
      height: 183px;
      cursor: pointer;
    }
    .n_b_l {
      border-left: 1px solid #d3d3d3;
      left: -1px;
      background-position: -370px -56px;
    }
    .n_b_l:hover {
      background-position: -398px -56px;
    }
    .n_b_r {
      border-right: 1px solid #d3d3d3;
      right: -1px;
      background-position: -426px -56px;
    }
    .n_b_r:hover {
      background-position: -454px -56px;
    }
  }
}
</style>