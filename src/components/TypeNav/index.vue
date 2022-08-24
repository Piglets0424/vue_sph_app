<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveEvent" @mouseenter="showSort">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画标签 -->
        <transition name="sort">
          <div class="sort" v-show="sortShow">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(Amenu, index) in categorytList"
                :key="Amenu.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    href="javaScript:;"
                    :data-categoryName="Amenu.categoryName"
                    :data-categoryAmenuId="Amenu.categoryId"
                    >{{ Amenu.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="Bmenu in Amenu.categoryChild"
                    :key="Bmenu.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          href="javaScript:;"
                          :data-categoryName="Bmenu.categoryName"
                          :data-categoryBmenuId="Bmenu.categoryId"
                          >{{ Bmenu.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="Cmenu in Bmenu.categoryChild"
                          :key="Cmenu.categoryId"
                        >
                          <a
                            href="javaScript:;"
                            :data-categoryName="Cmenu.categoryName"
                            :data-categoryCmenuId="Cmenu.categoryId"
                            >{{ Cmenu.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from "lodash";
// 按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  // 当组件挂在完毕 向服务器发送请求
  data() {
    return {
      // 鼠标经过的一级分类
      currentIndex: -1,
      // 列表是否展示
      sortShow: true,
    };
  },
  mounted() {
    // 通知vuex发送请求,获取数据,将数据存在仓库中
    // console.log(this.$store.dispatch);
    // this.$store.dispatch("home/categorytList");
    // 性能优化将其放在跟组件中只执行一次

    // 判断路由列表是否隐藏
    // 判断是否具有字符串'/search'
    // console.log(this.$route.path.includes('/search'));
    // console.log(this.$route.path);
    if (
      this.$route.path.includes("/search") ||
      this.$route.path.includes("/detail")
    ) {
      this.sortShow = false;
    }
  },
  computed: {
    ...mapState("home", ["categorytList"]),
  },
  methods: {
    // changeIndex(index) {
    //   this.currentIndex = index;
    // },
    // 节流操作
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log(this);
    },20),
    // 鼠标离开事件
    leaveEvent() {
      this.currentIndex = -1;
      // 在search组件中隐藏列表
      if (
        this.$route.path.includes("/search") ||
        this.$route.path.includes("/detail")
      )
        this.sortShow = false;
    },
    // 路由跳转
    goSearch(event) {
      // this.$router.push({
      //   name: "search",
      // });
      // event.target节点标签   dataset属性可以获取自定义属性和属性值
      // console.log(event.target.dataset);
      let { categoryname, categoryamenuid, categorybmenuid, categorycmenuid } =
        event.target.dataset;
      let querys = { categoryName: categoryname };
      if (categoryname) {
        if (categoryamenuid) {
          querys.category1Id = categoryamenuid;
        } else if (categorybmenuid) {
          querys.category2Id = categorybmenuid;
        } else {
          querys.category3Id = categorycmenuid;
        }
      }
      this.$router.push({
        name: "search",
        query: querys,
        // 合并参数
        params: this.$route.params,
      });
    },
    // 展示列表
    showSort() {
      this.sortShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            height: 27px;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          h3 {
            background-color: #e1251b;
            a {
              color: #fff;
            }
          }
        }
      }
    }
    // 过渡动画
    // 进入起点 离开终点
    .sort-enter,
    .sort-leave-to {
      opacity: 0;
      height: 0px;
    }
    // 进入终点 离开起点
    .sort-enter-to,
    .sort-leave {
      opacity: 1;
      height: 461px;
    }
    // 进入过程 离开过程
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.2s;
    }
  }
}
</style>