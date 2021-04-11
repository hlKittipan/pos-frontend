<template>
  <a-row>
    <a-col :span="12">
      <ChachangMenuList />
    </a-col>
    <a-col :span="12">
      <ChachangAddMenu />
    </a-col>
  </a-row>
</template>

<script>
import ChachangMenuList from '@/components/chachang/menu_list'
import ChachangAddMenu from '@/components/chachang/add_menu'

export default {
  name: 'Menu',
  components: {
    ChachangMenuList,
    ChachangAddMenu,
  },
}
</script>

<style scoped>
</style>
