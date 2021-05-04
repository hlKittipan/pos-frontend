export default {
  async setSliderChaChang ({ commit }, value = null) {
    commit('SET_SLIDER_CHA_CHANG', value)
  },
  async setLoadingChaChang ({ commit }, value = null) {
    commit('SET_LOADING_CHA_CHANG', value)
  },

  // Start price type
  async fetchPriceType ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'/chachang/price-type')
    commit('SET_PRICE_TYPE', response.data)
    return response
  },
  async addPriceType ({ commit }, value) {
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'/chachang/price-type',value)
    commit('ADD_PRICE_TYPE',response.data)
    return response
  },
  async updatePriceType ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'/chachang/price-type/'+value.id,value)
    commit('UPDATE_PRICE_TYPE',response.data)
    return response
  },
  async deletePriceType ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'/chachang/price-type/'+id)
    if(response){
      commit('DELETE_PRICE_TYPE',id)
    }
    return response
  },
  // End price type

  // Start payment type
  async fetchPaymentType ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'/chachang/payment-type')
    commit('SET_PAYMENT_TYPE', response.data)
    return response
  },
  async addPaymentType ({ commit }, value) {
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'/chachang/payment-type',value)
    commit('ADD_PAYMENT_TYPE',response.data)
    return response
  },
  async updatePaymentType ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'/chachang/payment-type/'+value.id,value)
    commit('UPDATE_PAYMENT_TYPE',response.data)
    return response
  },
  async deletePaymentType ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'/chachang/payment-type/'+id)
    if(response){
      commit('DELETE_PAYMENT_TYPE',id)
    }
    return response
  },
  // End payment type

  // Start Menu
  async fetchMenu ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'/chachang/menu')
    commit('SET_MENU', response.data)
    return response
  },
  async addMenu ({ commit }, value) {
    if(value.prices && value.priceType){
      const price = []
      for(const key in value.prices){
        price.push({_id:value.priceType[key],price:value.prices[key]})
      }
      value.price= price
    }
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'/chachang/menu',value)
    if(response){commit('ADD_MENU',response.data)}
    return response
  },
  async updateMenu ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'/chachang/menu/'+value.id,value)
    commit('UPDATE_MENU',response.data)
    return response
  },
  async deleteMenu ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'/chachang/menu/'+id)
    if(response){
      commit('DELETE_MENU',id)
    }
    return response
  },
  addDefaultPriceNewAfterAddPriceType ({ commit }, value) {
    commit('ADD_DEFAULT_PRICE_AFTER_ADD_PRICE_TYPE',value)
  },
  // End Menu

  // Start menu type
  async fetchMenuType ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'/chachang/menu-type')
    commit('SET_MENU_TYPE', response.data)
    return response
  },
  async addMenuType ({ commit }, value) {
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'/chachang/menu-type',value)
    commit('ADD_MENU_TYPE',response.data)
    return response
  },
  async updateMenuType ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'/chachang/menu-type/'+value.id,value)
    commit('UPDATE_MENU_TYPE',response.data)
    return response
  },
  async deleteMenuType ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'/chachang/menu-type/'+id)
    if(response){
      commit('DELETE_MENU_TYPE',id)
    }
    return response
  },
  // End menu type
}
