<template>
  <ul class="x" v-if="Mv.length">
    <li v-for="item,index of Mv" :key="index">
      <div class="x_m">
        <img
          :src="`${item.imgurl}?param=137y103`"
          alt=""
        />
        <router-link :to="'/mv?id='+item.id" class="msk"></router-link>
        <router-link :to="'/mv?id='+item.id" class="x_p"></router-link>
      </div>
      <p class="dev">
        <router-link :to="'/mv?id='+item.id">{{item.name}}</router-link>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["Mv"],
};
</script>

<style lang="less" scoped>
.x {
  margin: 20px 0 0 -29px;
  width: 669px;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 166px;
    height: 170px;
    padding: 0 0 30px 29px;
    overflow: hidden;
    line-height: 1.4;
    .x_m {
      width: 137px;
      height: 103px;
      position: relative;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .msk {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("../../../../public/static/coverall.png") no-repeat;
        background-position: 0 -1170px;
      }
      .x_p {
        display: block;
        width: 44px;
        height: 44px;
        top: 50%;
        left: 50%;
        margin: -22px 0 0 -22px;
        background: url("../../../../public/static/iconall.png") no-repeat;
        background-position: -30px -135px;
        position: absolute;
        right: 10px;
        bottom: 5px;
      }
      .x_p:hover {
        background-position-y: -85px;
      }
    }
    .dev {
      margin: 8px 0 3px;
      font-size: 14px;
      a {
        color: #333;
        display: inline-block;
        max-width: 100%;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
      a:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>