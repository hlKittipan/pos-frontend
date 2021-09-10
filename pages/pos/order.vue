<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14 }">
      <PosOrderList :product="product" :addOrder="addOrder"/>
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10 }">
      <PosOrderAdd :orderList="orderList" :parentMethod="parentMethod"/>
    </a-col>
  </a-row>
</template>

<script>

import PosOrderAdd from '@/components/pos/order_add'
import PosOrderList from '@/components/pos/order_list'

export default {
  layout: 'pos',
  name: 'Order',
  components: {
    PosOrderAdd,
    PosOrderList,
  },
  data() {
    return {
      product: [],
      orderList: [],
      count: 1,
    }
  },
  async asyncData(context) {
    const { app } = context
    await app.store.dispatch('pos/fetchProduct')
    await app.store.dispatch('pos/fetchProductType')
  },
  async beforeCreate() {
    this.product = await this.$store.getters['pos/getProductListToOrder']
    console.log(this.product)
  },
  methods: {
    parentMethod() {
      console.log('Parent method !')
    },
    addMenu() {
      console.log('Add menu')
    },
    addOrder(index, item, items) {
      const { count, orderList } = this;
      const newData = {
        key: count,
        item: item.language[this.$i18n.locale],
        price: items.price,
        qty: 1,
        tax: 0,
        discount: 0,
        total: items.price,
        index: items._id
      };
      this.orderList = [...orderList,newData]
      this.count++;
    },
  },
}
</script>

<style scoped>
</style>
