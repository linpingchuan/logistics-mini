<template>
  <div>
    <van-panel :title="order.orderSn" :desc="order.desc" use-footer-slot>
      <view>
        <div v-for="(orderItem,orderItemIndex) in order.shopOrderItems" :key="orderItem.id" :index="orderItemIndex">
          <van-card :num="orderItem.variationQuantityPurchased" :price="orderItem.variationOriginalPrice"
            :desc="orderItem.desc" :title="orderItem.itemName" :thumb="orderItem.itemImage"
            :tag="orderItem.signStatusDesc">
          </van-card>
        </div>
      </view>

    </van-panel>
  </div>
</template>

<script>
  import utils from '@/utils/index'

  export default {
    data() {
      return {
        order: {},
        params: {}
      }
    },
    onLoad(options) {
      this.params.orderSn = options.orderSn;
      this.params.shopId = options.shopId;
      let accountKey = wx.getStorageSync('accountKey');
      this.params.wxOnlineKey = accountKey;
      wx.request({
        url: utils.host + '/shop-order-detail',
        method: 'POST',
        data: this.params,
        success: (res) => {
          let order = res.data.data;
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
          this.order = order;
          console.log(this.order)
        }
      });
    }
  }

</script>

<style>

</style>
