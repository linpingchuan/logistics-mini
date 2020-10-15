<template>
  <div>
    <van-tabbar :active="active" @change="onChangeTab">
  <van-tabbar-item  icon="gold-coin-o">充值</van-tabbar-item>
  <van-tabbar-item icon="bag-o">订单</van-tabbar-item>
  
</van-tabbar>
  </div>
</template>

<script>
import utils from '@/utils/index'
export default {
  data () {
    return {
      active:0
    }
  },
  components: {
    
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
  mounted(){
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
                  mpvue.redirectTo({
                    url:'/pages/login/main'
                  })
                }
              }
            });
        }
      }
    })
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
  onChangeTab(event) {
    this.active=event.mp.detail;
  }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
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
