<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" ref="img" />
    <div class="event" @mousemove="handler"></div>
    <!-- 右侧大图 -->
    <div class="big" ref="box">
      <img :src="imgObj.imgUrl" ref="bigImg" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    imgObj: {
      get() {
        return this.skuImageList[this.currentIndex] || {};
      },
    },
  },
  methods: {
    //放大镜
    handler(event) {
      let mask = this.$refs.mask;
      // 遮罩层移动距离
      let moveLeft = event.offsetX - mask.offsetWidth / 2;
      let moveTop = event.offsetY - mask.offsetHeight / 2;
      // 图片的宽度与高度
      let imgWidth = this.$refs.img.offsetWidth;
      let imgHeight = this.$refs.img.offsetHeight;
      // 遮罩层最大移动距离
      let moveLeftMax = imgWidth - mask.offsetWidth;
      let moveTopMax = imgHeight - mask.offsetHeight;
      // 约束遮罩层
      if (moveLeft < 0) {
        moveLeft = 0;
      } else if (moveLeft > moveLeftMax) {
        moveLeft = moveLeftMax;
      }
      if (moveTop < 0) {
        moveTop = 0;
      } else if (moveTop > moveTopMax) {
        moveTop = moveTopMax;
      }
      // 设置遮罩层位置
      mask.style.left = moveLeft + "px";
      mask.style.top = moveTop + "px";

      // 大图
      let bigImg = this.$refs.bigImg;
      // 遮罩层移动距离 / 遮罩层移动最大距离 = 大图片移动距离 / 大图移动最大距离
      // 大图片移动距离 = 遮罩层移动距离 * 大图移动最大距离 / 遮罩层移动最大距离
      let bigImgMoveLeftMax = bigImg.offsetWidth - this.$refs.box.offsetWidth;
      let bigImgMoveTopMax = bigImg.offsetHeight - this.$refs.box.offsetHeight;
      // 大图位置   方向与遮罩层相反
      bigImg.style.left = (-moveLeft * bigImgMoveLeftMax) / moveLeftMax + "px";
      bigImg.style.top = (-moveTop * bigImgMoveTopMax) / moveTopMax + "px";
    },
  },
  mounted() {
    this.$bus.$on("changeIndex", (index) => {
      this.currentIndex = index;
    });
  },
  beforeDestroy() {
    this.$bus.$off("changeIndex");
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>