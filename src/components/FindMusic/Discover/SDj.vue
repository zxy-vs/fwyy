<template>
  <div class="SDj" v-if="false">
    <global-com-smallheader-1 :header1="header1" />
    <div class="SDj_f">
      <ul>
        <li>
          <img
            src="http://p1.music.126.net/NDsX060FnCtiDMZN-c_9Gw==/3438172872737957.jpg?param=62y62"
            alt=""
          />
          <div class="Dj_jj">
            <h4>王三溥</h4>
            <p>音乐人</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import GlobalComSmallheader1 from "../../../GlobalCom/GlobalComSmallheader1.vue";
import { api } from '../../../untils/baseProxy';
export default {
  components: { GlobalComSmallheader1 },
  setup() {
    const header1 = reactive({
      title: "入驻歌手",
      path: "/discover/artist",
    });
   const SDj_j = reactive({
       j_list:[],
       async getList(){
           await axios.get(api+'/artist/list?type=-1&area=-1&initial=0').then(res=>{
               console.log(res);
           })
       }
   })
   SDj_j.getList()
   return {
      header1,
    };
  },
};
</script>

<style lang="less" scoped>
.SDj {
  margin: 15px 20px 0;
  .SDj_f {
    ul {
      li {
        cursor: pointer;
        margin-top: 14px;
        width: 210px;
        height: 62px;
        background: #fafafa;
        border: 1px solid #e9e9e9;
        display: flex;
        .Dj_jj {
          width: 133px;
          height: 60px;
          margin-left: 15px;
          //   border: 1px solid #e9e9e9;
          border-left: none;
          h4 {
            font-weight: bold;
            font-size: 14px;
            margin-top: 8px;
            margin-bottom: 0;
          }
          p {
            width: 90%;
            margin-top: 8px;
            margin-bottom: 0;
          }
        }
      }
      li:hover {
        background-color: #eee;
      }
    }
  }
}
</style>