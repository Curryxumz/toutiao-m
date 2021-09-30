<template>
  <div class="my-container">
        <!-- 已登录状态 -->
    <div class="logined" v-if="user">
      <div class="user-info">
        <div class="base-info">
          <van-image
            width="100"
            height="100"
            round
            fit="cover"
            class="avatar"
            :src="userInfo.photo"
          />
          <span class="uname">{{ userInfo.name }}</span>
        </div>
        <van-button class="ziliao-btn" type="default">编辑资料</van-button>
      </div>
      <div class="data-info">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="fenlei">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="fenlei">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="fenlei">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="fenlei">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录状态 -->
    <div class="not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" />
        <p>登录 / 注册</p>
      </div>
    </div>

    <!-- 收藏历史 -->
    <van-grid :column-num="2" clickable>
      <van-grid-item text="收藏">
        <i slot="icon" class="iconfont toutiao-shoucang"></i>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class="iconfont toutiao-lishi"></i>
      </van-grid-item>
    </van-grid>

    <!-- 小智同学 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>

    <!-- 退出按钮 -->
    <van-button class="logout-btn" type="default" clickable v-if="user" @click="onLogout">退出登录</van-button>
  </div>
</template>

<script>
// 引入mapState方法
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      // 用来接收用户自己的信息
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {},
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () {
      try {
        const data = await getUserInfo()
        console.log(data)
        this.userInfo = data.data.data
      } catch (error) {
        this.$toast('获取数据失败，请稍候重试')
      }
    }
  }
}

</script>

<style scoped lang="less">
  .my-container {
    .not-login {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 201px;
      background: url('~@/assets/banner.png');
      background-size: cover;
      .login-btn {
        img {
        margin: 74px 0 8px 0;
        width: 66px;
        height: 66px;
        }
        p {
          margin: 0;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
    .logined {
      width: 100%;
      background: url('~@/assets/banner.png');
      background-size: cover;
      .user-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 131px;
        box-sizing: border-box;
        padding: 0 15px;
        .base-info {
          display: flex;
          justify-content: center;
          align-items: center;
          .avatar {
            margin-right: 11px;
            width: 66px!important;
            height: 66px!important;
            border: 2px solid #ffffff;
          }
          .uname {
            font-size: 15px;
            color: #ffffff;
          }
        }
        .ziliao-btn {
          width: 80px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          background-color: #ffffff;
          border-radius: 8px;
          font-size: 12px;
        }
      }
      .data-info {
        height: 70px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .data-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
            font-weight: 400;
            color: #ffffff;
          }
          .fenlei {
            font-size: 12px;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }
    .van-grid-item__text{
      color: #333;
      font-size: 14px;
    }
    .iconfont {
      margin-bottom: 8px;
      font-size: 23px;
      color: #eb5253;
    }
    .van-cell-group {
      margin: 5px 0;
    }
    .logout-btn {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #d86262;
      font-size: 15px;
    }
  }
</style>
