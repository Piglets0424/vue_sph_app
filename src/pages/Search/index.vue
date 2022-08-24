<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isActive1 }" @click="changeSort('1')">
                  <a href="javaScript:;"
                    >综合<i
                      v-show="isActive1"
                      class="iconfont"
                      :class="{ 'icon-up': isUp, 'icon-down1': isDown }"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: isActive2 }" @click="changeSort('2')">
                  <a href="javaScript:;"
                    >价格<i
                      v-show="isActive2"
                      class="iconfont"
                      :class="{ 'icon-up': isUp, 'icon-down1': isDown }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div @click="routeDetail(goods.id)">
                    <div class="p-img">
                      <a href="javascript:;"><img v-lazy="goods.defaultImg" /></a>
                    </div>
                    <div class="price">
                      <strong>
                        <i>¥{{ goods.price }}.00</i>
                      </strong>
                    </div>
                    <div class="attr">
                      <a href="javascript:;" :title="goods.title">{{
                        goods.title
                      }}</a>
                    </div>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="javascript:;"
                      class="sui-btn btn-bordered btn-danger"
                      @click="addShopCart(goods)"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="searchList.total"
            :continues="5"
            :pageSizeArr=[5,10,15,20]
            @changePageNo="changePageNo"
            @changePageSize="changePageSize"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  components: { SearchSelector },
  data() {
    return {
      searchParams: {
        // 一级分类id
        category1Id: "",
        // 二级分类id
        category2Id: "",
        // 三级分类id
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键词
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器 当前页
        pageNo: 1,
        // 每一页数据数量
        pageSize: 10,
        // 属性
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  computed: {
    ...mapState("search", ["searchList"]),
    ...mapGetters("search", ["goodsList"]),
    isActive1() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isActive2() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isUp() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDown() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    //设置id为undefined 请求时不会携带该参数
    removeid() {
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    // 获取数据
    getData(params) {
      this.$store.dispatch("search/getSearchList", params);
      this.removeid();
    },
    // 删除分类名字
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.removeid();
      this.$router.push({
        name: "search",
        params: {
          keyword: this.$route.params.keyword,
        },
      });
    },
    // 删除关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.removeid();
      this.$router.push({
        name: "search",
        query: this.$route.query,
      });
      //通过事件总线 删除搜索框内容
      this.$bus.$emit("clearKeyword");
    },
    // 点击品牌事件
    trademarkInfo(trademark) {
      // console.log(trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData(this.searchParams);
    },
    removeTrademark() {
      // 这里不设置成undefined是因为会报错
      this.searchParams.trademark = "";
      this.getData(this.searchParams);
    },
    // 点击售卖属性事件
    attrInfo(attrInfo) {
      if (this.searchParams.props.indexOf(attrInfo) == -1) {
        this.searchParams.props.push(attrInfo);
      }
      this.getData(this.searchParams);
    },
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData(this.searchParams);
    },
    // 排序事件
    changeSort(flag) {
      // flag判断点击的哪一个
      // console.log(flag);
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      // console.log(originFlag,originSort);
      let newOrder = "";
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      this.getData(this.searchParams);
    },
    //改变当前页
    changePageNo(pageNo) {
      // console.log(pageNo);
      this.searchParams.pageNo = pageNo;
      this.getData(this.searchParams);
    },
    // 改变每页数量
    changePageSize(pageSize) {
      // console.log(pageSize);
      this.searchParams.pageSize = pageSize;
      this.getData(this.searchParams);
    },
    // 路由跳转事件
    routeDetail(goodsId) {
      this.$router.push({
        name: "detail",
        params: {
          goodsId: goodsId,
        },
      });
    },
    // 加入购物车
    addShopCart(goods) {
      this.$store.dispatch("detail/getGoodsDetail", goods.id).then(() => {
        let result = this.$store.getters["detail/skuInfo"];
        sessionStorage.setItem("skuInfo", JSON.stringify(result));
      });

      this.$store
        .dispatch("detail/getShopCarData", {
          skuId: goods.id,
          skuNum: 1,
        })
        .then(() => {
          // 路由跳转
          this.$router.push({
            name: "addcartsuccess",
            query: {
              skuNum: 1,
            },
          });
        })
        .catch((error) => {
          alert(error, "添加失败");
        });
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        // 合并对象
        Object.assign(this.searchParams, this.$route.params, this.$route.query);
        this.getData(this.searchParams);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>