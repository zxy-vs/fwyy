<template>
  <div class="mytop"></div>
  <div class="mymusic">
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
.mymusic {
  width: 980px;
  min-height: 700px;
  margin: auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .n_p{
          width: 807px;
    height: 372px;
    margin: 0 auto 0;
    padding-top: 104px;
    background: url('../../public/static/mymusic.png') no-repeat;
    background-position: 0 104px;
  }
}
</style>