<template>
  <div class="banners" :style="bgUrl">
    <div class="banner_b">
      <div class="banner">
        <a-carousel arrows autoplay :afterChange="getbg">
          <template #prevArrow>
            <div
              class="custom-slick-arrow"
              style="left: -68px; z-index: 1; backgroundPosition: 0 -360px"
            ></div>
          </template>
          <template #nextArrow>
            <div
              class="custom-slick-arrow"
              style="right: -322px; z-index: 1; backgroundPosition: 0 -508px"
            ></div>
          </template>
          <div
            class="banner_content"
            v-for="(item, index) of bannerList"
            :key="index"
          >
          <!-- '/song?id='+item.targetId -->
            <router-link :to="'/song?id='+item.targetId">
              <img :src="item.imageUrl" alt="" />
            </router-link>
          </div>
        </a-carousel>
      </div>
      <div class="download">
        <span class="shadow-l"></span>
        <span class="shadow-r"></span>
        <router-link to="/Download" class="download_btn"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const banner = reactive({
      bannerList: [],
      bgUrl: {},
      async getList() {
        await axios.get("/api/banner?type=0").then((res) => {
          // console.log(res);
          banner.bannerList = res.banners;
          this.getbg(0);
        });
      },
      getbg(index) {
        banner.bgUrl = {
          backgroundImage: `url(${banner.bannerList[index].imageUrl}?imageView&blur=40x20)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        };
      },
    });
    banner.getList();
    return {
      ...toRefs(banner),
    };
  },
};
</script>
<style lang="less" scoped>
.banners {
  width: 100%;
  height: 285px;
  .banner_b {
    width: 980px;
    height: 100%;
    margin: auto;
    background-color: #fff;
    position: relative;
    .banner {
      width: 730px;
      height: 100%;
      .ant-carousel :deep(.slick-slide) {
        text-align: center;
        width: 100%;
        height: 285px;
        background: #364d79;
        overflow: hidden;
      }
      .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
        width: 37px;
        height: 63px;
        font-size: 63px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        background: rgba(51, 51, 51, 0) url("../../../assets/img/banner.png");
        // opacity: 0.3;
      }
      .ant-carousel :deep(.custom-slick-arrow:before) {
        display: none;
      }
      .ant-carousel :deep(.custom-slick-arrow:hover) {
        background: rgba(51, 51, 51, 0.2) url("../../../assets/img/banner.png");
      }
      .ant-carousel :deep(.slick-slide h3) {
        color: #fff;
      }
    }
    .download {
      position: absolute;
      top: 0;
      z-index: 20;
      right: -1px;
      width: 254px;
      height: 285px;
      background: url("../../../../public/static/download.png");
      span {
        display: block;
        width: 20px;
        height: 285px;
        background: url("../../../assets/img/banner.png");
      }
      .shadow-l {
        position: absolute;
        top: 0;
        left: -20px;
        background-position: -1px 0;
      }
      .shadow-r {
        position: absolute;
        top: 0;
        right: -20px;
        background-position: -20px 0;
      }
      .download_btn {
        display: block;
        width: 215px;
        height: 56px;
        margin: 186px 0 0 19px;
      }
      .download_btn:hover {
        background: url("../../../../public/static/download.png") no-repeat;
        background-position: 0px -290px;
      }
    }
  }
}
</style>