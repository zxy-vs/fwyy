<template>
  <table class="R_list" v-if="lists">
    <tr
      v-for="(item, index) of lists"
      :key="index"
      :class="index % 2 != 0 ? '' : 'even'"
    >
      <td width="71" style="width: 71px">
        <router-link :to="'/home?id=' + item.userId"
          ><img :src="`${item.avatarUrl}?param=180y180`" alt=""
        /></router-link>
      </td>
      <td width="480" style="width: 480px">
        <div class="ttc">
          <!-- :class="item.followed.length? 'v' : ''" -->
          <router-link :to="'/home?id=' + item.userId">
            <span>{{ item.nickname }}</span
            >&nbsp;<sup v-if="item.authStatus"></sup
            ><i v-if="item.gender" :class="item.gender == 2 ? 'woman' : ''"></i>
          </router-link>
        </div>
        <p>{{ item.signature }}</p>
      </td>
      <td width="116" style="width: 116px">
        <a href="javascript:;" class="btn">
          <span>关注</span>
        </a>
      </td>
      <td width="116" style="width: 116px">
        <span class="t">歌单：{{ item.playlistCount }}</span>
      </td>
      <td width="117" style="width: 117px">
        <span class="t">粉丝：{{ NumberW(item.followeds) }}</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { NumberW } from "../../untils/NumberW";
export default {
  setup() {
    const { state, dispatch } = useStore();
    const Route = useRoute();
    const list = reactive({
      lists: [],
      async getnavList(key, type = 1) {
        await axios
          .get(`/api/cloudsearch?keywords=${key}&type=${type}&limit=20`)
          .then((res) => {
            this.lists = res.result.userprofiles;
          });
      },
    });
    watchEffect(() => {
      list.getnavList(Route.query.key, Route.query.type);
    });
    return {
      state,
      ...toRefs(list),
      NumberW,
    };
  },
};
</script>

<style lang="less" scoped>
.R_list {
  width: 901px;
  border: 1px solid #d9d9d9;
  tr {
    border: 1px solid #fff;
    background-color: #f7f7f7;
    td {
      height: 72px;
      line-height: 18px;
      text-align: left;
      padding: 5px 10px;
      position: relative;
      .t {
        color: #999;
      }
      img {
        width: 50px;
        height: 50px;
      }
      p {
        margin: 0;
        width: 460px;
        line-height: 18px;
        color: #999;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ttc {
        a {
          color: #333;
          sup {
            margin-top: -3px;
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
          .v {
            background: url("../../../public/static/icon.png") no-repeat;
            background-position: 0 1px;
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
      .btn {
        display: inline-block;
        width: 64px;
        height: 27px;
        background: url("../../../public/static/button.png") no-repeat;
        background-position: 0 -990px;
        line-height: 27px;
        span {
          display: inline-block;
          height: 25px;
          line-height: 25px;
          padding-left: 26px;
          color: #5d5d5d;
          cursor: pointer;
        }
      }
      .btn:hover{
          background-position-y: -1020px;
      }
    }
    td:nth-of-type(1) {
      border-left: 1px solid #fff;
    }
  }
  tr:hover {
    background-color: #f3f3f3;
  }
  .even {
    background-color: #fff;
  }
}
</style>