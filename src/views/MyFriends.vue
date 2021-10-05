<template>
  <div class="mytop"></div>
  <div class="myfriends">
    <div class="n_p"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.mytop {
  width: 100%;
  height: 5px;
  background-color: #c20c0c;
}
.myfriends {
  width: 980px;
  min-height: 700px;
  margin: auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .n_p {
    width: 902px;
    height: 484px;
    margin: 0 auto 0;
    padding-top: 70px;
    background: url("../../public/static/notlogin.jpg") no-repeat;
    background-position: 0 70px;
  }
}
</style>