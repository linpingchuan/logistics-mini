<template>
  <div>
    <van-notify id="van-notify" />
    <van-notice-bar left-icon="volume-o" text="关注【盛夏跨境】公众号，可以获取最新的货代功能使用教程哦~ 🍻" speed="20" />
    <div class="rechage-container">
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">10元</van-button>
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">50元</van-button>
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">100元</van-button>
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">300元</van-button>
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">500元</van-button>
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">5000元</van-button>
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
        accountPassword:''
      }
    }
  },
  components: {
    
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
    
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.rechage-container {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
}
</style>
