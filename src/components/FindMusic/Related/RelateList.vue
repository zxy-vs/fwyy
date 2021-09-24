<template>
  <div>
    <div class="R_tabel_header">
      <h2>歌曲列表</h2>
      <span>{{ quan.trackCount }}首歌</span>
      <span class="header_r">播放：{{ quan.playCount }}次</span>
    </div>
    <a-table
      size="small"
      :pagination="false"
      class="ant-table-striped"
      :columns="columns"
      :data-source="data"
      bordered
      rowKey="id"
      :rowClassName="
        (record, index) => (index % 2 === 1 ? 'table-striped' : null)
      "
      :customRow="customRow"
    >
    </a-table>
  </div>
</template>
<script>
import { nextTick, onMounted, ref, toRef } from "@vue/runtime-core";
import { Times } from "../../../untils/TimeTran";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
export default {
  props: ["quan", "data"],
  setup(props) {
    const columns = [
      {
        title: "",
        width: 74,
        dataIndex: "id",
        customRender({ index }) {
          return index + 1;
        },
        ellipsis: true,
      },
      {
        title: "歌曲标题",
        width: 235,
        dataIndex: "name",
        ellipsis: true,
      },
      {
        title: "时长",
        width: 111,
        dataIndex: "dt",
        customRender({ text }) {
          return Times(text);
        },
        ellipsis: true,
      },
      {
        title: "歌手",
        width: 90,
        dataIndex: "ar[0].name",
        ellipsis: true,
      },
      {
        title: "专辑",
        width: 128,
        dataIndex: "al.name",
        ellipsis: true,
      },
    ];
      const Router = useRouter();
// const {state} = useStore()
// const indexs = toRef(state,'index')
    const customRow = (record, index) => {
      return {
        onclick: () => {
          // indexs.value = index
          Router.push('/song?id='+props.data[index].id)
        },
      };
    };
    
    return {
      columns,
      customRow
    };
  },
};
</script>
<style lang="less" scoped>
.R_tabel_header {
  width: 100%;
  height: 35px;
  border-bottom: 2px solid #c20c0c;
  h2 {
    float: left;
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 12px;
  }
  span {
    float: left;
    margin: 9px 0 0 20px;
  }
  .header_r {
    float: right;
  }
}

.ant-table-striped :deep(.table-striped) {
  background-color: #fafafa;
}
</style>