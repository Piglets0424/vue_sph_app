<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            // 间距
            spaceBetween: 30,
            centeredSlides: true,
            // 自动播放
            autoplay: {
              delay: 2500,
              disableOnInteraction: false,
            },
            // 循环模式选项
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小球切换
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
.swiper-pagination-bullet-active {
  background-color: #fff !important;
}
.swiper-button-next,
.swiper-button-prev {
  color: #fff !important;
}
</style>