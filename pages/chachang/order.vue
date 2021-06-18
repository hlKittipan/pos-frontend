<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">

      <ChachangOrderList />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10}">
      <ChachangOrderAdd />
    </a-col>
  </a-row>
</template>

<script>
import ChachangOrderAdd from '@/components/chachang/order_add'
import ChachangOrderList from '@/components/chachang/order_list'

export default {
  layout: 'chachang',
  name: 'Order',
  components: {
    ChachangOrderAdd,
    ChachangOrderList,
  },
}
</script>

<style scoped>

</style>
