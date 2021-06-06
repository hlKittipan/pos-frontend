<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">
      <PriceTypeList />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10}">
      <PriceTypeAdd />
    </a-col>
  </a-row>
</template>

<script>
import PriceTypeList from '@/components/chachang/price_type_list'
import PriceTypeAdd from '@/components/chachang/price_type_add'

export default {
  layout: 'chachang',
  name: 'PriceType',
  components: {
    PriceTypeList,
    PriceTypeAdd,
  },
  middleware: 'auth'
}
</script>

<style scoped>

</style>
