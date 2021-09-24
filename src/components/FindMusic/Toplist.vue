<template>
  <div class="toplist">
    <div class="tl_l">
      <h2>云音乐特色榜</h2>
      <ul v-if="lList.length" ref="ull">
        <template v-for="(item, index) of lList" :key="index">
          <h2 v-if="index == 4"><span>全球媒体榜</span></h2>
          <router-link :to="'/discover/toplist?id=' + item.id">
            <li>
              <img v-lazy="`${item.coverImgUrl}?param=40y40`" alt="" />
              <div class="l_ct">
                <p>{{ item.name }}</p>
                <p class="l_c">{{ item.updateFrequency }}</p>
              </div>
            </li>
          </router-link>
        </template>
      </ul>
    </div>
    <div class="tl_r"></div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "@vue/reactivity";
import { useRoute } from 'vue-router';
export default {
  setup() {
       const Route=useRoute()
    const LList = reactive({
      lList: [],
      ListXx:[],
      async getlList() {
        await axios.get("/api//toplist").then((res) => {
          this.lList = res.list;
        });
        let lis = ull.value.children;
        for (let i = 0; i < lis.length; i++) {
          lis[i].onclick = function () {
            for (let j = 0; j < lis.length; j++) {
              lis[j].children[0].className = "";
            }
            this.children[0].className = "selectLi";
            console.log(Route.query);//渲染详细页面内容
          };
        }
        lis[0].click()
      },
    });
    LList.getlList();
    const ull = ref(null);
    return {
      ...toRefs(LList),
      ull,
    };
  },
};
</script>

<style lang="less" scoped>
.toplist {
  width: 980px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-top: 0;
  border-bottom: 0;
  display: flex;
  .tl_l {
    width: 240px;
    height: 100%;
    border-right: 1px solid #d3d3d3;
    padding-top: 40px;
    h2 {
      padding: 0 10px 12px 15px;
      font-size: 14px;
      color: #000;
      font-weight: bold;
      font-family: simsun, \5b8b\4f53;
      margin: 0px;
    }
    ul {
      width: 100%;
      a {
        display: block;
        width: 100%;
        height: 100%;
        color: #000;
        //   cursor: pointer;
        li {
          width: 100%;
          padding: 10px 0 10px 20px;
          height: 62px;
          display: flex;
          img {
            width: 42px;
            height: 42px;
            margin-right: 10px;
          }
          .l_ct {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
              margin: 0;
            }
            .l_c {
              color: #999;
            }
          }
        }
        li:hover {
          background-color: #e6e6e6;
        }
        .selectLi {
          background-color: #e6e6e6;
        }
      }
    }
  }
  .tl_r {
    width: 740px;
    height: 300px;
    background-color: #fff;
  }
}
</style>