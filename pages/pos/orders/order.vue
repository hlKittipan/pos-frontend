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

import PosOrderAdd from '@/components/pos/orders/order_add'
import PosOrderList from '@/components/pos/orders/order_list'

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
      orderCount: undefined,
    }
  },
  async asyncData(context) {
    const { app } = context
    await app.store.dispatch('pos/fetchProduct')
    await app.store.dispatch('pos/fetchProductType')
  },
  mounted() {
    this.product = this.$store.getters['pos/getProductListToOrder']
    this.orderList = this.$store.getters['pos/getOrderList']
    this.orderCount = this.$store.getters['pos/getOrderCount']
  },
  methods: {
    parentMethod() {
      console.log('Parent method !')
    },
    addMenu() {
      console.log('Add menu')
    },
    addOrder(index, item, priceType) {
      console.log(item)
      const result = this.$store.dispatch('pos/addOrder',{
        item,
        priceType
      })
    },
  },
  
  watch: {
    getOrderList: function (value) {
      this.orderList = value
    },
    getOrderCount: function (value) {
      this.orderCount = value
    },
  },
  computed: {
    getOrderList() {
      return this.$store.getters['pos/getOrderList']
    },
    getOrderCount() {
      return this.$store.getters['pos/getOrderCount']
    },
  },
}
</script>

<style scoped>
</style>
