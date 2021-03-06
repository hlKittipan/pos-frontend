import { _ } from 'core-js'

export default {
  getSliderPage: (state) => {
    return state.sliderPage
  },
  getLoadingPage: (state) => {
    return state.loadingPage
  },
  getSelectedKey: (state) => {
    return state.setSelectedKey
  },
  getLanguageCode: (state) => {
    const data = []
    for (const key in state.languageCode) {
      data.push({
        key: key,
        id: state.languageCode[key]._id,
        name: state.languageCode[key].name,
        code: state.languageCode[key].code,
      })
    }
    return data
  },
  getProductList: (state) => {
    const data = []
    for (const key in state.productList) {
      const item = state.productList[key].price
      let price = {}
      for (const keyItem in item) {
        price[item[keyItem].name] = item[keyItem].price
        price[item[keyItem].name + '_id'] = item[keyItem]._id
      }

      data.push({
        key: key,
        id: state.productList[key]._id,
        name: state.productList[key].language.en,
        ...price,
        type: state.productList[key].type
          ? state.productList[key].type._id
          : '',
        type_name: state.productList[key].type
          ? state.productList[key].type.name
          : '',
      })
    }
    return data
  },
  getPaymentTypeList: (state) => {
    const data = []
    for (const key in state.paymentType) {
      data.push({
        key: key,
        name: state.paymentType[key].name,
        id: state.paymentType[key]._id,
      })
    }
    return data
  },
  getPriceTypeList: (state) => {
    const data = []
    for (const key in state.priceType) {
      data.push({
        key: key,
        name: state.priceType[key].name,
        id: state.priceType[key]._id,
      })
    }
    return data
  },
  getPriceTemplateList: (state) => {
    const data = []
    for (const key in state.priceTemplate) {
      const item = state.priceTemplate[key].price
      let price = {}
      for (const keyItem in item) {
        price[item[keyItem]._id] = item[keyItem].price
      }
      let price_name = {}
      for (const keyItem in item) {
        price_name[item[keyItem].name] = item[keyItem].price
      }
      data.push({
        key: key,
        id: state.priceTemplate[key]._id,
        name: state.priceTemplate[key].name,
        price: price,
        ...price_name,
      })
    }
    return data
  },
  getProductTypeList: (state) => {
    const data = []
    for (const key in state.productType) {
      data.push({
        key: key,
        name: state.productType[key].name,
        id: state.productType[key]._id,
      })
    }
    return data
  },
  getProductListToOrder: (state) => {
    const data = []
    for (const key in state.productList) {
      if (data.length > 0) {
        let indexData = _.findIndex(data, {
          productType: state.productList[key].type.name,
        })
        if (indexData >= 0) {
          let tmpData = data[indexData]
          data.splice(indexData, 1)
          tmpData.product.push({ ...state.productList[key] })
          data.push(tmpData)
        } else {
          data.push({
            productType: state.productList[key].type.name,
            product: [{ ...state.productList[key] }],
          })
        }
      } else {
        data.push({
          productType: state.productList[key].type.name,
          product: [{ ...state.productList[key] }],
        })
      }
    }
    return data
  },

  getAddOnList: (state) => {
    const data = []
    for (const key in state.addOn) {
      data.push({
        key: key,
        title: state.addOn[key].title,
        price: state.addOn[key].price,
        type: state.addOn[key].type ? state.addOn[key].type._id : '',
        type_name: state.addOn[key].type ? state.addOn[key].type.title : '',
        id: state.addOn[key]._id,
      })
    }
    return data
  },

  getAddOnTypeList: (state) => {
    const data = []
    for (const key in state.addOnType) {
      data.push({
        key: key,
        title: state.addOnType[key].title,
        id: state.addOnType[key]._id,
      })
    }
    return data
  },

  getSelectProduct: (state) => {
    return state.selectProduct
  },

  getOrderList: (state) => {
    return state.orderList
  },
  getOrderCount: (state) => {
    return state.orderCount
  },
  getGroupProductInOrderList: (state) => {
    const product = []
    const orderList = state.orderList
    if (orderList) {
      for (const key in orderList) {
        let isProduct = _.findIndex(product, {
          product_name: orderList[key].product_name,
        })
        if (isProduct > -1) {
          let isProductType = _.findIndex(product[isProduct].prices, {
            price_name: orderList[key].price_name,
          })

          if (isProductType > -1) {
            let newQty = orderList[key].qty
            let newDiscount = orderList[key].discount
            let productPrice = product[isProduct].prices[isProductType].price
            let productQty = product[isProduct].prices[isProductType].qty
            let productDiscount =
              product[isProduct].prices[isProductType].discount
            let productTotal = product[isProduct].prices[isProductType].total

            productQty += newQty
            productDiscount += newDiscount
            productTotal = productQty * productPrice - productDiscount

            product[isProduct].prices[isProductType].qty = productQty
            product[isProduct].prices[isProductType].discount = productDiscount
            product[isProduct].prices[isProductType].total = productTotal
          } else {
            product[isProduct].prices.push({
              price: orderList[key].price,
              price_name: orderList[key].price_name,
              qty: orderList[key].qty,
              total: orderList[key].total,
              discount: orderList[key].discount,
            })
            product[isProduct].rowspan += 1
          }
        } else {
          product.push({
            index: orderList[key].index,
            rowspan: 1,
            product_name: orderList[key].product_name,
            key: orderList[key].key,
            prices: [
              {
                price: orderList[key].price,
                price_name: orderList[key].price_name,
                qty: orderList[key].qty,
                total: orderList[key].total,
                discount: orderList[key].discount,
              },
            ],
          })
        }
      }
      console.log(product)
    }
    return product
  },
}
