export default {
  async setSliderChaChang ({ commit }, value = null) {
    commit('SET_SLIDER_CHA_CHANG', value)
  },
  async setLoadingChaChang ({ commit }, value = null) {
    commit('SET_LOADING_CHA_CHANG', value)
  },
  // Start Language
  async fetchLanguage ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/language-code')
    if(response.status == 200){commit('SET_LANGUAGE', response.data)}
    return response
  },
  async addLanguage ({ commit }, value) {
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'chachang/language-code',value)
    console.log(response)
    if(response.status == 200){commit('ADD_LANGUAGE',response.data)}
    return response
  },
  async updateLanguage ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'chachang/language-code/'+value.id,value)
    if(response.status == 200){commit('UPDATE_LANGUAGE',response.data)}
    return response
  },
  async deleteLanguage ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'chachang/language-code/'+id)
    if(response.status == 200){commit('DELETE_LANGUAGE',id)}
    return response
  },
  // End Language

  // Start price type
  async fetchPriceType ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/price-type')
    if(response.status == 200){commit('SET_PRICE_TYPE', response.data)}
    return response
  },
  async addPriceType ({ commit }, value) {
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'chachang/price-type',value)
    if(response.status == 200){commit('ADD_PRICE_TYPE',response.data)}
    return response
  },
  async updatePriceType ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'chachang/price-type/'+value.id,value)
    if(response.status == 200){commit('UPDATE_PRICE_TYPE',response.data)}
    return response
  },
  async deletePriceType ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'chachang/price-type/'+id)
    if(response.status == 200){commit('DELETE_PRICE_TYPE',id)}
    return response
  },
  // End price type

  // Start price template
  async fetchPriceTemplate ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/price-template')
    if(response.status == 200){commit('SET_PRICE_TEMPLATE', response.data)}
    return response
  },
  async addPriceTemplate ({ commit }, value) {
    if(value.prices){
      const price = []
      for(const key in value.prices){
        price.push({_id:key,price:value.prices[key]})
      }
      value.price= price
    }
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'chachang/price-template',value)
    if(response.status == 200){commit('ADD_PRICE_TEMPLATE',response.data)}
    return response
  },
  async updatePriceTemplate ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'chachang/price-template/'+value.id,value)
    if(response.status == 200){commit('UPDATE_PRICE_TEMPLATE',response.data)}
    return response
  },
  async deletePriceTemplate ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'chachang/price-template/'+id)
    if(response.status == 200){commit('DELETE_PRICE_TEMPLATE',id)}
    return response
  },
  // End price template

  // Start payment type
  async fetchPaymentType ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/payment-type')
    if(response.status == 200){commit('SET_PAYMENT_TYPE', response.data)}
    return response
  },
  async addPaymentType ({ commit }, value) {
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'chachang/payment-type',value)
    if(response.status == 200){commit('ADD_PAYMENT_TYPE',response.data)}
    return response
  },
  async updatePaymentType ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'chachang/payment-type/'+value.id,value)
    if(response.status == 200){commit('UPDATE_PAYMENT_TYPE',response.data)}
    return response
  },
  async deletePaymentType ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'chachang/payment-type/'+id)
    if(response.status == 200){commit('DELETE_PAYMENT_TYPE',id)}
    return response
  },
  // End payment type

  // Start Product
  async fetchProduct ({ commit }) {
    console.log(this.$config.axios.BASE_API_URL)
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/product')
    if(response.status == 200){commit('SET_PRODUCT', response.data)}
    return response
  },
  async addProduct ({ commit }, value) {
    value.title = value.name
    value.language.en = value.name
    if(value.prices){
      const price = []
      for(const key in value.prices){
        price.push({_id:key,price:value.prices[key]})
      }
      value.price= price
    }
    value.language = {}
    if(value.languages && value.languages_value){
      for(const key in value.languages){
        value.language[value.languages[key]]= value.languages_value[key]
      }
    }
    // console.log(value)
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'chachang/product',value)
    if(response.status == 200){commit('ADD_PRODUCT',response.data)}
    return response
  },
  async updateProduct ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'chachang/product/'+value.id,value)
    if(response.status == 200){commit('UPDATE_PRODUCT',response.data)}
    return response
  },
  async deleteProduct ({ commit }, id) {

      const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'chachang/product/'+id)
      .catch(({ response: err }) => {
        return err
      })
      console.log(response)
      if(response.status == 200){
        commit('DELETE_PRODUCT',id)
      }
      return response

  },
  // End Product

  // Start product type
  async fetchProductType ({ commit }) {
    const response = await this.$axios.get(this.$config.axios.BASE_API_URL+'chachang/product-type')
    if(response.status == 200){commit('SET_PRODUCT_TYPE', response.data)}
    return response
  },
  async addProductType ({ commit }, value) {
    const response = await this.$axios.post(this.$config.axios.BASE_API_URL+'chachang/product-type',value)
    if(response.status == 200){commit('ADD_PRODUCT_TYPE',response.data)}
    return response
  },
  async updateProductType ({ commit }, value) {
    const response = await this.$axios.put(this.$config.axios.BASE_API_URL+'chachang/product-type/'+value.id,value)
    if(response.status == 200){commit('UPDATE_PRODUCT_TYPE',response.data)}
    return response
  },
  async deleteProductType ({ commit }, id) {
    const response = await this.$axios.delete(this.$config.axios.BASE_API_URL+'chachang/product-type/'+id)
    if(response.status == 200){commit('DELETE_PRODUCT_TYPE',id)}
    return response
  },
  // End product type
}
