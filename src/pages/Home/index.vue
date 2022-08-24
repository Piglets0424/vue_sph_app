<!-- 主页组件 -->

<template>
  <div>
    <!-- 商品分类导航组件 -->
    <TypeNav></TypeNav>
    <!-- 列表组件 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐组件 -->
    <Recommend></Recommend>
    <!-- 商品排行组件 -->
    <Rank></Rank>
    <!-- 猜你喜欢组件 -->
    <Like></Like>
    <!-- 楼层组件 -->
    <Floor v-for="floor in floorList" :key="floor.id" :floorList="floor"></Floor>
    <!-- 商标组件 -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer/index.vue";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
import { mapState } from 'vuex';

export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    // 委派action vuex获取数据
    this.$store.dispatch("home/getFloorList");
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
};
</script>

<style lang="less" scoped>
</style>