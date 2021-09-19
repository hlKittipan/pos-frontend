export default {
  setSliderPage({ commit }, value = null) {
    commit('SET_SLIDER_PAGE', value)
  },
  setLoadingPage({ commit }, value = null) {
    commit('SET_LOADING_PAGE', value)
  },
  // Start Language
  async fetchLanguage({ commit }) {
    const response = await this.$axios.get(
      this.$config.axios.BASE_API_URL + '/pos/language-code'
    )
    if (response.status == 200) {
      commit('SET_LANGUAGE', response.data)
    }
    return response
  },
  async addLanguage({ commit }, value) {
    const response = await this.$axios
      .post(this.$config.axios.BASE_API_URL + '/pos/language-code', value)
      .catch(({ response }) => {
        return response
      })
    if (response.status == 200) {
      commit('ADD_LANGUAGE', response.data)
    }
    return response
  },
  async updateLanguage({ commit }, value) {
    const response = await this.$axios.put(
      this.$config.axios.BASE_API_URL + '/pos/language-code/' + value.id,
      value
    )
    if (response.status == 200) {
      commit('UPDATE_LANGUAGE', response.data)
    }
    return response
  },
  async deleteLanguage({ commit }, id) {
    const response = await this.$axios.delete(
      this.$config.axios.BASE_API_URL + '/pos/language-code/' + id
    )
    if (response.status == 200) {
      commit('DELETE_LANGUAGE', id)
    }
    return response
  },
  // End Language

  // Start price type
  async fetchPriceType({ commit }) {
    const response = await this.$axios.get(
      this.$config.axios.BASE_API_URL + '/pos/price-type'
    )
    if (response.status == 200) {
      commit('SET_PRICE_TYPE', response.data)
    }
    return response
  },
  async addPriceType({ commit }, value) {
    const response = await this.$axios.post(
      this.$config.axios.BASE_API_URL + '/pos/price-type',
      value
    )
    if (response.status == 200) {
      commit('ADD_PRICE_TYPE', response.data)
    }
    return response
  },
  async updatePriceType({ commit }, value) {
    const response = await this.$axios.put(
      this.$config.axios.BASE_API_URL + '/pos/price-type/' + value.id,
      value
    )
    if (response.status == 200) {
      commit('UPDATE_PRICE_TYPE', response.data)
    }
    return response
  },
  async deletePriceType({ commit }, id) {
    const response = await this.$axios.delete(
      this.$config.axios.BASE_API_URL + '/pos/price-type/' + id
    )
    if (response.status == 200) {
      commit('DELETE_PRICE_TYPE', id)
    }
    return response
  },
  // End price type

  // Start price template
  async fetchPriceTemplate({ commit }) {
    const response = await this.$axios.get(
      this.$config.axios.BASE_API_URL + '/pos/price-template'
    )
    if (response.status == 200) {
      commit('SET_PRICE_TEMPLATE', response.data)
    }
    return response
  },
  async addPriceTemplate({ commit }, value) {
    if (value.prices) {
      const price = []
      for (const key in value.prices) {
        price.push({ _id: key, price: value.prices[key] })
      }
      value.price = price
    }
    const response = await this.$axios.post(
      this.$config.axios.BASE_API_URL + '/pos/price-template',
      value
    )
    if (response.status == 200) {
      commit('ADD_PRICE_TEMPLATE', response.data)
    }
    return response
  },
  async updatePriceTemplate({ commit }, value) {
    const response = await this.$axios.put(
      this.$config.axios.BASE_API_URL + '/pos/price-template/' + value.id,
      value
    )
    if (response.status == 200) {
      commit('UPDATE_PRICE_TEMPLATE', response.data)
    }
    return response
  },
  async deletePriceTemplate({ commit }, id) {
    const response = await this.$axios.delete(
      this.$config.axios.BASE_API_URL + '/pos/price-template/' + id
    )
    if (response.status == 200) {
      commit('DELETE_PRICE_TEMPLATE', id)
    }
    return response
  },
  // End price template

  // Start payment type
  async fetchPaymentType({ commit }) {
    const response = await this.$axios.get(
      this.$config.axios.BASE_API_URL + '/pos/payment-type'
    )
    if (response.status == 200) {
      commit('SET_PAYMENT_TYPE', response.data)
    }
    return response
  },
  async addPaymentType({ commit }, value) {
    const response = await this.$axios.post(
      this.$config.axios.BASE_API_URL + '/pos/payment-type',
      value
    )
    if (response.status == 200) {
      commit('ADD_PAYMENT_TYPE', response.data)
    }
    return response
  },
  async updatePaymentType({ commit }, value) {
    const response = await this.$axios.put(
      this.$config.axios.BASE_API_URL + '/pos/payment-type/' + value.id,
      value
    )
    if (response.status == 200) {
      commit('UPDATE_PAYMENT_TYPE', response.data)
    }
    return response
  },
  async deletePaymentType({ commit }, id) {
    const response = await this.$axios.delete(
      this.$config.axios.BASE_API_URL + '/pos/payment-type/' + id
    )
    if (response.status == 200) {
      commit('DELETE_PAYMENT_TYPE', id)
    }
    return response
  },
  // End payment type

  // Start Product
  async fetchProduct({ commit }) {
    const response = await this.$axios.get(
      this.$config.axios.BASE_API_URL + '/pos/product'
    )
    if (response.status == 200) {
      commit('SET_PRODUCT', response.data)
    }
    return response
  },
  async addProduct({ commit }, value) {
    value.title = value.languages_main_value
    value.language = {}
    value.language[value.languages_main] = value.languages_main_value
    if (value.prices) {
      const price = []
      for (const key in value.prices) {
        price.push({ _id: key, price: value.prices[key] })
      }
      value.price = price
    }

    if (value.languages && value.languages_value) {
      for (const key in value.languages) {
        value.language[value.languages[key]] = value.languages_value[key]
      }
    }
    const response = await this.$axios.post(
      this.$config.axios.BASE_API_URL + '/pos/product',
      value
    )
    if (response.status == 200) {
      commit('ADD_PRODUCT', response.data)
    }
    return response
  },
  async updateProduct({ commit }, value) {
    const response = await this.$axios.put(
      this.$config.axios.BASE_API_URL + '/pos/product/' + value.id,
      value
    )
    if (response.status == 200) {
      commit('UPDATE_PRODUCT', response.data)
    }
    return response
  },
  async deleteProduct({ commit }, id) {
    const response = await this.$axios
      .delete(this.$config.axios.BASE_API_URL + '/pos/product/' + id)
      .catch(({ response: err }) => {
        return err
      })
    if (response.status == 200) {
      commit('DELETE_PRODUCT', id)
    }
    return response
  },
  // End Product

  // Start product type
  async fetchProductType({ commit }) {
    const response = await this.$axios.get(
      this.$config.axios.BASE_API_URL + '/pos/product-type'
    )
    if (response.status == 200) {
      commit('SET_PRODUCT_TYPE', response.data)
    }
    return response
  },
  async addProductType({ commit }, value) {
    const response = await this.$axios.post(
      this.$config.axios.BASE_API_URL + '/pos/product-type',
      value
    )
    if (response.status == 200) {
      commit('ADD_PRODUCT_TYPE', response.data)
    }
    return response
  },
  async updateProductType({ commit }, value) {
    const response = await this.$axios.put(
      this.$config.axios.BASE_API_URL + '/pos/product-type/' + value.id,
      value
    )
    if (response.status == 200) {
      commit('UPDATE_PRODUCT_TYPE', response.data)
    }
    return response
  },
  async deleteProductType({ commit }, id) {
    const response = await this.$axios.delete(
      this.$config.axios.BASE_API_URL + '/pos/product-type/' + id
    )
    if (response.status == 200) {
      commit('DELETE_PRODUCT_TYPE', id)
    }
    return response
  },
  // End product type

  // Start add on
  async fetchAddOn({ commit }) {
    const response = await this.$axios.get(
      this.$config.axios.BASE_API_URL + '/pos/add-on'
    )
    if (response.status == 200) {
      commit('SET_ADD_ON', response.data)
    }
    return response
  },
  async addAddOn({ commit }, value) {
    const response = await this.$axios.post(
      this.$config.axios.BASE_API_URL + '/pos/add-on',
      value
    )
    if (response.status == 200) {
      commit('ADD_ADD_ON', response.data)
    }
    return response
  },
  async updateAddOn({ commit }, value) {
    const response = await this.$axios.put(
      this.$config.axios.BASE_API_URL + '/pos/add-on/' + value.id,
      value
    )
    if (response.status == 200) {
      commit('UPDATE_ADD_ON', response.data)
    }
    return response
  },
  async deleteAddOn({ commit }, id) {
    const response = await this.$axios.delete(
      this.$config.axios.BASE_API_URL + '/pos/add-on/' + id
    )
    if (response.status == 200) {
      commit('DELETE_ADD_ON', id)
    }
    return response
  },
  // End add on

  // Start add on type
  async fetchAddOnType({ commit }) {
    const response = await this.$axios.get(
      this.$config.axios.BASE_API_URL + '/pos/add-on-type'
    )
    if (response.status == 200) {
      commit('SET_ADD_ON_TYPE', response.data)
    }
    return response
  },
  async addAddOnType({ commit }, value) {
    const response = await this.$axios.post(
      this.$config.axios.BASE_API_URL + '/pos/add-on-type',
      value
    )
    if (response.status == 200) {
      commit('ADD_ADD_ON_TYPE', response.data)
    }
    return response
  },
  async updateAddOnType({ commit }, value) {
    const response = await this.$axios.put(
      this.$config.axios.BASE_API_URL + '/pos/add-on-type/' + value.id,
      value
    )
    if (response.status == 200) {
      commit('UPDATE_ADD_ON_TYPE', response.data)
    }
    return response
  },
  async deleteAddOnType({ commit }, id) {
    const response = await this.$axios.delete(
      this.$config.axios.BASE_API_URL + '/pos/add-on-type/' + id
    )
    if (response.status == 200) {
      commit('DELETE_ADD_ON_TYPE', id)
    }
    return response
  },
  // End add on type
}
