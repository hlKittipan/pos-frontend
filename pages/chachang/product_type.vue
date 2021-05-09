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
import ProductTypeList from '@/components/chachang/product_type_list'
import ProductTypeAdd from '@/components/chachang/product_type_add'

export default {
  layout: 'chachang',
  name: 'ProductType',
  components: {
    ProductTypeList,
    ProductTypeAdd,
  }
}
</script>

<style scoped>

</style>
