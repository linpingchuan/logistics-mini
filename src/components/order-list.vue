<template>
  <div>
    <van-search :value="searchName" placeholder="单号/名字/客户地址" @search="onRefreshList" @change="onSearchChange">
    </van-search>
    <div class="order-list-container">
      <div v-for="(order,index) in orders" :key="order.orderSn" :index="index" class="order-container">
        <van-panel :title="order.orderSn" :desc="order.desc" use-footer-slot>
          <view>
            <div v-for="(orderItem,orderItemIndex) in order.shopOrderItems" :key="orderItem.id" :index="orderItemIndex">
              <van-card :num="orderItem.variationQuantityPurchased" :price="orderItem.variationOriginalPrice"
                :desc="orderItem.desc" :title="orderItem.itemName" :thumb="orderItem.itemImage"
                :tag="orderItem.signStatusDesc">
              </van-card>
            </div>
          </view>
          <view slot="footer">
            <div style="display:flex;justify-content:flex-end;">
              <van-button size="mini" type="primary" @click="copyOrderSn(order.orderSn)" style="margin: 0 4px;">复制订单编号
              </van-button>
              <van-button type="info" size="mini" v-if="!order.packStatus"
                @click="onOpenOrderDetail(order.orderSn,order.shopId)" style="margin: 0 4px;">
                提交快递单号</van-button>
              <!-- <van-button type="warning" size="mini" v-if="order.packStatus=='待打包'"
              @click="onOpenOrderDetail(order.orderSn,order.shopId)" style="margin: 0 4px;">
              修改快递单号</van-button> -->
            </div>
          </view>
        </van-panel>
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '@/utils/index'
  export default {
    props: ['orderType'],
    data() {
      return {
        page: 0,
        orders: [],
        params: {},
        searchName: '',
        show: false,
        logisticsNumber: '',
        orderSn: ''
      }
    },
    mounted() {

    },
    onLoad() {
      this.onRefreshList();
    },
    onPullDownRefresh() {
      this.page = this.page + 1;
      this.onRefreshList();
      wx.stopPullDownRefresh();
    },
    onReachBottom() {
      if (this.page > 0) {
        this.page = this.page == 0 ? 0 : this.page - 1;
        this.onRefreshList()
      }
    },
    methods: {
      onSearchChange(e) {
        this.searchName = e.mp.detail;
      },
      onRefreshList() {
        this.orders = [];
        let accountKey = wx.getStorageSync('accountKey')
        if (accountKey) {
          if (this.orderType == 0) {
            this.params = {
              wxOnlineKey: accountKey,
              page: this.page,
              "shopeeOrderStatus": ["READY_TO_SHIP"],
              "packUpOrder": true,
              "hotLogisticsStatus": [],
              "shopValue": [],
              searchName: ''
            }
          }
          if (this.orderType == 1) {
            this.params = {
              wxOnlineKey: accountKey,
              page: this.page,
              "shopeeOrderStatus": ["READY_TO_SHIP"],
              "packStatus": ["ready"],
              "shopValue": [],
              "supplierStatus": null,
              searchName: ''
            }
          }
          if (this.orderType == 2) {
            this.params = {
              wxOnlineKey: accountKey,
              page: this.page,
              "packStatus": ["all"],
              "shopValue": [],
              searchName: ''
            }
          }
          if (this.searchName && this.searchName != '') {
            this.params.searchName = this.searchName;
          }
          this.onRefreshOrder();
        }
      },
      onOpenOrderDetail(orderSn, shopId) {
        this.orderSn = orderSn;
        mpvue.navigateTo({
          url: '/pages/order-detail/main?orderSn=' + this.orderSn + "&shopId=" + shopId
        })
      },
      copyOrderSn(orderSn) {
        let text = orderSn;
        wx.setClipboardData({
          data: text,
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
                wx.showToast({
                  title: '复制成功'
                })
              }
            })
          }
        })
      },
      onRefreshOrder() {
        wx.request({
          url: utils.host + '/shop-order-list',
          method: 'POST',
          data: this.params,
          success: (res) => {
            let data = res.data.data;
            if (data.last) {
              this.page = this.page - 1;
            }
            if (this.orders.length == 0 && data.content.length > 0) {
              this.orders = data.content;
            }
            if (this.orders)
              for (let order of this.orders) {
                order.desc = "店铺：" + order.shopName + "【" + order.country + "】"
                if (order.shopOrderItems) {
                  for (let orderItem of order.shopOrderItems) {
                    if (orderItem.logisticsNumber) {
                      orderItem.desc = orderItem.logisticsNumber + '【' + orderItem
                        .logisticsTransfer + '】'
                      if (order.packStatus) {
                        if (!orderItem.signInStatus) {
                          orderItem.signStatusDesc = "未签收"
                        } else {
                          orderItem.signStatusDesc = "已签收"
                        }
                      }
                    }
                  }
                }

              }
          }
        })


      }
    }
  }

</script>
<style>
  .order-list-container {
    background-color: #f7f8fa;
    margin-bottom: 80px;
  }

  .order-container {
    background-color: #fff;
  }

</style>
