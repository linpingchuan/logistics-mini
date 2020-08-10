<template>
  <div>
    <van-notice-bar left-icon="volume-o" text="关注【盛夏跨境】公众号，可以获取最新的功能使用教程哦~ 🍻" speed="20" />
    <div class="login-container">
      <div class="login-module">
        <div class="login-title">
          <p>盛夏物流平台</p>
        </div>
        <van-cell-group>
          <van-field required :value="account" label="手机号" placeholder="请输入手机号" />
          <van-field :value="password" label="密码" placeholder="请输入密码" required password>
            <van-button slot="button" size="small" type="primary">登录</van-button>
          </van-field>
        </van-cell-group>
        <div style="margin-top:10px;">
          <div class="login-footer">
            <p>若用户未注册，请用电脑前往【盛夏物流平台】进行注册</p>
          </div>
          <div class="login-footer">
            <p>
              盛夏物流平台网址（长按复制）：
              <text style="color:red;" selectable="true">https://foreverhot.club/l/index.html</text>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data:'',
      password:''
    }
  },
  components: {
    
  },
  mounted(){
    
  },
  methods: {
    
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
