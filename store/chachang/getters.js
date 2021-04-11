export default {
  getMenuList: (state) => {
    const data = [];
    for (const key in state.menuList) {
      data.push({
        key: key,
        name: state.menuList[key].name,
        name_th: state.menuList[key].name_th,
        price: state.menuList[key].price_iced,
      });
    }
    return data
  }
}
