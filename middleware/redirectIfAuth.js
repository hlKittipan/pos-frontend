const cookie = process.server ? require('cookie') : undefined

export default function ({ app, redirect, req }) {
  let token = null
  if (process.server) {
    if (req.headers.cookie) {
      const parsed = cookie.parse(req.headers.cookie || '')
      try {
        token = parsed['auth._token.local']
      } catch (e) {
        // console.log(e)
      }
    }
  } else if (process.client) {
     token = app.$cookiz.get('auth._token.local')
  }
  // console.log(token)
  if (token && token !== false && token !== undefined && token !== null) {
    app.store.commit('setToken', token)
    app.store.commit('setHeaders', token)
    if (app.store.state.user) {
      if (app.store.state.user.roles.includes('customer')) {
        return redirect({
          name: 'customer-slug',
          params: { slug: app.store.state.user.username }
        })
      } else if (app.store.state.user.roles.includes('admin')) {
        return redirect({
          name: 'dashboard'
        })
      } else {
        return redirect({
          name: 'index'
        })
      }
    } else {
      return redirect({
        name: 'index'
      })
    }
  }
}
