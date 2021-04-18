export default {
  async fetchMenu ({ commit }) {
    const response = await this.$axios.get('https://hlkittipan.github.io/rock-paper-scissors/menu.json')
    commit('SET_MENU', response.data)
  },
  async fetchPaymentType ({ commit }) {
    const response = await this.$axios.get('https://hlkittipan.github.io/rock-paper-scissors/payment-type.json')
    commit('SET_PAYMENT_TYPE', response.data)
  },
  async setSliderChaChang ({ commit }, value = null) {
    commit('SET_SLIDER_CHA_CHANG', value)
  }
}
