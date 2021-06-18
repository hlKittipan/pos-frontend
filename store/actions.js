const cookie =  process.server ? require('cookie') : undefined

export async function nuxtServerInit ({ commit }, { req, res }) {

  // If we have any axios requests we need to add async/await
  // And since this works on server mode, we don't need to check is it server
  let token = null
  if (req.headers.cookie) {
    const parsed = cookie.parse(req.headers.cookie || '')
    try {
      token = parsed.authToken
    } catch (e) {
      console.log(e)
    }
  }

  // If we have token within cookies we get user data from api and we pass Autorization headers with token
  if (token !== null && token !== false && token !== undefined) {
    await this.$axios.get('/auth/user', {
      headers: {
        'Authorization': token
      }
    }).then((response) => {
      // If  we get user data we set it to store
      commit('setUser', response.data.data)
      commit('setToken', token)
      commit('setHeaders', token)
    }).catch((error) => {
      // If we get error, we should logout user by removing data within cookies and store
      // Additionally you can create specific code error on backend to check if token is expired or invalid
      // and then check for status code and then remove data
      commit('setUser', null)
      commit('setToken', null)
      res.setHeader('Set-Cookie', [`authToken=false; expires=Thu, 01 Jan 1970 00:00:00 GMT`])
      // This is only way I found useful for removing cookies from node server
      console.warn(error)
    })
  }
}


