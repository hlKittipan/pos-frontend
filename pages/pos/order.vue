<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14 }">
      <PosOrderList :product="product" />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10 }">
      <PosOrderAdd />
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
}
</script>

<style scoped>
</style>
