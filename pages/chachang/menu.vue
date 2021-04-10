<template>
  <div class="container">
    <a-row>
      <a-col :span="12">
          <ChachangMenuList />
      </a-col>
      <a-col :span="12">

      </a-col>
    </a-row>
  </div>
</template>

<script>
import ChachangMenuList from '@/components/chachang/menu_list'

export default {
  name: 'Menu',
  components: {
    ChachangMenuList,
  },
}
</script>

<style scoped>
</style>
