export const setToken = (state, payload) => state.token = payload

export const setUser = (state, payload) => state.user = payload

export const setHeaders = (state, payload) => {
  state.headers = {
    headers: {
      'Authorization': payload
    }
  }
}
