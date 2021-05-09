export default {
  async setSliderChaChang ({ commit }, value = null) {
    commit('SET_SLIDER_CHA_CHANG', value)
  },
  async setLoadingChaChang ({ commit }, value = null) {
    commit('SET_LOADING_CHA_CHANG', value)
  },
  async fetchLanguage ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/language-code')
    commit('SET_LANGUAGE', response.data)
    return response
  },

  // Start price type
  async fetchPriceType ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/price-type')
    commit('SET_PRICE_TYPE', response.data)
    return response
  },
  async addPriceType ({ commit }, value) {
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'chachang/price-type',value)
    commit('ADD_PRICE_TYPE',response.data)
    return response
  },
  async updatePriceType ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'chachang/price-type/'+value.id,value)
    commit('UPDATE_PRICE_TYPE',response.data)
    return response
  },
  async deletePriceType ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'chachang/price-type/'+id)
    if(response){
      commit('DELETE_PRICE_TYPE',id)
    }
    return response
  },
  // End price type

  // Start payment type
  async fetchPaymentType ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/payment-type')
    commit('SET_PAYMENT_TYPE', response.data)
    return response
  },
  async addPaymentType ({ commit }, value) {
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'chachang/payment-type',value)
    commit('ADD_PAYMENT_TYPE',response.data)
    return response
  },
  async updatePaymentType ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'chachang/payment-type/'+value.id,value)
    commit('UPDATE_PAYMENT_TYPE',response.data)
    return response
  },
  async deletePaymentType ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'chachang/payment-type/'+id)
    if(response){
      commit('DELETE_PAYMENT_TYPE',id)
    }
    return response
  },
  // End payment type

  // Start Product
  async fetchProduct ({ commit }) {
    console.log(this.$config.axios.BASE_API_URL)
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/product')
    commit('SET_PRODUCT', response.data)
    return response
  },
  async addProduct ({ commit }, value) {
    if(value.prices && value.priceType){
      const price = []
      for(const key in value.prices){
        price.push({_id:value.priceType[key],price:value.prices[key]})
      }
      value.price= price
    }
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'chachang/product',value)
    if(response){commit('ADD_PRODUCT',response.data)}
    return response
  },
  async updateProduct ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'chachang/product/'+value.id,value)
    commit('UPDATE_PRODUCT',response.data)
    return response
  },
  async deleteProduct ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'chachang/product/'+id)
    if(response){
      commit('DELETE_PRODUCT',id)
    }
    return response
  },
  addDefaultPriceNewAfterAddPriceType ({ commit }, value) {
    commit('ADD_DEFAULT_PRICE_AFTER_ADD_PRICE_TYPE',value)
  },
  // End Product

  // Start product type
  async fetchProductType ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/product-type')
    commit('SET_PRODUCT_TYPE', response.data)
    return response
  },
  async addProductType ({ commit }, value) {
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'chachang/product-type',value)
    commit('ADD_PRODUCT_TYPE',response.data)
    return response
  },
  async updateProductType ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'chachang/product-type/'+value.id,value)
    commit('UPDATE_PRODUCT_TYPE',response.data)
    return response
  },
  async deleteProductType ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'chachang/product-type/'+id)
    if(response){
      commit('DELETE_PRODUCT_TYPE',id)
    }
    return response
  },
  // End product type
}
