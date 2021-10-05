export default {
  SET_SLIDER_PAGE(state, sliderPage) {
    sliderPage === null
      ? (state.sliderPage = !state.sliderPage)
      : (state.sliderPage = sliderPage)
  },
  SET_LOADING_PAGE(state, loadingPage) {
    loadingPage === null
      ? (state.loadingPage = !state.loadingPage)
      : (state.loadingPage = loadingPage)
  },
  SET_SELECTED_KEY(state, key) {
    state.selectedKeys = key
  },
  // Start Language
  SET_LANGUAGE(state, value) {
    state.languageCode = value
  },
  ADD_LANGUAGE(state, title) {
    state.languageCode.push(title)
  },
  UPDATE_LANGUAGE(state, value) {
    const index = state.languageCode.findIndex((item) => item._id == value._id)
    state.languageCode[index].name = value.name
  },
  DELETE_LANGUAGE(state, id) {
    const index = state.languageCode.findIndex((item) => item.id == id)
    state.languageCode.splice(index, 1)
  },
  // End Language

  // Start price type
  SET_PRICE_TYPE(state, priceType) {
    state.priceType = priceType
  },
  ADD_PRICE_TYPE(state, title) {
    state.priceType.push(title)
  },
  UPDATE_PRICE_TYPE(state, value) {
    const index = state.priceType.findIndex((item) => item._id == value._id)
    state.priceType[index].name = value.name
  },
  DELETE_PRICE_TYPE(state, id) {
    const index = state.priceType.findIndex((item) => item.id == id)
    state.priceType.splice(index, 1)
  },
  // End price type

  // Start price template
  SET_PRICE_TEMPLATE(state, priceTemplate) {
    state.priceTemplate = priceTemplate
  },
  ADD_PRICE_TEMPLATE(state, title) {
    state.priceTemplate.push(title)
  },
  UPDATE_PRICE_TEMPLATE(state, value) {
    const index = state.priceTemplate.findIndex((item) => item._id == value._id)
    state.priceTemplate[index].name = value.name
  },
  DELETE_PRICE_TEMPLATE(state, id) {
    const index = state.priceTemplate.findIndex((item) => item.id == id)
    state.priceTemplate.splice(index, 1)
  },
  // End price template

  // Start payment type
  SET_PAYMENT_TYPE(state, paymentType) {
    state.paymentType = paymentType
  },
  ADD_PAYMENT_TYPE(state, title) {
    state.paymentType.push(title)
  },
  UPDATE_PAYMENT_TYPE(state, value) {
    const index = state.paymentType.findIndex((item) => item._id == value._id)
    state.paymentType[index].name = value.name
  },
  DELETE_PAYMENT_TYPE(state, id) {
    const index = state.paymentType.findIndex((item) => item.id == id)
    state.paymentType.splice(index, 1)
  },
  // End payment type

  // Start product
  SET_PRODUCT(state, product) {
    state.productList = product
  },
  ADD_PRODUCT(state, product) {
    console.log(product)
    state.productList.push(product)
  },
  UPDATE_PRODUCT(state, value) {
    const index = state.productList.findIndex((item) => item._id == value._id)
    state.productList[index] = value
  },
  DELETE_PRODUCT(state, id) {
    const index = state.productList.findIndex((item) => item._id == id)
    state.productList.splice(index, 1)
  },
  // End product

  // Start product type
  SET_PRODUCT_TYPE(state, productType) {
    state.productType = productType
  },
  ADD_PRODUCT_TYPE(state, title) {
    state.productType.push(title)
  },
  UPDATE_PRODUCT_TYPE(state, value) {
    const index = state.productType.findIndex((item) => item._id == value._id)
    state.productType[index].name = value.name
  },
  DELETE_PRODUCT_TYPE(state, id) {
    const index = state.productType.findIndex((item) => item.id == id)
    state.productType.splice(index, 1)
  },
  // End product type

  // Start add on
  SET_ADD_ON(state, addOn) {
    state.addOn = addOn
  },
  ADD_ADD_ON(state, title) {
    state.addOn.push(title)
  },
  UPDATE_ADD_ON(state, value) {
    const index = state.addOn.findIndex((item) => item._id == value._id)
    state.addOn[index].name = value.name
  },
  DELETE_ADD_ON(state, id) {
    const index = state.addOn.findIndex((item) => item.id == id)
    state.addOn.splice(index, 1)
  },
  // End add on

  // Start add on type
  SET_ADD_ON_TYPE(state, addOnType) {
    state.addOnType = addOnType
  },
  ADD_ADD_ON_TYPE(state, title) {
    state.addOnType.push(title)
  },
  UPDATE_ADD_ON_TYPE(state, value) {
    const index = state.addOnType.findIndex((item) => item._id == value._id)
    state.addOnType[index].title = value.title
  },
  DELETE_ADD_ON_TYPE(state, id) {
    const index = state.addOnType.findIndex((item) => item.id == id)
    state.addOnType.splice(index, 1)
  },
  // End add on type

  //Start order
  SELECT_PRODUCT(state, item) {
    let price = _.map(item.price, function (value, key) {
      return { ...value, qty: 0, total: 0, discount: 0 }
    })
    item.price = price
    state.selectProduct = item
  },
  CANCEL_SELECT_PRODUCT(state) {
    state.selectProduct = undefined
  },
  CALCULATE_PRICE(state, item) {
    const cacheProduct = state.selectProduct
    const value = item[0]
    const index = item[1]
    const type = item[2]
    const cachePrice = cacheProduct.price[index]
    cachePrice[type] = value
    cachePrice.total = cachePrice.qty * cachePrice.price
    cachePrice.total = cachePrice.total - cachePrice.discount
    cacheProduct.price[index] = cachePrice
  },
  ADD_ORDER(state, { item, priceType }) {
    const total = priceType.total ? priceType.total : priceType.price
    const price = priceType.price
    const price_name = priceType.name
    const qty = priceType.qty ? priceType.qty : 1
    const discount = priceType.discount ? priceType.discount : 0
    const cacheDate = state.orderList
    const currentLocale = this.$i18n.locale ? this.$i18n.locale : 'en'
    const newData = {
      key: state.orderCount,
      product_name: item.language[currentLocale],
      price,
      price_name,
      qty,
      discount,
      total,
      index: priceType._id,
    }
    state.orderList = [...cacheDate, newData]
    state.orderCount++
  },
  ADD_MULTI_ORDER(state) {
    const data = state.selectProduct
    console.log(data)
    const dataPrice = data.price
    const currentLocale = this.$i18n.locale ? this.$i18n.locale : 'en'
    const price = []
    for (const key in dataPrice) {
      if (dataPrice[key].qty > 0) {
        let count = state.orderCount
        state.orderCount++
        state.orderList.push({
          key: count,
          product_name: data.language[currentLocale],
          price: dataPrice[key].price,
          price_name: dataPrice[key].name,
          qty: dataPrice[key].qty,
          discount: dataPrice[key].discount,
          total: dataPrice[key].total,
          price_id: dataPrice[key]._id,
        })
      }
    }
  },
  //End order
}
