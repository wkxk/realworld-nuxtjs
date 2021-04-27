const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  user: null
})

export const mutations = {
  setUserInfo (state, payload) {
    state.user = payload
  }
}

export const actions = {
  // 服务端取到响应头中的cookie信息写入到store中
  // 每次刷新页面之后都会调用这里的
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUserInfo', user)
  }
}