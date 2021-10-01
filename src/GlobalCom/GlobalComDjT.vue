<template>
  <router-link :to="'/djradio?id='+data.id" class="djs_img">
    <img
      v-lazy="`${data.picUrl}?param=200y200`"
      alt=""
    />
  </router-link>
  <div class="cnt">
    <router-link :to="'/djradio?id='+data.id">{{data.name}}</router-link>
    <p>{{data.rcmdtext}}</p>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="less" scoped>
.djs_img {
  float: left;
  display: block;
  margin-right: -200px;
  width: 120px;
  height: 120px;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.cnt {
  margin-left: 140px;
  a {
    display: block;
    margin: 16px 0 20px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  a:hover {
    text-decoration: underline;
  }
  p{
      color: #999;
      margin-bottom: 6px;
    line-height: 20px;
  }
}
</style>