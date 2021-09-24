<template>
  <div>
    <div class="R_tabel_header">
      <h2>包含歌曲列表</h2>
      <span>{{ quan.size}}首歌</span>
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
import { Times } from "../../../untils/TimeTran";
import { useRouter } from "vue-router";
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
        width: 325,
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
        width: 128,
        dataIndex: "ar",
        customRender({ text }) {
            if(text.length>1){
                return text[0].name+'/'+text[1].name
            }
          return text[0].name;
        },
        ellipsis: true,
      },
    ];
    const Router = useRouter();
    const customRow = (record, index) => {
      return {
        onclick: () => {
          Router.push("/song?id=" + props.data[index].id);
        },
      };
    };

    return {
      columns,
      customRow,
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