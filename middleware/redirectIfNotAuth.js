const cookie = process.server ? require('cookie') : undefined

export default function ({ app, redirect, route, req }) {
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
  if (token === null || token === false || token === undefined) {
    return redirect('/login')
  }
}
