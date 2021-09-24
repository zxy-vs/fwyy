<template>
  <div>
    <banner />
    <section class="mains">
      <div class="mains_l">
        <rec />
        <new />
        <from/>
      </div>
      <div class="mains_r">
        <login/>
        <s-dj/>
      </div>
    </section>
  </div>
</template>

<script>
import Banner from "./Discover/Banner.vue";
import Rec from "./Discover/Rec.vue";
import New from './Discover/New.vue';
import From from './Discover/From.vue';
import Login from './Discover/Login.vue';
import SDj from './Discover/SDj.vue';
export default {
  components: { Banner, Rec, New,From, Login, SDj },
  setup() {
    
  },
};
</script>

<style lang="less" scoped>
div {
  .mains {
    width: 980px;
    height: 100%;
    margin: auto;
    
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    background-color: #fff;
    display: flex;
    .mains_l {
      width: 729px;
      padding: 20px 20px 40px;
    }
    .mains_r {
      width: 250px;
      border: 1px solid #d3d3d3;
      border-width: 0 0 0 1px;
    }
  }
}
</style>