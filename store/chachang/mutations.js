export default {
  SET_MENU(state, menu) {
    state.menuList = menu
  },
  SET_PAYMENT_TYPE(state, paymentType) {
    state.paymentType = paymentType
  },
  SET_SLIDER_CHA_CHANG(state, sliderChaChang) {
    sliderChaChang === null ? state.sliderChaChang = !state.sliderChaChang : state.sliderChaChang = sliderChaChang
  },
}
