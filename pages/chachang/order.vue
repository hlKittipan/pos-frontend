<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">
      <ChachangMenuList />
    </a-col>
    <a-col  :xs="{ span: 24 }" :lg="{ span: 10}">
      <ChachangAddMenu />
    </a-col>
  </a-row>
</template>

<script>
import ChachangAddOrder from '@/components/chachang/add_order'
import ChachangMenuList from '@/components/chachang/menu_list'

export default {
  layout: 'chachang',
  name: 'Order',
  components: {
    ChachangAddOrder,
    ChachangMenuList
  }
}
</script>

<style scoped>

</style>
