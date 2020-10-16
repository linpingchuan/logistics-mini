<template>
  <div>
    <van-notify id="van-notify" />
    <van-notice-bar left-icon="volume-o" text="关注【盛夏跨境】公众号，可以获取最新的功能使用教程哦~ 🍻" speed="20" />
    <div class="login-container">
      <div class="login-module">
        <div class="login-title">
          <p>盛夏物流平台</p>
        </div>
        <van-cell-group>
          <van-field
            required
            :value="account.tel"
            label="手机号"
            maxlength="11"
            @change="changePhone"
            placeholder="请输入手机号"
          />
          <van-field
            :value="account.accountPassword"
            label="密码"
            placeholder="请输入密码"
            @change="changeAccountPassword"
            required
            password
          >
            <van-button slot="button" size="small" type="primary" @click="onClickLogin">登录</van-button>
          </van-field>
        </van-cell-group>
        <div style="margin-top:10px;" @click="copyUrl">
          <div class="login-footer">
            <p>若用户未注册，请用电脑前往【盛夏物流平台】进行注册</p>
          </div>
          <div class="login-footer">
            <p>
              盛夏物流平台网址（点击复制）：
              <text style="color:red;" selectable="true">https://l.foreverhot.icu</text>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/index'
import Notify from '../../../static/vant/notify/notify';
export default {
  data () {
    return {
      account:{
        tel:'',
        accountPassword:'',
        wxOpenId:''
      }
    }
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
  components: {
    
  },
  mounted(){
  },
  methods: {
    copyUrl(){
      let text="https://l.foreverhot.icu"
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
    changePhone(e) {
      this.account.tel = e.mp.detail
    },
    changeAccountPassword(e) {
      this.account.accountPassword = e.mp.detail
    },
    onClickLogin(){
      if(!this.account.tel){
            Notify('账号/密码都不能为空')
            return
          }
          if(this.account.accountPassword==''){
            Notify('账号/密码都不能为空')
            return
          }
          let that=this;
      wx.login({
      success(res){
        if(res.code){
          that.account.wxOpenId=res.code;
          wx.request({
            url:utils.host+'/login-with-account',
            method:'PUT',
            data:that.account,
            success:(res)=>{
              res=res.data;
              if(res.type=='error'){
                Notify(res.content)
              }else{
                wx.setStorageSync('accountKey',res.data)
                wx.switchTab({url:'/pages/recharge/main'})
              }
          }
      })
        }
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
.login-container {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
}
.login-module {
  margin-top: -28vh;
}
.login-title {
  color: rgb(25, 137, 250);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: start;
  margin: 2vh 0 2vh 1vw;
}
.login-footer {
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  text-align: start;
  margin: 4px 0 4px 1vw;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}
.all:after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  width: 3rem;
  height: 1rem;
  background-color: red;
}

.right {
  float: left;
  width: 4.5rem;
  height: 1rem;
  background-color: green;
}
</style>
