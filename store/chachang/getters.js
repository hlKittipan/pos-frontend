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
  getMenuList: (state) => {
    const data = [];
    for (const key in state.menuList) {
      const item = state.menuList[key].price
      let price = {}
      for (const keyItem in item){
        price[item[keyItem].name] = item[keyItem].price
      }
      for (const keyItem in item){
        price[item[keyItem].name+'_id'] = item[keyItem]._id
      }
      data.push({
        key: key,
        id: state.menuList[key]._id,
        name: state.menuList[key].name,
        name_th: state.menuList[key].name_th,
        ...price,
        type: state.menuList[key].type ? state.menuList[key].type._id : '',
        type_name: state.menuList[key].type ? state.menuList[key].type.name : '',
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
  getMenuTypeList: (state) => {
    const data = [];
    for (const key in state.menuType) {
      data.push({
        key: key,
        name: state.menuType[key].name,
        id: state.menuType[key]._id,
      });
    }
    return data
  },
}
