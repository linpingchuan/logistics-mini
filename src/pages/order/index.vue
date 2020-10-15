<template>
  <div>
    <van-notify id="van-notify" />
    <van-notice-bar left-icon="volume-o" text="小夏温馨提示您，为了保证您的订单能够正常打包，请选择合适的金额进行充值哦~" speed="20" />
    <van-overlay :show="showOverLay">
      <div class="wrapper">
        <van-loading size="24px">加载中...</van-loading>
      </div>
    </van-overlay>
    <van-panel title="账号信息" :desc="account.tel">
      <van-cell-group>
        <van-field :value="account.balance" label="余额" readonly />
        <van-field :value="account.point" label="积分" readonly />
        <van-field :value="account.consumeAmount" label="已消费金额" readonly />
        <van-field :value="account.invitationCode" label="邀请码" readonly>
          <van-button
            @click="copyInvitationCode"
            slot="button"
            size="small"
            type="info"
            use-button-slot
          >一键复制</van-button>
        </van-field>
      </van-cell-group>
    </van-panel>
    <div style="display:flex;justify-content:flex-end;">
      <div style="margin:4px 10px;">
        <van-button type="danger" size="mini" @click="onClickLogout(10)">登出</van-button>
      </div>
    </div>
    <div class="rechage-container">
      <van-button round type="default" icon="gold-coin-o" @click="onClickRecharge(10)">10元</van-button>
      <van-button round plain type="primary" icon="gold-coin-o" @click="onClickRecharge(50)">50元</van-button>
      <van-button round type="primary" icon="gold-coin-o" @click="onClickRecharge(100)">100元</van-button>
    </div>
    <div class="rechage-container">
      <van-button round type="info" icon="gold-coin-o" @click="onClickRecharge(200)">200元</van-button>
      <van-button round type="warning" icon="gold-coin-o" @click="onClickRecharge(500)">500元</van-button>
      <van-button round type="danger" icon="gold-coin-o" @click="onClickRecharge(6000)">6000元</van-button>
    </div>
    <div class="notice-container">
      <p>📌 请直接点击上方任意面值进行充值，最晚十五分钟内到账</p>
      <p>📌 注意，为了避免打包失败，中大型店铺请直接点击6000元面值进行充值</p>
      <p>📌 小夏温馨提示您，邀请新虾皮卖家入驻盛夏物流平台即可获得积分哦~</p>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/index'
import Notify from '../../../static/vant/notify/notify';
export default {
  data () {
    return {
      amount:0,
      account:{},
      prepayId:'',
      requestPayment:{},
      showOverLay:true
    }
  },
  mounted(){
    this.onLogin();
  },
  onShareAppMessage(res){
    return {
      title: '虾皮货代就找盛夏物流，安全靠谱，快来一起大卖吧！',
      path: '/pages/recharge/main',
      imageUrl: 'https://l.foreverhot.icu/share_mini.jpg'
    }
  },
  onShareTimeline(res){
    return {
      title: '虾皮货代就找盛夏物流，安全靠谱，快来一起大卖吧！',
      query:'',
      imageUrl: 'https://l.foreverhot.icu/share_mini.jpg'
    }
  },
  methods: {
   
    onClickLogout(){
      wx.setStorageSync('accountKey',null);
      mpvue.redirectTo({
                            url:'/pages/login/main'
                          })
    },
    copyInvitationCode(){
      let text="虾皮货代就找盛夏物流（https://l.foreverhot.icu），安全靠谱（请在电脑端进行操作吧！）。快快加入我们，我的邀请码: "+this.account.invitationCode
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
    onLogin(){
      let that=this;
      wx.login({
        success(res){
          if(res.code){
            wx.request({
                url:utils.host+'/login',
                method:'PUT',
                data:{
                  code:res.code
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                success:(res)=>{
                  if(res.data.type=='error'){
                    that.showOverLay=false
                    mpvue.redirectTo({
                      url:'/pages/login/main'
                    })
                  }else{
                    res=res.data
                    that.account=res.data
                    wx.setStorageSync('accountKey',that.account.wxOnlineKey)
                    that.showOverLay=false
                  } 
                }
              });
          }
        }
      })
    },
    onClickRecharge(amount){
      let that=this
      that.amount=amount
      let accountKey=wx.getStorageSync('accountKey')
      wx.request({
        url:utils.host+'/pre-pay',
        method:'POST',
        data:{
          wxOnlineKey:accountKey,
          amount:that.amount
        },
        success:(res)=>{
          res=res.data
          if(res.type=='error'){
            that.onLogin()
          }
          that.requestPayment=res.data
          that.prepayId=res.data.prepayId
          wx.requestPayment({
            'timeStamp':res.data.timeStamp,
            'nonceStr':res.data.nonceStr,
            'package':res.data.packageName,
            'signType':res.data.signType,
            'paySign':res.data.paySign,
            success:(_res)=>{
              that.onLogin()
            },
            fail:(res)=>{
              console.log(res)
            }
          })
        }
      })
    }
  },

  created () {
    // let app = getApp()
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
