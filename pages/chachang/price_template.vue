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
import PriceTemplateList from '@/components/chachang/price_template_list'
import PriceTemplateAdd from '@/components/chachang/price_template_add'

export default {
  layout: 'chachang',
  name: 'PriceTemplate',
  components: {
    PriceTemplateList,
    PriceTemplateAdd,
  },
  middleware: 'auth'
}
</script>

<style scoped>

</style>
