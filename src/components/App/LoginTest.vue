<template>
  <div class="logining" ref="login">
    <div class="logining_header" ref="move">
      <span>手机号登录</span>
      <i @click="esc"></i>
    </div>
    <div class="logining_border">
      <div class="logining_main">
        <form action="">
          <a-input
            placeholder="请输入手机号"
            v-model:value="ip"
            class="l_text"
          />
          <a-input-password
            placeholder="请输入密码"
            v-model:value="pas"
            class="l_text l_pass"
            autocomplete
          />
          <a href="#">忘记密码？</a>
          <div class="error" ref="err"><i></i><span></span></div>
          <label class="auto">
            <input type="checkbox" /><span>&nbsp;自动登录</span>
          </label>
          <div class="go">
            <span ref="submit">登&nbsp;录</span>
          </div>
        </form>
      </div>
    </div>
    <p>请登录你的真实帐号，注册请去官网，感谢您的使用</p>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const move = ref(null);
    const login = ref(null);
    const { state } = useStore()
    const Router = useRouter()
    const esc = () => {
      state.isTrue = false;
    };
    const ip = ref("");
    const pas = ref("");
    const err = ref(null);
    const ipTest =
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    const pasTest = /^.{8,}/;
    const submit = ref(null);
    const request = async (text) => {
      await axios.get(
        "/api/login/cellphone?phone=" + ip.value + "&password=" + pas.value
      ).then(res=>{
        if(res.code!==200){
          err.value.style.display = "block";
          text.innerHTML = res.msg;
          return false
        }else{
          Cookies.set('userId',res.account.id,{ expires: 7 })
          //待完善登陆状态
          Router.go()
        }
      })
    };
    onMounted(() => {
      let text = err.value.children[1];
      move.value.onmousedown = function (e) {
        let x = e.clientX - login.value.offsetLeft;
        let y = e.clientY - login.value.offsetTop;
        document.documentElement.onmousemove = function (e) {
          let Left = e.clientX - x,
            maxLeft =
              document.documentElement.clientWidth -
              login.value.offsetWidth / 2,
            minLeft = login.value.offsetWidth / 2,
            Top = e.clientY - y,
            maxTop =
              document.documentElement.clientHeight -
              login.value.offsetHeight / 2,
            minTop = login.value.offsetHeight / 2;
          Left = Math.min(Left, maxLeft);
          Left = Math.max(Left, minLeft);
          Top = Math.min(Top, maxTop);
          Top = Math.max(Top, minTop);
          login.value.style.left = Left + "px";
          login.value.style.top = Top + "px";
        };
        this.onmouseup = function () {
          document.documentElement.onmousemove = null;
          move.value.onmouseup = null;
        };
      };
      submit.value.onclick = function () {
        if (!ip.value.length) {
          err.value.style.display = "block";
          text.innerHTML = "请输入手机号";
          return false;
        } else if (!pas.value.length) {
          err.value.style.display = "block";
          text.innerHTML = "请输入密码";
          return false;
        } else if (!ipTest.test(ip.value)) {
          err.value.style.display = "block";
          text.innerHTML = "请输入正确手机号";
          return false;
        } else if (!pasTest.test(pas.value)) {
          err.value.style.display = "block";
          text.innerHTML = "请输入正确密码";
          return false;
        } else {
          err.value.style.display = "none";
          request(text)
        }
      };
    });
    return {
      move,
      login,
      esc,
      ip,
      pas,
      submit,
      err,
    };
  },
};
</script>

<style lang="less" scoped>
.logining {
  width: 528px;
  height: 224px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  .logining_header {
    width: 100%;
    height: 38px;
    background: url("../../../public/static/layer.png");
    background-position: 0 -48px;
    color: #fff;
    border-radius: 3px 3px 0 0;
    position: relative;
    span {
      display: block;
      padding-right: 45px;
      height: 38px;
      line-height: 38px;
      padding-left: 18px;
      font-weight: bold;
      font-size: 14px;
    }
    i {
      display: block;
      position: absolute;
      top: 16px;
      right: 20px;
      width: 10px;
      height: 10px;
      background: url("../../../public/static/layer.png") no-repeat;
      background-position: 0 -95px;
      cursor: pointer;
    }
  }
  .logining_header:hover {
    cursor: all-scroll;
  }
  .logining_border {
    border: 1px solid black;
    background-color: #fff;
    .logining_main {
      width: 220px;
      padding: 30px 0 43px;
      margin: 0 auto;
      position: relative;
      .border {
        border: 1px solid red;
      }
      .l_text {
        width: 100%;
        height: 30px;
        border: 1px solid #cdcdcd;
        border-radius: 2px;
        margin-bottom: 10px;
        outline: none;
        color: #666;
        padding: 0 5px;
      }
      .l_pass {
        padding-right: 65px;
        overflow: hidden;
      }
      a {
        position: absolute;
        top: 76px;
        right: 0;
        color: #666;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    .error {
      display: none;
      clear: both;
      width: 100%;
      height: 18px;
      line-height: 18px;
      margin-top: 5px;
      color: red;
      i {
        display: inline-block;
        margin: -2px 8px 0 0;
        width: 14px;
        height: 14px;
        background: url("../../../public/static/icon.png");
        background-position: -50px -270px;
        vertical-align: middle;
      }
    }
    .auto {
      float: right;
      line-height: 14px;
      cursor: pointer;
      input {
        vertical-align: top;
        background-color: #fff;
      }
    }
    .go {
      margin-top: 30px;
      width: 215px;
      height: 31px;
      line-height: 31px;
      color: #fff;
      text-align: center;
      background: url("../../../public/static/button2.png") no-repeat;
      background-position: 0 -387px;
      span {
        display: block;
        width: 220px;
        height: 31px;
        background: url("../../../public/static/button2.png") no-repeat;
        background-position: right -428px;
      }
    }
    .go:hover {
      background-position-y: -469px;
      cursor: pointer;
      span {
        background-position-y: -510px;
      }
    }
  }
  p{
    width: 100%;
    position: fixed;
    bottom: -40px;
    left: 25%;
  }
}
</style>