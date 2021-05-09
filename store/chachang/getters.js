export default {
  getSliderChaChang: (state) => {
    return state.sliderChaChang
  },
  getLoadingChaChang: (state) => {
    return state.loadingChaChang
  },
  getSelectedKey: (state) => {
    return state.setSelectedKey
  },  
  getLanguageCode: (state) => {
    return state.languageCode
  },
  getProductList: (state) => {
    const data = [];
    for (const key in state.productList) {
      const item = state.productList[key].price
      let price = {}
      for (const keyItem in item){
        price[item[keyItem].name] = item[keyItem].price
      }
      for (const keyItem in item){
        price[item[keyItem].name+'_id'] = item[keyItem]._id
      }
      data.push({
        key: key,
        id: state.productList[key]._id,
        name: state.productList[key].title,
        ...price,
        type: state.productList[key].type ? state.productList[key].type._id : '',
        type_name: state.productList[key].type ? state.productList[key].type.name : '',
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
  getProductTypeList: (state) => {
    const data = [];
    for (const key in state.productType) {
      data.push({
        key: key,
        name: state.productType[key].name,
        id: state.productType[key]._id,
      });
    }
    return data
  },
}
