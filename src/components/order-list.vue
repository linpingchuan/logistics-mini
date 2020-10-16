<template>
  <div class="order-list-container">

    <van-dialog use-slot title="快递" :show="show" show-cancel-button @close="onClose" @confirm="updateLogisticsNumber">
      <van-cell-group style="margin:4px 0;">
        <van-field :value="logistics" required clearable label="单号" placeholder="请输入正确的快递单号" />
      </van-cell-group>
    </van-dialog>
    <div v-for="(order,index) in orders" :key="order.orderSn" :index="index" class="order-container">
      <van-panel :title="order.orderSn" :desc="order.desc" use-footer-slot>
        <view>
          <div v-for="(orderItem,orderItemIndex) in order.shopOrderItems" :key="orderItem.id" :index="orderItemIndex">
            <van-card :num="orderItem.variationQuantityPurchased" :price="orderItem.variationOriginalPrice"
              :desc="orderItem.desc" :title="orderItem.itemName" :thumb="orderItem.itemImage"
              :tag="orderItem.signStatusDesc">
              <view slot="footer">
                <van-button type="info" size="mini" v-if="!orderItem.logisticsNumber"
                  @click="onInputLogisticsNumber(orderItem.id)">提交快递单号</van-button>
                <van-button type="warning" size="mini" v-if="orderItem.logisticsNumber && order.packStatus!='全部已打包'"
                  @click="onInputLogisticsNumber(orderItem.id)">修改快递单号</van-button>
              </view>
            </van-card>
          </div>
        </view>
        <view slot="footer">
          <div style="display:flex;justify-content:flex-end;">
            <van-button size="small" round type="info" @click="copyOrderSn(order.orderSn)">复制订单编号
            </van-button>
          </div>
        </view>
      </van-panel>
      <van-divider />
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
        params: [],
        show: false,
        logisticsNumber: '',
      }
    },
    mounted() {
      let accountKey = wx.getStorageSync('accountKey')
      if (accountKey) {
        if (this.orderType == 0) {
          this.params = {
            wxOnlineKey: accountKey,
            page: this.page,
            "shopeeOrderStatus": ["READY_TO_SHIP"],
            "packUpOrder": true,
            "hotLogisticsStatus": [],
            "shopValue": []
          }
        }
        if (this.orderType == 1) {
          this.params = {
            wxOnlineKey: accountKey,
            page: this.page,
            "shopeeOrderStatus": ["READY_TO_SHIP"],
            "packStatus": ["ready"],
            "shopValue": [],
            "supplierStatus": null
          }
        }
        if (this.orderType == 2) {
          this.params = {
            wxOnlineKey: accountKey,
            page: this.page,
            "packStatus": ["all"],
            "shopValue": []
          }
        }
        this.onRefreshOrder();
      }

    },
    methods: {
      onConfirmCompany() {

      },
      onCancel() {
        this.showCompanyList = false;
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
      updateLogisticsNumber() {

      },
      onClose() {
        this.show = false;
      },
      onInputLogisticsNumber(orderItemId) {
        this.show = true;
        this.orderItemId = this.ordreItemId;
      },
      onRefreshOrder() {
        wx.request({
          url: utils.host + '/shop-order-list',
          method: 'POST',
          data: this.params,
          success: (res) => {
            let data = res.data;
            this.orders = data.data.content;
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
  }

  .order-container {
    margin: 5px 0;
    background-color: #fff;
  }

</style>
