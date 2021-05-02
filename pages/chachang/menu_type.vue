<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">
      <MenuTypeList />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10}">
      <MenuTypeAdd />
    </a-col>
  </a-row>
</template>

<script>
import MenuTypeList from '@/components/chachang/menu_type_list'
import MenuTypeAdd from '@/components/chachang/menu_type_add'

export default {
  layout: 'chachang',
  name: 'MenuType',
  components: {
    MenuTypeList,
    MenuTypeAdd,
  }
}
</script>

<style scoped>

</style>
