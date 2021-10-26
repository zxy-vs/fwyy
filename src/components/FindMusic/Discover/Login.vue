<template>
  <div class="Login">
    <div class="Nlogin" v-if="!user">
      <p class="Ntext">
        登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
      </p>
      <a href="javascript:;" class="login" @click="isTrue = true">用户登录</a>
    </div>
    <div class="loginEnd" v-if="user">
      <div>
        <router-link :to="'/home?id=' + userList.userId" class="loginImg">
          <img :src="userList.avatarUrl" alt="" />
        </router-link>
        <div class="logintext">
          <router-link :to="'/home?id=' + userList.userId" class="lname">{{
            userList.nickname
          }}</router-link>
          <a href="javascript:;" class="lv">{{ lv }}<i></i></a>
          <a href="javascript:;" class="lq">签到<i></i></a>
        </div>
      </div>
      <ul>
        <li>
          <router-link to="#">
            <b>{{ userList.djStatus }}</b>
            <span>动态</span>
          </router-link>
        </li>
        <li>
          <router-link to="#">
            <b>{{ userList.newFollows }}</b>
            <span>关注</span>
          </router-link>
        </li>
        <li>
          <router-link to="#">
            <b>{{ userList.followeds }}</b>
            <span>粉丝</span>
          </router-link>
        </li>
        <li class="last">
          <a href="javascript:;" @click="esc">
            <span class="center">退出</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { ref, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { api } from "../../../untils/baseProxy";
export default {
  setup() {
    const Router = useRouter();
    const { state } = useStore();
    const user = Cookies.get("userId");
    const userList = ref([]);
    const lv = ref(0);
    const userGet = async (user) => {
      await axios.get(api + "/user/detail?uid=" + user).then((res) => {
        userList.value = res.profile;
        lv.value = res.level;
      });
    };
    if (user) {
      userGet(user);
    }
    const esc = () => {
      Cookies.remove("userId");
      Router.go();
    };
    return {
      ...toRefs(state),
      user,
      userList,
      lv,
      esc,
    };
  },
};
</script>



<style lang="less" scoped>
.Login {
  width: 100%;
  height: 126px;
  padding-top: 0;
  background: url("../../../../public/static/index.png") no-repeat 0 9999px;
  background-position: 0 0;
  .Nlogin {
    width: 100%;
    height: 126px;
    padding-top: 0;
    .Ntext {
      width: 205px;
      margin: 0 auto;
      padding: 16px 0;
      line-height: 22px;
      color: #666;
      border: none;
    }
    .login {
      display: block;
      width: 100px;
      height: 31px;
      line-height: 31px;
      margin: auto;
      text-align: center;
      color: #fff;
      text-shadow: 0 1px 0 #8a060b;
      background: url("../../../../public/static/index.png") no-repeat 0 9999px;
      background-position: 0 -195px;
    }
    .login:hover {
      background-position-x: -110px;
    }
  }
  .loginEnd {
    width: 100%;
    height: 185px;
    padding-top: 20px;
    border-right: 1px solid #e4e4e4;
    background-color: #f2f2f2;
    color: #333;
    div {
      width: 250px;
      height: 87px;
      .loginImg {
        float: left;
        width: 86px;
        height: 86px;
        margin-left: 20px;
        padding: 2px;
        background: #fff;
        border: 1px solid #dadada;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .logintext {
        float: left;
        width: 115px;
        margin-left: 18px;
        padding-top: 3px;
        a {
          color: #333;
        }
        a:hover {
          text-decoration: underline;
        }
        .lname {
          display: inline-block;
          height: 16px;
          width: 60px;
          line-height: 16px;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lv {
          display: block;
          width: 40px;
          height: 17px;
          overflow: hidden;
          padding-left: 25px;
          line-height: 18px;
          color: #999;
          font-weight: bold;
          font-style: italic;
          background: url("../../../../public/static/icon2.png") no-repeat;
          background-position: -130px -64px;
          position: relative;
          i {
            position: absolute;
            height: 17px;
            width: 12px;
            overflow: hidden;
            background: url("../../../../public/static/icon2.png") no-repeat;
            background-position: -192px -64px;
          }
        }
        .lv:hover {
          text-decoration: none;
          background-position-y: -84px;
          color: #848383;
        }
        .lv:hover i {
          background-position-y: -84px;
        }
        .lq {
          margin-top: 10px;
          text-align: center;
          line-height: 32px;
          display: block;
          width: 100px;
          height: 32px;
          background: url("../../../../public/static/button2.png") no-repeat;
          background-position: 0 -387px;
          position: relative;
          color: #fff;
          i {
            position: absolute;
            top: 0;
            right: 0;
            display: block;
            width: 10px;
            height: 100%;
            background: url("../../../../public/static/button2.png") no-repeat;
            background-position: right -428px; //-469
          }
        }
        .lq:hover {
          text-decoration: none;
          background-position-y: -469px;
        }
        .lq:hover i {
          background-position-y: -510px;
        }
      }
    }
    ul {
      width: 100%;
      height: 40px;
      margin: 22px 0 0 10px;
      li {
        list-style: none;
        float: left;
        height: 40px;
        padding: 0 18px;
        border-right: 1px solid #e4e4e4;
        a {
          text-align: center;
          color: #666;
          display: flex;
          flex-direction: column;
          justify-content: center;
          b {
            font-size: 20px;
          }
          .center {
            line-height: 40px;
          }
        }
        a:hover {
          color: skyblue;
        }
      }
      .last {
        border: 0;
      }
    }
  }
}
</style>