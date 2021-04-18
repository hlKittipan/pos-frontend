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
import ChachangMenuList from '@/components/chachang/menu_list'
import ChachangAddMenu from '@/components/chachang/add_menu'

export default {
  layout: 'chachang',
  name: 'Menu',
  components: {
    ChachangMenuList,
    ChachangAddMenu,
  },
}
</script>

<style scoped>
</style>
