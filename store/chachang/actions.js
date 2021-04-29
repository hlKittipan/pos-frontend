export default {
  async fetchMenu ({ commit }) {
    const response = await this.$axios.get('http://localhost:4000/chachang/menu')
    commit('SET_MENU', response.data)
  },
  async fetchPaymentType ({ commit }) {
    const response = await this.$axios.get('https://hlkittipan.github.io/rock-paper-scissors/payment-type.json')
    commit('SET_PAYMENT_TYPE', response.data)
  },
  async fetchPriceType ({ commit }) {
    const response = await this.$axios.get('http://localhost:4000/chachang/price-type')
    commit('SET_PRICE_TYPE', response.data)
  },
  async setSliderChaChang ({ commit }, value = null) {
    commit('SET_SLIDER_CHA_CHANG', value)
  },
  async setLoadingChaChang ({ commit }, value = null) {
    commit('SET_LOADING_CHA_CHANG', value)
  },
  async addPriceType ({ commit }, value) {
    const response = await this.$axios.post('http://localhost:4000/chachang/price-type',value)
    commit('ADD_PRICE_TYPE',response.data)
    return response
  },
  async deletePriceType ({ commit }, id) {
    const response = await this.$axios.delete('http://localhost:4000/chachang/price-type/'+id)
    if(response){
      commit('DELETE_PRICE_TYPE',id)
    }
    return response
  },

  // Start Menu
  async addMenu ({ commit }, value) {
    if(value.prices && value.priceType){
      const price = []
      for(const key in value.prices){
        price.push({_id:value.priceType[key],price:value.prices[key]})
      }
      value.price= price
    }
    const response = await this.$axios.post('http://localhost:4000/chachang/menu',value)
    if(response){commit('ADD_MENU',response.data)}
    return response
  },
  async deleteMenu ({ commit }, id) {
    const response = await this.$axios.delete('http://localhost:4000/chachang/menu/'+id)
    if(response){
      commit('DELETE_MENU',id)
    }
    return response
  },
  addDefaultPriceNewAfterAddPriceType ({ commit }, value) {
    commit('ADD_DEFAULT_PRICE_AFTER_ADD_PRICE_TYPE',value)
  }
  // End Menu
}
