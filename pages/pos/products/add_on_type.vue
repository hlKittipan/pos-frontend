<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">
      <AddOnTypeList />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10}">
      <AddOnTypeAdd />
    </a-col>
  </a-row>
</template>

<script>
import AddOnTypeList from '@/components/pos/products/add_on_type_list'
import AddOnTypeAdd from '@/components/pos/products/add_on_type_add'

export default {
  layout: 'pos',
  name: 'AddOnType',
  components: {
    AddOnTypeList,
    AddOnTypeAdd,
  },
}
</script>

<style scoped>

</style>
