<template>
  <div class="pagination">
    <!-- 左侧部分 -->
    <template>
      <button
        :disabled="pageNo == 1"
        @click="$emit('changePageNo', pageNo - 1)"
      >
        上一页
      </button>
      <button
        v-show="stratNumAndEndNum.stratNum > 1"
        @click="$emit('changePageNo', 1)"
        :class="{ active: pageNo == 1 }"
      >
        1
      </button>
      <button v-show="stratNumAndEndNum.stratNum > 2">...</button>
    </template>

    <!-- 中间部分 -->
    <template v-for="(pageNum, index) in stratNumAndEndNum.endNum">
      <button
        v-if="pageNum >= stratNumAndEndNum.stratNum"
        :key="index"
        @click="$emit('changePageNo', pageNum)"
        :class="{ active: pageNo == pageNum }"
      >
        {{ pageNum }}
      </button>
    </template>

    <!-- 右侧部分 -->
    <template>
      <button v-show="stratNumAndEndNum.endNum < totalPage - 1">···</button>
      <button
        v-show="stratNumAndEndNum.endNum < totalPage"
        @click="$emit('changePageNo', totalPage)"
        :class="{ active: pageNo == totalPage }"
      >
        {{ totalPage }}
      </button>
      <button
        :disabled="pageNo == totalPage"
        @click="$emit('changePageNo', pageNo + 1)"
      >
        下一页
      </button>
    </template>

    <select v-model.number="newPageSize">
      <option
        :value="sizeArr"
        v-for="(sizeArr, index) in pageSizeArr"
        :key="index"
      >
        {{ sizeArr }}条/页
      </option>
    </select>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues", "pageSizeArr"],
  data() {
    return {
      newPageSize: this.pageSize,
    };
  },
  computed: {
    // 共多少页
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续起始页
    stratNumAndEndNum() {
      let { pageNo, totalPage, continues } = this;
      let stratNum = 0,
        endNum = 0;

      // 先判断连续页数是否大于总页数
      if (continues > totalPage) {
        stratNum = 1;
        endNum = totalPage;
      } else {
        // 向下取整
        stratNum = pageNo - parseInt(continues / 2);
        endNum = pageNo + parseInt(continues / 2);
        //   当当前页为1,2时
        if (stratNum < 1) {
          stratNum = 1;
          endNum = continues;
        }
        // 当当前页页为最后两页时
        if (endNum > totalPage) {
          stratNum = totalPage - continues + 1;
          endNum = totalPage;
        }
      }
      return { stratNum, endNum };
    },
  },
  watch: {
    newPageSize: {
      handler(newValue) {
        // console.log(newValue);
        this.$emit("changePageSize", newValue);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  select {
    outline: none;
    border: none;
    height: 28px;
    line-height: 28px;
    background-color: #f4f4f5;
    color: #606266;
    margin-left: 20px;
  }
}
</style>
