<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">
      <ProductTypeList />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10}">
      <ProductTypeAdd />
    </a-col>
  </a-row>
</template>

<script>
import ProductTypeList from '@/components/pos/products/product_type_list'
import ProductTypeAdd from '@/components/pos/products/product_type_add'

export default {
  layout: 'pos',
  name: 'ProductType',
  components: {
    ProductTypeList,
    ProductTypeAdd,
  },
}
</script>

<style scoped>

</style>
