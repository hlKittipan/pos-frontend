<template>
  <a-row type="flex"  justify="center">
    <a-col :xs="{ span: 24 }" :lg="{ span: 16}">
      <ChachangProductList />
    </a-col>
    <a-col  :xs="{ span: 24 }" :lg="{ span: 8}">
      <ChachangAddProduct />
    </a-col>
  </a-row>
</template>

<script>
import ChachangProductList from '@/components/chachang/product_list'
import ChachangAddProduct from '@/components/chachang/product_add'

export default {
  layout: 'chachang',
  name: 'Product',
  components: {
    ChachangProductList,
    ChachangAddProduct,
  },
}
</script>

<style scoped>
</style>
