<template>
  <div class="Y">
    <h2>
      <i></i>
      {{ GSList.name }}简介
    </h2>
    <p v-html="Desc.briefDesc"></p>
    <template v-for="(item, index) of Desc.introduction" :key="index">
      <h2 v-if="item.ti">{{ item.ti }}</h2>
      <p v-if="item.txt" style="text-indent: 0" v-html="nHbr(item.txt)"></p>
    </template>
  </div>
</template>

<script>
import { nHbr } from "../../../untils/nHbr";
export default {
  props: ["Desc", "GSList"],
  setup() {
    return {
      nHbr,
    };
  },
};
</script>

<style lang="less" scoped>
.Y {
  margin-top: 30px;
  h2 {
    margin: 28px 0 8px 0;
    color: #333;
    font-size: 14px;
    padding: 0;
    font-weight: bold;
    i {
      display: inline-block;
      height: 14px;
      width: 3px;
      margin-right: 7px;
      background: #c10d0c;
      vertical-align: text-top;
    }
  }
  p {
    line-height: 25px;
    color: #666;
    text-indent: 2em;
  }
}
</style>