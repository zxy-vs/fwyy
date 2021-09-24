<template>
  <div class="globalheader">
    <router-link :to="head.titleUrl" class="headerTitle">{{
      head.title
    }}</router-link>
    <ul class="header_list" v-if="head.list">
      <li v-for="(item, index) of head.list" :key="index">
        <router-link :to="head.listUrl[index]">{{item}}</router-link>
        <span class="line" :style="(index===(head.list.length-1))?'display:none':''" >|</span>
      </li>
    </ul>
    <span class="more">
      <router-link :to="head.moreUrl">更多</router-link>
      <i></i>
    </span>
  </div>
</template>

<script>
export default {
  props: ["head"],
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.globalheader {
  height: 35px;
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c10d0c;
  background: url("../../public/static/index.png") no-repeat;
  background-position: -225px -156px;
  .headerTitle {
    float: left;
    font-size: 20px;
    font-weight: normal;
    line-height: 28px;
    text-decoration: none;
    color: #333;
  }
  .header_list {
    float: left;
    margin: 7px 0 0 20px;
    li {
        float: left;
      list-style: none;
      .line {
        margin: 0 10px;
        color: #ccc;
      }
    }
  }
  .more {
    float: right;
    margin-top: 9px;
    i {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      vertical-align: middle;
      background: url("../../public/static/index.png");
      background-position: 0 -240px;
    }
  }
}
a {
  color: #666;
  text-decoration: none;
  font-size: 12px;
}
a:hover {
  text-decoration: underline;
}
</style>