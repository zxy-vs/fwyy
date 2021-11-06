<template>
  <div>
    <Header />
    <main>
      <router-view></router-view>
    </main>
    <div class="fixed_play" ref="keys">
      <Play
        v-show="Route.path != '/mv' && Route.path != '/video'"
        @pauseAo="PauseAo"
        @playAo="PlayAo"
        @jump="jump"
      />
    </div>
    <Footer />
    <audio :src="audios" ref="ao" :loop="isLoop == 1 ? true : false"></audio>
  </div>
</template>

<script>
import Header from "./components/App/Header.vue";
import Footer from "./components/App/Footer.vue";
import Play from "./components/App/Play.vue";
import { ref, toRefs } from "@vue/reactivity";
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: { Header, Footer, Play },
  setup() {
    const Route = useRoute();
    const keys = ref(null);
    const ao = ref(null);
    const { state, commit } = useStore();
    const time = ref(null);
    const PauseAo = () => {
      ao.value.pause();
    };
    const PlayAo = () => {
      ao.value.play();
    };
    const jump = () => {
      ao.value.currentTime = state.currentTime;
    };

    const randoms = () => {
      let index = Math.floor(Math.random() * state.songList.length);
      state.songListIndex = index;
      storeFu();
    };
    onMounted(() => {
      ao.value.ontimeupdate = function () {
        state.currentTime = this.currentTime;
        this.volume = state.isVolume;
        document.title = "▶  " + state.playText.name;
      };
      ao.value.onpause = function () {
        document.title = state.title;
      };
      keys.value.onmouseenter = me;
      keys.value.onmouseleave = ml;
      let lock = keys.value.querySelector(".key");
      if (state.isKeys) {
        lock.style.backgroundPositionX = "-80px";
        keys.value.onmouseenter = me;
        keys.value.onmouseleave = ml;
      } else {
        lock.style.backgroundPositionX = "-100px";
        keys.value.onmouseenter = null;
        keys.value.onmouseleave = null;
        keys.value.style.transform = "translateY(0)";
      }
      lock.onclick = function () {
        commit("isTranKeys");
        if (state.isKeys) {
          this.style.backgroundPositionX = "-80px";
          keys.value.onmouseenter = me;
          keys.value.onmouseleave = ml;
        } else {
          this.style.backgroundPositionX = "-100px";
          keys.value.style.transform = "translateY(0)";
          keys.value.onmouseenter = null;
          keys.value.onmouseleave = null;
        }
      };
    });
    function me() {
      this.style.transform = "translateY(0px)";
    }
    function ml() {
      this.style.transform = "translateY(46px)";
    }
    return {
      keys,
      ...toRefs(state),
      ao,
      PauseAo,
      PlayAo,
      jump,
      randoms,
      Route,
    };
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  font-family: Arial, Helvetica, sans-serif;
}
html {
  overflow: hidden;
}
body {
  overflow-y: auto;
  word-wrap: break-word;
  word-break: break-word;
  user-select: none;
}
main {
  width: 100%;
  margin: 0;
  padding: 0;
  background: #f2f2f2;
}
.fixed_play {
  z-index: 9099;
  width: 100vw;
  height: 53px;
  transition: all 0.3s linear;
  transform: translateY(46px);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  zoom: 1;
}
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
audio {
  display: none;
}
</style>