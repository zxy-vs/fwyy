<template>
  <div class="djs_List">
    <div class="djs_l">
      <div class="djs_tit">
        <div class="djs_img">
          <img :src="`${List.picUrl}?param=200y200`" alt="" />
          <span></span>
        </div>
        <div class="cnt">
          <div class="c_tit">
            <i></i>
            <h2>{{ List.name }}</h2>
          </div>
          <div class="user">
            <img :src="`${dj.avatarUrl}?param=35y35`" alt="" />
            <span>{{ dj.nickname }}</span>
          </div>
          <div class="btns">
            <a href="javascript:;" class="f_flag">
              <span>订阅({{ List.subCount }})</span>
            </a>
            <a href="javascript:;" class="f_flag1" @click="Play"
              ><span>播放全部</span></a
            >
            <a href="javascript:;" class="btn3 bg1">
              <span>分享({{ List.shareCount }})</span>
            </a>
          </div>
          <p>
            <router-link :to="'/discover/djradio/category?id=' + List.categoryId">{{
              List.category
            }}</router-link>
            {{ List.desc }}
          </p>
        </div>
      </div>
      <div class="n_songtb"></div>
    </div>
    <div class="dj_r"></div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
export default {
  setup() {
    const {
      query: { id: id },
    } = useRoute();
    const Djs = reactive({
      List: [],
      dj: [],
      songList:[],
      count:0,
      async getList(id) {
        await axios.get("/api/dj/detail?rid=" + id).then((res) => {
          this.List = res.data;
          this.dj = res.data.dj;
        });
      },
      async getSongList(id){
        await axios.get("/api/dj/program?limit=999&rid="+id).then((res) => {
          console.log(res.programs);
          this.songList = res.programs
          this.count = res.count
        });
      }
    });
    Djs.getList(id);
    Djs.getSongList(id);
    return {
      ...toRefs(Djs),
    };
  },
};
</script>

<style lang="less" scoped>
.djs_List {
  width: 982px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .djs_l {
    width: 709px;
    border-right: 1px solid #d3d3d3;
    padding: 47px 30px 40px 39px;
    .djs_tit {
      width: 640px;
      height: 200px;
      .djs_img {
        float: left;
        width: 200px;
        height: 200px;
        margin: 0 -220px 0 0;
        position: relative;
        img {
          width: 200px;
          height: 200px;
        }
        span {
          display: block;
          position: absolute;
          width: 208px;
          height: 208px;
          background: url("../../../../public/static/coverall.png") no-repeat;
          background-position: 0 -1285px;
          top: -4px;
          left: -4px;
        }
      }
      .cnt {
        margin-left: 230px;
        .c_tit {
          margin: 0 0 12px;
          line-height: 24px;
          display: flex;
          i {
            float: left;
            display: block;
            width: 55px;
            height: 24px;
            background: url("../../../../public/static/icon.png") no-repeat;
            background-position: 0 -1014px;
          }
          h2 {
            float: left;
            width: 346px;
            line-height: 24px;
            font-size: 20px;
            font-weight: normal;
            margin: 0;
            margin-left: 9px;
            margin-top: 1px;
          }
        }
        .user {
          margin: 0 0 20px;
          height: 35px;
          line-height: 35px;
          img {
            float: left;
            width: 35px;
            height: 35px;
            margin-right: 10px;
          }
          span {
            float: left;
            display: block;
            height: 35px;
            line-height: 35px;
            color: #0c73c2;
            padding-right: 2px;
          }
        }
        .btns {
          margin-bottom: 25px;
          margin-right: -10px;
          height: 31px;
          .f_flag {
            float: left;
            display: block;
            margin-right: 5px;
            height: 31px;
            overflow: hidden;
            line-height: 31px;
            color: #fff;
            padding: 0 5px 0 0;
            white-space: nowrap;
            min-width: 23px;
            background: url("../../../../public/static/button2.png") no-repeat;
            background-position: right -2163px;
            span {
              display: inline-block;
              height: 31px;
              min-width: 23px;
              overflow: hidden;
              line-height: 31px;
              padding: 0 7px 0 30px;
              background: url("../../../../public/static/button2.png") no-repeat;
              background-position: 0 -2125px;
            }
          }
          .f_flag1 {
            float: left;
            display: block;
            margin-right: 5px;
            height: 31px;
            overflow: hidden;
            line-height: 31px;
            color: #333;
            padding: 0 5px 0 0;
            white-space: nowrap;
            min-width: 23px;
            background: url("../../../../public/static/button2.png") no-repeat;
            background-position: right -2325px;
            span {
              display: inline-block;
              height: 31px;
              min-width: 23px;
              overflow: hidden;
              line-height: 31px;
              padding: 0 7px 0 30px;
              background: url("../../../../public/static/button2.png") no-repeat;

              background-position: 0 -2285px;
            }
          }
          .f_flag1:hover {
            background-position-y: -2720px;
            span {
              background-position: 0 -2680px;
            }
          }
          .f_flag:hover {
            background-position-y: -2558px;
            span {
              background-position: 0 -2516px;
            }
          }
          .btn3 {
            float: left;
            display: block;
            padding-right: 5px;
            margin-right: 6px;
            color: #333;
            background: url("../../../../public/static/button2.png") no-repeat;
            background-position: right -1020px;
            span {
              display: block;
              float: left;
              height: 31px;
              line-height: 30px;
              min-width: 23px;
              padding-right: 2px;
              padding-left: 28px;
              cursor: pointer;
              background: url("../../../../public/static/button2.png") no-repeat;
              background-position: 0 -977px;
            }
          }
          .btn3:hover {
            background-position: right -1106px;
            span {
              background-position: 0 -1063px;
            }
          }
          .bg1 span {
            background-position: 0 -1225px;
          }
          .bg1:hover span {
            background-position: 0 -1268px;
          }
        }
        p {
          margin-top: 4px;
          line-height: 18px;
          color: #666;
          margin: 0;
          a {
            display: inline-block;
            height: 16px;
            overflow: hidden;
            padding: 0 6px;
            border: 1px solid #999;
            line-height: 16px;
            color: #999;
            vertical-align: middle;
            font-size: 12px;
            margin: -3px 9px 0 0;
            color: #cc0000;
            border-color: #cc0000;
          }
          a:hover {
            background-color: rgba(238, 174, 174, 0.2);
          }
        }
      }
    }
    .n_songtb {
      width: 640px;
      margin-top: 27px;
    }
  }
  .djs_r {
    width: 270px;
  }
}
</style>