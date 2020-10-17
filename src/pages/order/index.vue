<template>
  <div>
    <van-tabs :active="active" @change="onChange">
      <van-tab title="待提交">
        <OrderList orderType="0" />
      </van-tab>
      <van-tab title="待打包">
        <OrderList orderType="1" />
      </van-tab>
      <van-tab title="已打包送仓">
        <OrderList orderType="2" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import utils from '@/utils/index'
  import Notify from '../../../static/vant/notify/notify';
  import OrderList from '@/components/order-list'
  export default {
    data() {
      return {
        amount: 0,
        account: {},
        prepayId: '',
        requestPayment: {},
        showOverLay: true,
        active: 0
      }
    },
    mounted() {},
    components: {
      OrderList
    },
    
    onShareAppMessage(res) {
      return {
        title: '虾皮货代就找盛夏物流，安全靠谱，快来一起大卖吧！',
        path: '/pages/recharge/main',
        imageUrl: 'https://l.foreverhot.icu/share_mini.jpg'
      }
    },
    onShareTimeline(res) {
      return {
        title: '虾皮货代就找盛夏物流，安全靠谱，快来一起大卖吧！',
        query: '',
        imageUrl: 'https://l.foreverhot.icu/share_mini.jpg'
      }
    },
    methods: {
      onChange(event) {
        this.active = event.detail;
      }
    },
    created() {
    }
  }

</script>

<style scoped>
  .notice-container {
    font-size: 10px;
    margin-top: 10px;
    color: #646566;
    margin-left: 10px;
  }

  .rechage-container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

</style>
