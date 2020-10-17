<template>
  <div>
    <van-toast id="van-toast" />
    <van-notify id="van-notify" />
    <van-panel :title="order.orderSn" :desc="order.desc" use-footer-slot>
      <view>
        <div v-for="(orderItem,orderItemIndex) in order.shopOrderItems" :key="orderItem.id" :index="orderItemIndex">
          <van-card :num="orderItem.variationQuantityPurchased" :price="orderItem.variationOriginalPrice"
            :desc="orderItem.desc" :title="orderItem.itemName" :thumb="orderItem.itemImage"
            :tag="orderItem.signStatusDesc">
            <view slot="footer">
              <van-cell-group>
                <van-field required clearable label="快递单号" :value="orderItem.logisticsNumber" placeholder="请输入快递单号"
                  autosize :disabled="orderItem.logisticsTransfer=='平台中转仓'"
                  @input="orderItem.logisticsNumber=$event.mp.detail" />
              </van-cell-group>
            </view>
          </van-card>
        </div>
      </view>
    </van-panel>
    <div>
      <van-switch :checked="foamChecked" size="24px" />

    </div>
    <van-submit-bar :price="cost" label="预扣费明细" :tip="tip" button-text="提交" @submit="onSubmit" />
  </div>
</template>

<script>
  import utils from '@/utils/index'
  import Toast from "../../../static/vant/toast/toast"
  import Notify from '../../../static/vant/notify/notify';
  export default {
    data() {
      return {
        order: {},
        params: {},
        cost: 200,
        show: false,
        orderItemId: -1,
        tip: '',
        foamChecked: false,
        boxChecked: false
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
          order.shopOrderItems.length > 3 ? this.cost = 300 : this.cost = 200;
          order.packCost = this.cost / 100;
          this.tip = '打包费用: ' + order.packCost + " 元,";
          this.order = order;
        }
      });
    },
    methods: {
      onSubmit() {
        let order = this.order;
        if (order.shopOrderItems) {
          for (let orderItem of order.shopOrderItems) {
            if (!orderItem.logisticsTransfer) {
              orderItem.logisticsTransfer = '其他（快递公司已留言）';
            }
            if (!orderItem.logisticsNumber || orderItem.logisticsNumber.trim() == '') {
              Notify({
                type: 'danger',
                message: '快递单号未填写完整'
              });
              return;
            }
            if (orderItem.logisticsTransfer != '平台中转仓' && orderItem.logisticsNumber.trim() == '无需填写快递单，使用已寄存商品') {
              orderItem.logisticsNumber = '仍未填写'
            }
          }
        }
        order.boxCost = 0;
        order.foamCost = 0;
        order.shopOrderItems.length > 3 ? this.cost = 300 : this.cost = 200;
        order.packCost = this.cost / 100;
        console.log(order);

      },
      onShowLogisticsNumDialog(id) {
        this.orderItemId = id;
        this.show = true;
      }
    }
  }

</script>

<style>

</style>
