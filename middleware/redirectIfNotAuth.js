const cookie = process.server ? require('cookie') : undefined

export default function ({ app, redirect, route, req }) {
  let token = null
  if (process.server) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        token = parsed.authToken
      } catch (e) {
        console.log(e)
      }
    }
  } else if (process.client) {
    token = Cookie.get('authToken')
  }
  if (token === null || token === false) {
    return redirect({
      name: 'login',
      query: {
        redirect: route.fullPath
      }
    })
  }
}
