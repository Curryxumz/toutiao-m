<template>
  <div class="login-container">
      <!-- 顶部导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录"/>

<!-- form表单信息模块 -->
    <van-form ref="loginForm" @submit="onSubmit">
    <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="[{ required: true, message: '手机号不能为空' },{ pattern: /^1[3-9]\d{9}$/ ,message:'请填写正确的手机号' }]"
    >
        <i slot="left-icon" class="iconfont toutiao-shouji"></i>
    </van-field>
    <van-field
        v-model="user.code"
        name='code'
        center
        clearable
        placeholder="请输入短信验证码"
        type="number"
        maxlength="6"
        :rules="[{ required: true, message: '验证码不能为空' },{ pattern:/^\d{6}$/,message:'请输入正确的验证码' }]"
    >
    <template #button>
      <van-count-down :time="time" format="ss s" v-if="isShowCountDown" @finish="isShowCountDown=false"/>
      <van-button size="small" type="default" class="send-btn" native-type="button" v-else @click="onSend">获取验证码</van-button>
    </template>
    <i slot="left-icon" class="iconfont toutiao-yanzhengma"></i>
</van-field>
    <!-- 登录按钮 -->
    <div style="margin: 16px;">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'loginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      time: 60 * 1000,
      isShowCountDown: false // 注意这是个数据，下面调用
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 登录状态提示
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁止点击背景
        duration: 0 // 0为一直显示，表示显示多次时间
      })
      try {
        const { data } = await login(user)
        this.$toast.success('登录成功')
        // 登录成功后把数据token保存到本地，这一步是数据保存步骤
        this.$store.commit('setUser', data.data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码不正确')
        } else {
          this.$toast.fail('请稍候再试')
        }
      }
    },
    async onSend () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log(err) // return出去，后面的代码就不再执行
      }

      // 当验证通过，显示倒计时
      this.isShowCountDown = true

      // 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        this.isShowCountDown = false
        if (err.response.status === 429) {
          this.$toast('发送失败，请勿频繁发送')
        } else {
          this.$toast('发送失败，请稍候再试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  .login-container {
    .van-cell {
      padding-left: 0;
      align-content: center;
      .iconfont {
      padding: 15px 20px;
      }
      .send-btn {
        padding: 11px 0;
        width: 76px;
        height: 23px;
        background-color: #ededed;
        border-radius: 12px;
        border: none;
        color: #666666;
      }
    }
  }
</style>
