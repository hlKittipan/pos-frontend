<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">
      <ChachangAddOrder />
    </a-col>
  </a-row>
</template>

<script>
import ChachangAddOrder from '@/components/chachang/add_order'

export default {
  layout: 'chachang',
  name: 'Order',
  components: {
    ChachangAddOrder,
  }
}
</script>

<style scoped>

</style>
