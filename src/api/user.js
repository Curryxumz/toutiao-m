import request from '@/utils/request'
// import store from '@/store' 当使用请求头原始方法时，需要引入

// 登录请求
export const login = data => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 发送验证码
export const sendSms = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}

// 获取用户自己的数据
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
    // 此次请求需要发送用户令牌，需要到token，所以引入store用来回去user，这是原始方法
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
