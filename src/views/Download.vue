<template>
  <div class="mytop"></div>
  <div class="download">
    <div class="n_p"></div>
    <p>扫描二维码下载</p>
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
.download {
  width: 980px;
  min-height: 700px;
  margin: auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .n_p {
    width: 256px;
    height: 326px;
    margin: auto;
    padding-top: 70px;
    background: url("../../public/static/dl.png") no-repeat;
    background-position: 0 70px;
  }
  p{
      margin-top: 30px;
      text-align: center;
      font-size: 24px;
  }
}
</style>