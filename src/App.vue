<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    // 通知vuex发送请求,获取数据,将数据存在仓库中
    this.$store.dispatch("home/categorytList");
  },
};
</script>