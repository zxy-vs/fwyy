<template>
  <footer>
    <section class="end_content">
      <div class="copy">
        <p class="link">
          <a
            href="https://st.music.163.com/official-terms/service"
            target="_blank"
            >服务条款</a
          >
          <span class="line">|</span>
          <a
            href="https://st.music.163.com/official-terms/privacy"
            target="_blank"
            >隐私政策</a
          >
          <span class="line">|</span>
          <a
            href="https://st.music.163.com/official-terms/children"
            target="_blank"
            >儿童隐私政策</a
          >
          <span class="line">|</span>
          <a
            href="https://music.163.com/st/staticdeal/complaints.html"
            target="_blank"
            >版权投诉指引</a
          >
          <span class="line">|</span>
          <a href="#" target="_blank" class="link_a">意见反馈</a>
          <span class="line">|</span>
          <a href="https://music.163.com/#" target="_blank" class="link_a"
            >广告合作</a
          >
        </p>
        <p class="right">
          <span class="r_space">网易公司版权所有©1997-2021</span>
          <span>杭州乐读科技有限公司运营：</span>
          <a
            href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png"
            target="_blank"
            >浙网文[2021] 1186-054号</a
          >
        </p>
        <p class="right">
          <span class="r_space">违法和不良信息举报电话：0571-89853516</span>
          <span>举报邮箱：</span>
          <a href="https://music.163.com/#" target="_blank">ncm5990@163.com</a>
        </p>
        <p class="right">
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
            ><span class="r_space"
              >粤B2-20090191-18 工业和信息化部备案管理系统网站</span
            ></a
          >
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564"
            target="_blank"
            ><span class="r_img"></span
            ><span>浙公网安备 33010902002564号</span></a
          >
        </p>
      </div>
      <ul class="show">
        <li v-for="(item, index) of list" :key="index" class="unit">
          <a :href="item.a" target="_blank" :class="item.imgClass"></a>
          <span :class="item.textClass"></span>
        </li>
      </ul>
    </section>
  </footer>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const list = reactive([
      {
        imgClass: "logo_1",
        a: "https://web-amped.music.163.com/",
        textClass: "text_1",
      },
      {
        imgClass: "logo_2",
        a: "https://web-amped.music.163.com/",
        textClass: "text_2",
      },
      {
        imgClass: "logo_3",
        a: "https://music.163.com/st/musician",
        textClass: "text_3",
      },
      {
        imgClass: "logo_4",
        a: "https://music.163.com/web/reward",
        textClass: "text_4",
      },
      {
        imgClass: "logo_5",
        a: "https://music.163.com/uservideo#/plan",
        textClass: "text_5",
      },
    ]);
    return {
      list,
    };
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
footer {
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
  width: 100%;
  height: 173px;
  .end_content {
    width: 980px;
    height: 115px;
    margin: auto;
    font-size: 12px;
    .copy {
      float: left;
      padding-top: 15px;
      p {
        color: #666;
        width: 520px;
        height: 24px;
      }
      .link {
        a {
          color: #999;
        }
        a:hover {
          text-decoration: underline;
        }
        .line {
          margin: 0 8px 0 10px;
          color: #c2c2c2;
        }
      }
      .right {
        .r_space {
          margin-right: 14px;
        }
        a {
          color: #666;
        }
        a:hover {
          text-decoration: underline;
        }
        .r_img {
          width: 14px;
          height: 14px;
          background: url("../../assets/img/police.png");
          background-size: cover;
          display: inline-block;
          margin-right: 2px;
          vertical-align: -2px;
        }
      }
    }
    .show {
      float: right;
      width: 420px;
      margin-top: 33px;
      .unit {
        float: left;
        list-style: none;
        width: 60px;
        height: 70px;
        margin-left: 30px;
        a {
          display: block;
          float: none;
          width: 50px;
          height: 45px;
          margin: 0 auto;
          background: url("../../assets/img/foot_enter_new.png") no-repeat;
          background-size: 105px 550px;
        }
        .logo_1 {
          background-position: -58px -455px;
        }
        .logo_2 {
          background-position: -58px -101px;
        }
        .logo_3 {
          background-position: 2px 0;
        }
        .logo_4 {
          background-position: -58px -50px;
        }
        .logo_5 {
          background-position: 2px -101px;
        }
        span {
          display: inline-block;
          margin: 5px 5px 0;
          width: 52px;
          height: 14px;
          background: url("../../assets/img/foot_enter_tt.png") no-repeat 0 0;
          background-size: 180px 139px;
        }
        .text_1 {
          text-align: right;
          background-position: 0 -108px;
          width: 72px;
          margin-left: -6px;
        }
        .text_2 {
          background-position: -1px -91px;
        }
        .text_4 {
          background-position: 0 -54px;
        }
        .text_5 {
          background-position: -1px -72px;
        }
        .text_1 {
          background-position: 0 -108px;
        }
      }
      .unit:first-of-type {
        margin-left: 0;
      }
    }
  }
}
</style>