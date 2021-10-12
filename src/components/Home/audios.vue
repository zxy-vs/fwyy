<template>
  <div v-if="list.length">
    <slot></slot>
    <table class="R_list" >
      <tr
        v-for="(item, index) of list"
        :key="index"
        :class="index % 2 != 0 ? '' : 'even'"
      >
        <td width="71" style="width: 71px">
          <router-link :to="'/djradio?id=' + item.id"
            ><img :src="`${item.picUrl}?param=180y180`" alt=""
          /></router-link>
        </td>
        <td width="538" style="width: 538px">
          <div class="ttc">
            <router-link :to="'/djradio?id=' + item.id">
              <span>{{ item.name }}</span>
            </router-link>
          </div>
        </td>
        <td width="216" style="width: 216px">
          <span class="t">订阅{{ item.subCount }}次</span>
        </td>
        <td width="50" style="width: 50px">
          <span class="t">{{ NumberW(item.programCount) }}期</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { NumberW } from "../../untils/NumberW";
export default {
  setup() {
    const Route = useRoute();
    const pl = reactive({
      list: [],
      async getList(id) {
        await axios.get("/api/user/audio?uid=" + id).then((res) => {
          this.list = res.djRadios;
        });
      },
    });
    watchEffect(() => {
      pl.getList(Route.query.id);
    });
    return {
      ...toRefs(pl),
      NumberW,
    };
  },
};
</script>

<style lang="less" scoped>
.R_list {
  width: 901px;
  border: 1px solid #e5e5e5;
  margin-bottom: 24px;
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
        }
        a:hover {
          text-decoration: underline;
        }
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