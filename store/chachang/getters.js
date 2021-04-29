export default {
  getMenuList: (state) => {
    const data = [];
    for (const key in state.menuList) {
      const item = state.menuList[key].price
      let price = {}
      for (const keyItem in item){
        price[item[keyItem].name] = item[keyItem].price
      }
      data.push({
        key: key,
        _id: state.menuList[key]._id,
        name: state.menuList[key].name,
        name_th: state.menuList[key].name_th,
        ...price
      });
    }
    return data
  },
  getPaymentTypeList: (state) => {
    const data = [];
    for (const key in state.paymentType) {
      data.push({
        key: key,
        name: state.paymentType[key].name,
        id: state.paymentType[key]._id,
      });
    }
    return data
  },
  getPriceTypeList: (state) => {
    const data = [];
    for (const key in state.priceType) {
      data.push({
        key: key,
        name: state.priceType[key].name,
        id: state.priceType[key]._id,
      });
    }
    return data
  },
  getSliderChaChang: (state) => {
    return state.sliderChaChang
  },
  getLoadingChaChang: (state) => {
    return state.loadingChaChang
  }
}
