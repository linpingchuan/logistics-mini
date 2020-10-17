<template>
  <div>
    <van-toast id="van-toast" />
    <van-notify id="van-notify" />
    <van-overlay :show="showOverLay">
      <div class="wrapper">
        <van-loading size="24px">提交中...</van-loading>
      </div>
    </van-overlay>
    <van-panel :title="order.orderSn" :desc="order.desc" use-footer-slot>
      <view>
        <div v-for="(orderItem,orderItemIndex) in order.shopOrderItems" :key="orderItem.id" :index="orderItemIndex">
          <van-card :num="orderItem.variationQuantityPurchased" :price="orderItem.variationOriginalPrice"
            :desc="orderItem.desc" :title="orderItem.itemName" :thumb="orderItem.itemImage"
            :tag="orderItem.signStatusDesc">
            <view slot="footer">
              <van-cell-group>
                <van-field required clearable label="快递单号" :value="orderItem.logisticsNumber" autosize
                  :disabled="orderItem.logisticsTransfer=='平台中转仓'"
                  @input="orderItem.logisticsNumber=$event.mp.detail" />
              </van-cell-group>
            </view>
          </van-card>
        </div>
      </view>
      <view slot="footer">
        <div style="display:flex;justify-content:space-between;">
          <p style="width: 6.2em;margin-right: 12px;color: #646566;text-align: left;">泡沫加固</p>
          <van-switch :checked="foamChecked" size="24px" @change="onChangeFoamChecked" />
        </div>
        <div style="display:flex;justify-content:space-between;">
          <p style="width: 6.2em;margin-right: 12px;color: #646566;text-align: left;">纸箱加固</p>
          <van-switch :checked="boxChecked" size="24px" @change="onChangeBoxChecked" />
        </div>
      </view>
    </van-panel>
    <div>


    </div>
    <van-submit-bar :price="cost" label="预扣费" :tip="tip" button-text="提交" @submit="onSubmit" />
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
        boxChecked: false,
        showOverLay: false
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
          order.shopOrderItems.length > 3 ? order.packCost = 3 : order.packCost = 2;
          order.boxCost = 0;
          order.foamCost = 0;
          this.cost = (order.packCost + order.boxCost + order.foamCost) * 100;
          this.tip = '打包费用: ' + order.packCost + " 元；泡沫费用： " + order.foamCost + "元；纸箱费用： " + order.boxCost + "元";
          this.order = order;
          this.order.wxOnlineKey = accountKey;
        }
      });
    },
    methods: {
      onChangeFoamChecked(event) {
        this.foamChecked = event.mp.detail;
        if (this.foamChecked) {
          this.order.foamCost = 1;
        } else {
          this.order.foamCost = 0;
        }
        let order = this.order;
        this.cost = (order.packCost + order.boxCost + order.foamCost) * 100;
        this.tip = '打包费用: ' + order.packCost + " 元；泡沫费用： " + order.foamCost + "元；纸箱费用： " + order.boxCost + "元";
      },
      onChangeBoxChecked(event) {
        this.boxChecked = event.mp.detail;
        if (this.boxChecked) {
          this.order.boxCost = 2;
        } else {
          this.order.boxCost = 0;
        }
        let order = this.order;
        this.cost = (order.packCost + order.boxCost + order.foamCost) * 100;
        this.tip = '打包费用: ' + order.packCost + " 元；泡沫费用： " + order.foamCost + "元；纸箱费用： " + order.boxCost + "元";
      },
      onSubmit() {
        this.showOverLay = true;
        let order = this.order;
        if (order.shopOrderItems) {
          for (let orderItem of order.shopOrderItems) {
            if (!orderItem.logisticsTransfer) {
              orderItem.logisticsTransfer = '其他（快递公司已留言）';
            }
            if (!orderItem.logisticsNumber || orderItem.logisticsNumber.trim() == '') {
              this.showOverLay = false;
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
        let that = this;
        wx.request({
          url: utils.host + '/pack-up',
          method: 'PUT',
          data: this.order,
          success: (res) => {
            res = res.data;
            if (res.content) {
              if (res.content.indexOf("寄存数量已用完") > 0) {
                that.showOverLay = false;
                mpvue.navigateTo({
                  url: '/pages/order-detail/main?orderSn=' + that.order.orderSn + "&shopId=" + that.order
                    .shopId
                })
              } else {
                that.showOverLay = false;
                Notify({
                  type: 'danger',
                  message: res.content
                });
              }
            } else {
              wx.switchTab({
                url: '/pages/order/main',
                success: function () {
                  let page = getCurrentPages().pop();
                  if (page) {
                    page.onLoad();
                  }
                }
              })
            }
          }
        })
      },
      onShowLogisticsNumDialog(id) {
        this.orderItemId = id;
        this.show = true;
      }
    }
  }

</script>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

</style>
