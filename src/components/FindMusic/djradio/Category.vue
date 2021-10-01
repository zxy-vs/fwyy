<template>
  <div class="new">
    <div class="n_title">
      <h3>优秀新电台</h3>
    </div>
    <ul class="n_m_list" v-if="TList.length">
      <li v-for="(item, index) of TList" :key="index">
        <router-link v-if="item" :to="'/djradio?id=' + item.id" class="n_img">
          <img v-lazy="`${item.picUrl}?param=200y200`" alt="" />
        </router-link>
        <router-link v-if="item" :to="'/djradio?id=' + item.id" class="n_f">{{
          item.name
        }}</router-link>
        <p v-if="item">{{ item.rcmdtext }}</p>
      </li>
    </ul>
    <div class="rdimore">
      <div class="n_title">
        <h3>电台排行榜</h3>
      </div>
      <ul class="rdilist" v-if="RList.length">
        <li v-for="(item, index) of RList" :key="index">
          <router-link :to="'/djradio?id=' + item.id" class="djs_img">
            <img :src="`${item.picUrl}?param=200y200`" alt="" />
          </router-link>
          <div class="cnt">
            <router-link :to="'/djradio?id=' + item.id">{{
              item.name
            }}</router-link>
            <p class="note">
              <i></i>
              <router-link :to="'/djradio?id=' + item.id">{{
                item.dj.nickname
              }}</router-link>
              <img
                src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png"
                alt=""
              />
            </p>
            <p>
              共{{ item.programCount }}期&nbsp;&nbsp;&nbsp;&nbsp;订阅{{
                item.subCount
              }}次
            </p>
          </div>
        </li>
      </ul>
      <div class="PL_pag">
        <a-pagination v-model:current="current" :total="total" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { watchEffect } from "@vue/runtime-core";
export default {
  setup() {
    const Route = useRoute();
    const Cat = reactive({
      TList: [],
      RList: [],
      current: 1,
      total: 0,
      async getTList(id) {
        await axios.get("/api/dj/recommend/type?type=" + id).then((res) => {
          console.log(res);
          this.TList = res.djRadios;
          this.TList.length = 5;
        });
      },
      async getRList(id, offset = 0) {
        await axios
          .get(`/api/dj/radio/hot?cateId=${id}&limit=30&offset=${offset * 30}`)
          .then((res) => {
            console.log(res);
            this.RList = res.djRadios;
            this.total = Math.ceil((res.count / 30) * 10);
          });
      },
    });
    watchEffect(() => {
      if (Route.path == "/discover/djradio/category") {
        Cat.getTList(Route.query.id);
        Cat.getRList(Route.query.id, Cat.current - 1);
      }
    });
    return {
      ...toRefs(Cat),
    };
  },
};
</script>

<style lang="less" scoped>
.new {
  margin-top: 10px;
  width: 100%;
  .n_title {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      font-size: 24px;
      line-height: 28px;
      margin: 0;
    }
  }
  .n_m_list {
    margin: 16px 0 0 -37px;
    width: 937px;
    height: 221px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 150px;
      margin-left: 37px;
      .n_img {
        display: block;
        width: 150px;
        height: 150px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .n_f {
        display: block;
        width: 100%;
        margin: 13px 0 6px;
        line-height: 16px;
        font-size: 14px;
        font-weight: normal;
        color: #333;
      }
      a:hover {
        text-decoration: underline;
      }
      p {
        color: #999;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .rdimore {
    margin-top: 35px;
    .rdilist {
      margin-left: -30px;
      width: 930px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 435px;
        height: 160px;
        margin-left: 30px;
        padding: 20px 0;
        border-bottom: 1px solid #e7e7e7;
        .djs_img {
          float: left;
          display: block;
          margin-right: -200px;
          width: 120px;
          height: 120px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .cnt {
          margin-left: 140px;
          a {
            display: block;
            height: 64px;
            margin: 0;
            line-height: 64px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }
          a:hover {
            text-decoration: underline;
          }
          p {
            color: #999;
          }
          .note {
            margin-bottom: 6px;
            line-height: 20px;
            i {
              float: left;
              display: block;
              width: 14px;
              height: 15px;
              margin: 2px 0 0;
              background: url("../../../../public/static/icon.png") no-repeat;
              background-position: -50px -300px;
            }
            a {
              float: left;
              display: inline;
              font-size: 12px;
              height: 20px;
              font-weight: lighter;
              line-height: 20px;
              margin-left: 5px;
              vertical-align: middle;
              color: #333;
            }
            img {
              height: 13px;
              width: 13px;
              margin-left: 5px;
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .PL_pag {
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>