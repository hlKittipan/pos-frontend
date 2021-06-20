<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">
      <PriceTemplateList />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10}">
      <PriceTemplateAdd />
    </a-col>
  </a-row>
</template>

<script>
import PriceTemplateList from '@/components/pos/price_template_list'
import PriceTemplateAdd from '@/components/pos/price_template_add'

export default {
  layout: 'pos',
  name: 'PriceTemplate',
  components: {
    PriceTemplateList,
    PriceTemplateAdd,
  },
}
</script>

<style scoped>

</style>
