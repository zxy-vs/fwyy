<template>
  <div class="From">
    <GlobalComHeader :head="headList" />
    <div class="Fromcontent">
      <dl v-for="(item, index) of contentList" :key="index">
        <dt>
          <div class="FromImg">
            <img v-lazy="`${item.coverImgUrl}?param=100y100`" alt="" />
            <router-link :to="'/discover/toplist?id=' + item.id"></router-link>
          </div>
          <div class="FromLink">
            <router-link
              :to="'/discover/toplist?id=' + item.id"
              class="FromName"
              ><h3>{{ item.name }}</h3></router-link
            >
            <a
              href="javascript:;"
              class="FromPlay play"
              @click="Play(item.id)"
            ></a>
            <router-link to="#" class="FromPlay bgp"></router-link>
          </div>
        </dt>
        <dd>
          <ol class="FromOl" v-if="cList.length">
            <li
              class="FromLi"
              v-for="(item, index) of cList[index]"
              :key="index"
            >
              <span :style="index <= 3 ? 'color:#c10d0c' : ''">{{
                index + 1
              }}</span>
              <router-link :to="'/song?id=' + item.id"
                >{{ item.name }}
              </router-link>

              <div class="FromY">
                <a href="javascript:;" class="FromYPlay" @click="PLay(item.id)"></a>
                <a href="javascript:;" class="FromYPlay Add"></a>
                <a href="javascript:;" class="FromYPlay bgp"></a>
              </div>
            </li>
          </ol>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { api } from "../../../untils/baseProxy";
import { useStore } from 'vuex';
export default {
  setup() {
    const {state,commit,dispatch} = useStore()
    const headList = ref({
      title: "榜单",
      titleUrl: "/discover/toplist",
      moreUrl: "/discover/toplist",
    });
    let Play = async (id) => {
      await axios.get(api+"/playlist/detail?id=" + id).then(async (res) => {
        state.songListIndex = 0;
        state.songList = res.privileges;
        state.ids = res.privileges[state.songListIndex].id;
        await dispatch("getAudios", res.privileges[state.songListIndex].id);
        await dispatch("getPlayText", res.privileges[state.songListIndex].id);
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
    const ao = document.querySelector('audio')
     const PLay = async (id) => {
      state.ids = id;
      await dispatch("getAudios", state.ids);
      await dispatch("getPlayText", state.ids);
      clearInterval(state.tst);
      const pg = document.querySelector(".c_cur");
      state.tst = setInterval(() => {
        pg.style.width =
          (100 / parseInt(state.time / 1000)) * state.currentTime + "%";
      }, 1000 / 60);
      state.isPlay = true;
      if (ao.played) {
        ao.load();
        ao.play();
      } else {
        ao.play();
      }
    };
    const content = reactive({
      contentList: [],
      cList: [],
      async getContentList() {
        await axios.get(api + "/toplist").then((res) => {
          this.contentList = res.list;
          this.contentList.length = 3;
        });
        for (let i = 0; i < this.contentList.length; i++) {
          await axios
            .get(api + "/playlist/detail?id=" + this.contentList[i].id)
            .then((res) => {
              this.cList[i] = res.playlist.tracks;
              this.cList[i].length = 10;
            });
        }
      },
    });
    content.getContentList();
    return {
      headList,
      ...toRefs(content),
      Play,PLay
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
.From {
  margin-top: 30px;
  width: 100%;
  .Fromcontent {
    margin-top: 20px;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;
    border-left: 0px;
    display: flex;
    dl {
      width: 230px;
      height: 100%;
      border-left: 1px solid #d3d3d3;
      dt {
        width: 100%;
        height: 120px;
        padding: 20px 0 0 19px;
        display: flex;
        background: url("../../../../public/static/index.png") no-repeat;
        background-size: 334px 400px;
        background-position: -192px 100px;
        .FromImg {
          width: 80px;
          height: 80px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
          a {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: url("../../../../public/static/coverall.png");
            background-position: -145px -57px;
          }
        }
        .FromLink {
          width: 116px;
          margin: 6px 0 0 10px;
          .FromName {
            color: #000;
            h3 {
              font-size: 14px;
              font-weight: bold;
            }
          }
          .FromName:hover {
            text-decoration: underline;
          }
          .FromPlay {
            margin-top: 10px;
            display: block;
            float: left;
            width: 22px;
            height: 22px;
            margin-right: 10px;
            background: url("../../../../public/static/index.png") no-repeat;
            background-position: -267px -205px;
          }
          .FromPlay:hover {
            background-position-y: -235px;
          }
          .bgp {
            background-position: -300px -205px;
          }
          .bgp:hover {
            background-position-y: -235px;
          }
        }
      }
      dd {
        .FromOl {
          width: 100%;
          .FromLi {
            width: 100%;
            height: 32px;
            list-style: none;
            line-height: 32px;
            position: relative;

            span {
              display: block;
              float: left;
              width: 35px;
              height: 32px;
              margin-left: 23px;
              text-align: center;
              font-size: 16px;
            }
            a {
              display: block;
              float: left;
              width: 167px;
              height: 32px;
              color: #000;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            a:hover {
              text-decoration: underline;
            }
            .FromY {
              display: none;
              position: absolute;
              top: 0;
              right: 0;
              width: 86px;
              height: 100%;
              background-color: #f5f5f5;
              .FromYPlay {
                margin-top: 5px;
                display: block;
                float: left;
                width: 22px;
                height: 22px;
                margin-right: 5px;
                background: url("../../../../public/static/index.png") no-repeat;
                background-position: -267px -205px;
              }
              .FromYPlay:hover {
                background-position-y: -235px;
              }
              .bgp {
                background-position: -300px -205px;
              }
              .bgp:hover {
                background-position-y: -235px;
              }
              .Add {
                background: url("../../../../public/static/icon.png") no-repeat;
                background-position: 4px -695px;
              }
              .Add:hover {
                background-position: -18px -695px;
              }
            }
          }
          .FromLi:nth-of-type(2n + 1) {
            background: #e8e8e8;
            .FromY {
              background-color: #e8e8e8;
            }
          }
          .FromLi:hover .FromY {
            display: block;
          }
        }
      }
    }
  }
}
</style>