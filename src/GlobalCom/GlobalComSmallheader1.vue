<template>
  <div>
    <div class="h_title">
      <span class="t_l">{{header1.title}}</span>
      <router-link v-if="header1.path" :to="header1.path" class="t_r"><span >查看全部 ></span></router-link>
    </div>
  </div>
</template>

<script>
export default {
    props:['header1']
};
</script>

<style lang="less" scoped>
.h_title{
    height: 28px;
    line-height: 23px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    .t_l{
        float: left;
        color: #333;
        font-weight: bold;
    }
    .t_r{
        float: right;
        color: #666;
    }
    .t_r:hover{
        text-decoration: underline;
    }
}

</style>