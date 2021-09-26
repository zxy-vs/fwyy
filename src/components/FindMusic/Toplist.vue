<template>
  <div class="toplist">
    <div class="tl_l">
      <h2>云音乐特色榜</h2>
      <ul v-if="lList.length">
        <template v-for="(item, index) of lList" :key="index">
          <h2 v-if="index == 4"><span>全球媒体榜</span></h2>
          <router-link
            :to="'/discover/toplist?id=' + item.id"
            @click="trans(item.id)"
          >
            <li :class="indexs == item.id ? 'selectLi' : ''">
              <img v-lazy="`${item.coverImgUrl}?param=40y40`" alt="" />
              <div class="l_ct">
                <p>{{ item.name }}</p>
                <p class="l_c">
                  {{ item.updateFrequency }}
                </p>
              </div>
            </li>
          </router-link>
        </template>
      </ul>
    </div>
    <div class="tl_r">
      <div class="g_wrap">
        <div class="g_logo">
          <img :src="`${quan.coverImgUrl}?param=150y150`" alt="" />
          <span></span>
        </div>
        <div class="g_title">
          <h2>{{ quan.name }}</h2>
          <div class="g_gx">
            <i></i>
            <span>最近更新：{{ Time(quan.trackNumberUpdateTime) }}</span>
            <!-- <span> ({{ updateFrequency }}) </span>  无数据-->
          </div>
          <global-com-btn
            :quan="quan"
            :subscribedCount="subscribedCount"
            :info="info"
            @playing = 'playing'
          />
        </div>
      </div>
      <div class="g_List">
        <div class="g_Lhead">
          <h2>歌曲列表</h2>
          <span>{{ quan.trackCount }}首歌</span>
          <div class="header_r">
            播放：<strong>{{ quan.playCount }}</strong
            >次
          </div>
        </div>
        <a-table
          size="small"
          :pagination="false"
          class="ant-table-striped"
          :columns="columns"
          :data-source="TpList"
          bordered
          rowKey="id"
          :rowClassName="
            (record, index) => (index % 2 === 1 ? 'table-striped' : null)
          "
          :customRow="customRow"
        >
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { watchEffect } from "@vue/runtime-core";
import GlobalComBtn from "../../GlobalCom/GlobalComBtn.vue";
import { Time } from "../../untils/TimeTrans";
import { Times } from "../../untils/TimeTran";
import { useStore } from 'vuex';
export default {
  components: { GlobalComBtn },
  setup() {
    const Router = useRouter();
    const {state,commit,dispatch} = useStore()
    const Route = useRoute();
    const LList = reactive({
      indexs: Route.query.id ? Route.query.id : "19723756",
      lList: [],
      updateFrequency: "",
      trans(index) {
        this.indexs = index;
      },
      indexss(id = "19723756") {
        this.indexs = id;
      },
      async getlList() {
        await axios.get("/api/toplist").then((res) => {
          this.lList = res.list;
        });
      },
    });
    LList.getlList();
    const ctt = reactive({
      TpList: [],
      quan: [],
      subscribedCount: [],
      info: [],
      async getctt(id = "19723756") {
        await axios.get("/api/playlist/detail?id=" + id).then((res) => {
          this.quan = res.playlist;
          this.subscribedCount = res.playlist.subscribedCount;
          this.TpList = res.playlist.tracks;
        });
      },
    });
    watchEffect(() => {
      if (Route.path == "/discover/toplist"){
        ctt.getctt(Route.query.id);
        LList.indexss(Route.query.id);
      }
    });
    const columns = [
      {
        title: "",
        width: 77,
        dataIndex: "id",
        customRender({ index }) {
          return index + 1;
        },
        ellipsis: true,
      },
      {
        title: "标题",
        width: 326,
        dataIndex: "name",
        ellipsis: true,
      },
      {
        title: "时长",
        width: 91,
        dataIndex: "dt",
        customRender({ text }) {
          return Times(text);
        },
        ellipsis: true,
      },
      {
        title: "歌手",
        width: 174,
        dataIndex: "ar[0].name",
        ellipsis: true,
      },
    ];
    const customRow = (record, index) => {
      return {
        onclick: () => {
          Router.push("/song?id=" + ctt.TpList[index].id);
        },
      };
    };
    const playing =async ()=>{
      state.songList = ctt.TpList
      state.songListIndex = 0
      state.ids = ctt.TpList[state.songListIndex].id
      await dispatch('getAudios',ctt.TpList[state.songListIndex].id)
      await dispatch('getPlayText',ctt.TpList[state.songListIndex].id)
      commit('isSetPlay')
      let ao = document.querySelector('audio')
      if (ao.played) {
        ao.load();
        ao.play();
      } else {
        ao.play();
      }
    }
    return {
      ...toRefs(LList),
      Route,
      ...toRefs(ctt),
      Time,
      columns,
      customRow,
      playing
    };
  },
};
</script>
<style lang="less" scoped>
.toplist {
  width: 980px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-top: 0;
  border-bottom: 0;
  display: flex;
  .tl_l {
    width: 240px;
    height: 100%;
    padding-top: 40px;
    h2 {
      padding: 0 10px 12px 15px;
      font-size: 14px;
      color: #000;
      font-weight: bold;
      font-family: simsun, \5b8b\4f53;
      margin: 0px;
    }
    ul {
      width: 100%;
      a {
        display: block;
        width: 100%;
        height: 100%;
        color: #000;
        li {
          width: 100%;
          padding: 10px 0 10px 20px;
          height: 62px;
          display: flex;
          img {
            width: 42px;
            height: 42px;
            margin-right: 10px;
          }
          .l_ct {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
              margin: 0;
            }
            .l_c {
              color: #999;
            }
          }
        }
        li:hover {
          background-color: #e6e6e6;
        }
        .selectLi {
          background-color: #e6e6e6;
        }
      }
    }
  }
  .tl_r {
    width: 740px;
    height: 100%;
    background-color: #fff;
    border-left: 1px solid #d3d3d3;
    .g_wrap {
      width: 100%;
      padding: 40px;
      display: flex;
      .g_logo {
        width: 158px;
        height: 158px;
        border: 1px solid #ccc;
        position: relative;
        img {
          width: 150px;
          height: 150px;
          position: absolute;
          top: 3px;
          left: 3px;
        }
        span {
          display: block;
          position: absolute;
          width: 150px;
          height: 150px;
          top: 3px;
          left: 3px;
          background: url("../../../public/static/coverall.png") no-repeat;
          background-position: -230px -380px;
        }
      }
      .g_title {
        width: 473px;
        margin-left: 28px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h2 {
          line-height: 24px;
          font-size: 20px;
          margin: 15px 0 3px;
        }
        .g_gx {
          margin: 0 0 20px;
          line-height: 35px;
          i {
            float: left;
            margin: 9px 5px 0 3px;
            width: 13px;
            height: 13px;
            background: url("../../../public/static/icon.png") no-repeat;
            background-position: -18px -682px;
          }
          span {
            color: #666;
          }
          span:nth-of-type(2) {
            color: #999;
          }
        }
      }
    }
    .g_List {
      padding: 0 30px 40px 40px;
      .g_Lhead {
        width: 100%;
        height: 35px;
        border-bottom: 2px solid #c20c0c;
        h2 {
          float: left;
          font-size: 20px;
          font-weight: normal;
          margin-bottom: 12px;
        }
        span {
          float: left;
          margin: 9px 0 0 20px;
        }
        .header_r {
          float: right;
          margin-top: 5px;
          strong {
            color: #c20c0c;
          }
        }
      }
    }
    .ant-table-striped :deep(.table-striped) {
      background-color: #fafafa;
    }
  }
}
</style>