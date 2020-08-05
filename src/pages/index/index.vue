<template>
  <div>
    <van-button round type="primary" size="small">测试</van-button>
  </div>
</template>

<script>
import utils from '@/utils/index'
export default {
  data () {
    return {
      
    }
  },
  components: {
    
  },
  mounted(){
    wx.login({
      success(res){
        if(res.code){
          wx.request({
              url:utils.host+'/mini-program/wx323ba9b4db4945e3/login',
              method:'PUT',
              data:{
                code:res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              success:(res)=>{
                if(res.data.type=='error'){
                  wx.navigateTo({
                    url:'login'
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
