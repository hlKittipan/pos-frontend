export default {
  SET_SLIDER_CHA_CHANG(state, sliderChaChang) {
    sliderChaChang === null ? state.sliderChaChang = !state.sliderChaChang : state.sliderChaChang = sliderChaChang
  },
  SET_LOADING_CHA_CHANG(state, loadingChaChang) {
    loadingChaChang === null ? state.loadingChaChang = !state.loadingChaChang : state.loadingChaChang = loadingChaChang
  },
  SET_SELECTED_KEY(state, key) {
    state.selectedKeys = key
  },

  // Start price type
  SET_PRICE_TYPE(state, priceType) {
    state.priceType = priceType
  },
  ADD_PRICE_TYPE(state, title){
    state.priceType.push(title)
  },
  UPDATE_PRICE_TYPE(state, value){
    const index = state.priceType.findIndex(item => item._id == value._id)
    state.priceType[index].name = value.name
  },
  DELETE_PRICE_TYPE(state, id){
    const index = state.priceType.findIndex(item => item.id == id)
    state.priceType.splice(index, 1)
  },
  // End price type

  // Start payment type
  SET_PAYMENT_TYPE(state, paymentType) {
    state.paymentType = paymentType
  },
  ADD_PAYMENT_TYPE(state, title){
    state.paymentType.push(title)
  },
  UPDATE_PAYMENT_TYPE(state, value){
    const index = state.paymentType.findIndex(item => item._id == value._id)
    state.paymentType[index].name = value.name
  },
  DELETE_PAYMENT_TYPE(state, id){
    const index = state.paymentType.findIndex(item => item.id == id)
    state.paymentType.splice(index, 1)
  },
  // End payment type

  // Start menu
  SET_MENU(state, menu) {
    state.menuList = menu
  },
  ADD_MENU(state, menu){
    console.log(menu)
    state.menuList.push(menu)
  },
  UPDATE_MENU(state, value){
    const index = state.menuList.findIndex(item => item._id == value._id)
    state.menuList[index] = value
  },
  DELETE_MENU(state, id){
    const index = state.menuList.findIndex(item => item._id == id)
    state.menuList.splice(index, 1)
  },
  ADD_DEFAULT_PRICE_AFTER_ADD_PRICE_TYPE(state, value){
    const item = state.menuList
    for (const keyItem in item) {
      item[keyItem].price.push({price: 0.0, ...value})
    }
  },
  // End menu
}
