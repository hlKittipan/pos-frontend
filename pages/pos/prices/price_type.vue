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
import PriceTypeList from '@/components/pos/prices/price_type_list'
import PriceTypeAdd from '@/components/pos/prices/price_type_add'

export default {
  layout: 'pos',
  name: 'PriceType',
  components: {
    PriceTypeList,
    PriceTypeAdd,
  },
}
</script>

<style scoped>

</style>
