<template>
  <div class="c_nav">
    <div class="c_nav_show">
      <section class="c_nav_l">
        <h1 class="logo">
          <router-link to="/" hidefocus="true">网易云音乐</router-link>
        </h1>
        <ul class="c_nav_list">
          <span class="hot"></span>
          <li v-for="(item, index) of list" :key="index" class="c_nav_from">
            <router-link
              v-if="!(index == 3 || index == 4)"
              :to="item.path"
              class="c_nav_content"
              @click="check = index"
              ><em>{{ item.text }}</em>
              <sub class="cor">&nbsp;</sub></router-link
            >
            <a
              v-if="index == 3 || index == 4"
              :href="item.path"
              class="c_nav_content"
              target="_blank"
              ><em>{{ item.text }}</em> <sub class="cor">&nbsp;</sub></a
            >
          </li>
        </ul>
      </section>
      <section class="c_nav_r">
        <div class="c_nav_login">
          <span @click="isTrue = true" v-if="!user" class="login_btn"
            >登录</span
          >
          <span class="login_end" v-if="user">
            <a-badge>
              <a-avatar :src="userList.avatarUrl" />
            </a-badge>
          </span>
          <teleport to="body">
            <div class="login_bgc" v-if="isTrue">
              <login-test />
            </div>
          </teleport>
        </div>
        <a
          href="https://music.163.com/#/login?targetUrl=%2Fcreatorcenter"
          class="c_nav_create"
          >创作者中心</a
        >
        <div class="c_nav_search">
          <input
            type="text"
            class="search"
            v-model="Keys"
            placeholder="音乐/视频/电台/用户"
            ref="clicks"
          />
          <div :class="['c_show', isShow ? 'c_s_n' : '']" v-show="Keys != ''">
            <search :keys="Keys" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import LoginTest from "./LoginTest.vue";
import Search from "./Search.vue";
import { useRouter } from "vue-router";
export default {
  components: { LoginTest, Search },
  setup() {
    const Router = useRouter();
    const { state } = useStore();
    const list = reactive([
      { path: "/", text: "发现音乐" },
      { path: "/MyMusic", text: "我的音乐" },
      { path: "/MyFriends", text: "朋友" },
      { path: "https://music.163.com/store/product", text: "商城" },
      { path: "https://music.163.com/st/musician", text: "音乐人" },
      { path: "/Download", text: "下载客户端" },
    ]);
    const user = Cookies.get("userId");
    const userList = ref([]);
    const userGet = async (user) => {
      await axios.get("/api/user/detail?uid=" + user).then((res) => {
        userList.value = res.profile;
      });
    };
    if (user) {
      userGet(user);
    }
    const Keys = ref("");
    const clicks = ref(null);
    const isShow = ref(false);
    onMounted(() => {
      clicks.value.onblur = function () {
        isShow.value = false;
      };
      clicks.value.onfocus = function () {
        isShow.value = true;
      };
      clicks.value.onkeydown = function (e) {
        if (e.keyCode == 13) {
          Router.push(`/search?type=1&key=${Keys.value}`);
        }
      };
    });
    return {
      list,
      ...toRefs(state),
      userList,
      user,
      Keys,
      isShow,
      clicks,
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
.c_nav {
  width: 100%;
  height: 70px;
  background-color: #242424;
  .c_nav_show {
    width: 1100px;
    height: 70px;
    margin: auto;
    .c_nav_l {
      float: left;
      .logo {
        float: left;
        margin: 0;
        width: 176px;
        height: 70px;
        padding-right: 20px;
        background: #242424 url("../../assets/img/topbar.png") no-repeat 0 0;
        a {
          display: inline-block;
          width: 176px;
          height: 70px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0);
        }
      }
      .c_nav_list {
        float: left;
        margin: 0;
        padding: 0;
        position: relative;
        .hot {
          z-index: 1;
          display: block;
          position: absolute;
          top: 21px;
          right: -20px;
          width: 28px;
          height: 19px;
          background: #242424 url("../../assets/img/topbar.png") no-repeat -190px
            0;
        }
        .c_nav_from {
          list-style: none;
          float: left;
          height: 70px;
          font-size: 14px;
          position: relative;
          .c_nav_content {
            text-decoration: none;
            display: inline-block;
            padding: 0 19px;
            line-height: 70px;
            height: 70px;
            color: #ccc;
            &.router-link-active {
              background: #000;
              color: #fff;
            }
            &.router-link-active .cor {
              display: block;
            }
            em {
              display: inline-block;
              font-style: normal;
              font-size: 14px;
              height: 70px;
            }
            .cor {
              display: none;
              width: 12px;
              height: 7px;
              position: absolute;
              left: 50%;
              bottom: 0;
              border: 0;
              border-bottom: 6px solid #c20c0c;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              margin-left: -6px;
              overflow: hidden;
            }
            .block {
              display: block;
            }
          }
          .bgColor {
            background: #000;
            color: #fff;
          }
        }
        .c_nav_from:hover {
          background: #000;
        }
        .c_nav_from:hover .c_nav_content {
          color: #fff;
        }
      }
    }
    .c_nav_r {
      float: right;
      .c_nav_search {
        width: 158px;
        height: 32px;
        float: right;
        margin-top: 19px;
        border-radius: 32px;
        position: relative;
        background: #fff url("../../assets/img/topbar.png") no-repeat;
        background-position: 0 -99px;
        .search {
          color: #333;
          line-height: 16px;
          width: 95%;
          margin: 0;
          padding: 0;
          background: transparent;
          outline: none;
          border: 0;
          height: 100%;
          padding: 0 4px 0 28px;
        }
        .c_show {
          display: none;
          position: absolute;
          top: 40px;
          left: 0;
          width: 240px;
          z-index: 120;
          left: 0;
          box-sizing: border-box;
          border: 1px solid #bebebe;
          border-radius: 4px;
          background: #fff;
          box-shadow: 0 4px 7px #555;
          text-shadow: 0 1px 0 rgb(255 255 255 / 90%);
        }
        .c_s_n {
          display: block;
        }
      }

      .c_nav_create {
        text-decoration: none;
        float: right;
        width: 90px;
        height: 32px;
        margin: 19px 0 0 12px;
        padding-left: 14px;
        border: 1px solid #4f4f4f;
        background-position: 0 -140px;
        line-height: 30px;
        font-size: 12px;
        color: #ccc;
        border-radius: 20px;
      }
      .c_nav_create:hover {
        border: 1px solid #fff;
      }
      .c_nav_login {
        width: 48px;
        height: 44px;
        margin-right: 22px;
        float: right;
        position: relative;
        .login_btn {
          display: block;
          width: 28px;
          margin-top: 26px;
          margin-left: 20px;

          font-size: 12px;
          color: #787878;
          cursor: pointer;
        }
        #components-avatar-demo-badge .ant-avatar {
          margin-top: 1px;
          margin-right: 11px;
        }
        .login_end {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-20%, -10%);
        }
      }
    }
  }
}
.login_bgc {
  position: fixed;
  z-index: 111;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
