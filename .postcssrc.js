module.exports = {
  plugins: {
    // 注释代码为自动配置css前缀，vue/cli已经配置
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 根元素大小
      rootValue: 37.5,
      // propList需要转换的属性 ，一般都是*，表示所有
      propList: ['*']
    }
  }
}
