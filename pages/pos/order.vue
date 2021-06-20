<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">

      <PosOrderList />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10}">
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
}
</script>

<style scoped>

</style>
