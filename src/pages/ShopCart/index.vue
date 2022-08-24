<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="shopCartInfo in shopCartInfoList"
          :key="shopCartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopCartInfo.isChecked == 1"
              @change="toggleChecked(shopCartInfo.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shopCartInfo.imgUrl" />
            <div class="item-msg">
              {{ shopCartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shopCartInfo.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handlerNum('mins', -1, shopCartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="shopCartInfo.skuNum"
              @change="
                handlerNum('change', $event.target.value * 1, shopCartInfo)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handlerNum('plus', 1, shopCartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{
              shopCartInfo.cartPrice * shopCartInfo.skuNum
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="deleteCart(shopCartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && shopCartInfoList.length > 0"
          @change="handlerChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ chooseTotalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  mounted() {
    this.getdata();
  },
  computed: {
    ...mapGetters("shopCart", ["cartList"]),
    shopCartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 选择商品数量
    chooseTotalNum() {
      let i = 0;
      this.shopCartInfoList.forEach((item) => {
        item.isChecked == 1 ? i++ : (i += 0);
      });
      return i;
    },
    // 总价
    totalPrice() {
      let sum = 0;
      this.shopCartInfoList.forEach((item) => {
        item.isChecked == 1 ? (sum += item.cartPrice * item.skuNum) : sum;
      });
      return sum;
    },
    // 是否全选
    isAllChecked() {
      return this.shopCartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    getdata() {
      this.$store.dispatch("shopCart/getShopCartList");
    },
    // disNum带给服务器的数据  变化量
    handlerNum: throttle(function (type, disNum, shopCartInfo) {
      switch (type) {
        case "plus":
          disNum = 1;
          break;
        case "mins":
          disNum = shopCartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - shopCartInfo.skuNum;
          }
          break;
      }
      this.$store
        .dispatch("detail/getShopCarData", {
          skuId: shopCartInfo.skuId,
          skuNum: disNum,
        })
        .then(() => {
          this.getdata();
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000),
    /*     // handlerNum(type, disNum, shopCartInfo) {
    //   // console.log(type,disNum,skuId);
    //   switch (type) {
    //     case "plus":
    //       disNum = 1;
    //       break;
    //     case "mins":
    //       disNum = shopCartInfo.skuNum > 1 ? -1 : 0;
    //       break;
    //     case "change":
    //       if (isNaN(disNum) || disNum < 1) {
    //         disNum = 0;
    //       } else {
    //         disNum = parseInt(disNum) - shopCartInfo.skuNum;
    //       }
    //       break;

    //   }
    //   // try {
    //   //   this.$store.dispatch("detail/getShopCarData", {
    //   //     skuId: shopCartInfo.skuId,
    //   //     skuNum: disNum,
    //   //   });
    //   //   this.$store.dispatch("shopCart/getShopCartList");
    //   // } catch (error) {}

    //   this.$store
    //     .dispatch("detail/getShopCarData", {
    //       skuId: shopCartInfo.skuId,
    //       skuNum: disNum,
    //     })
    //     .then(() => {
    //       this.getdata();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, */

    // 删除商品
    deleteCart(id) {
      this.$store
        .dispatch("shopCart/deleteCartById", id)
        .then(() => {
          this.getdata();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除选中的商品
    deleteAllChecked() {
      //  this.shopCartInfoList.forEach((item)=>{
      //   if (item.isChecked) {
      //     this.deleteCart(item.skuId)
      //   }
      // })
      this.$store
        .dispatch("shopCart/deleteAllCheckedCart")
        .then(() => {
          this.getdata();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 勾选状态
    toggleChecked(skuId, event) {
      this.$store
        .dispatch("shopCart/toggleIsChecked", {
          skuId,
          isChecked: event.target.checked ? 1 : 0,
        })
        .then(() => {
          this.getdata();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 全选与全部选
    handlerChecked(event) {
      this.shopCartInfoList.forEach((item) => {
        this.toggleChecked(item.skuId, event);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
            &:hover {
              color: #c81623;
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;

        &:hover {
          color: #c81623;
          cursor: pointer;
        }
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>