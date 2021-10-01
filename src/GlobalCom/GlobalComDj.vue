<template>
  <div class="GlobalDJ_title">
    <h3>
      <router-link :to="data.url">{{data.name}}</router-link>
      <span>·</span>电台
    </h3>
    <router-link :to="data.url" class="more">更多 ></router-link>
  </div>
</template>

<script>
export default {
    props:['data']
};
</script>

<style lang="less" scoped>
.GlobalDJ_title {
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  h3 {
    margin: 0;
    float: left;
    line-height: 28px;
    font-size: 24px;
    font-weight: normal;
    a {
      font-size: 24px;
      color: #333;
    }
    a:hover {
      text-decoration: underline;
    }
    span {
      font-family: simsun, \5b8b\4f53;
      font-size: 24px;
    }
  }
  .more {
    float: right;
    margin-top: 14px;
    line-height: 10px;
    color: #666;
  }
  .more:hover {
    text-decoration: underline;
  }
}
</style>