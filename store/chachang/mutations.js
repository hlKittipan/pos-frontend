export default {
  SET_MENU(state, menu) {
    state.menuList = menu
  },
  SET_PAYMENT_TYPE(state, paymentType) {
    state.paymentType = paymentType
  },
  SET_PRICE_TYPE(state, priceType) {
    state.priceType = priceType
  },
  SET_SLIDER_CHA_CHANG(state, sliderChaChang) {
    sliderChaChang === null ? state.sliderChaChang = !state.sliderChaChang : state.sliderChaChang = sliderChaChang
  },
  SET_LOADING_CHA_CHANG(state, loadingChaChang) {
    loadingChaChang === null ? state.loadingChaChang = !state.loadingChaChang : state.loadingChaChang = loadingChaChang
  },
  ADD_PRICE_TYPE(state, title){
    state.priceType.push(title)
  },
  DELETE_PRICE_TYPE(state, id){
    const index = state.priceType.findIndex(item => item.id == id)
    state.priceType.splice(index, 1)
  },
  ADD_MENU(state, menu){
    console.log(menu)
    state.menuList.push(menu)
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
}
