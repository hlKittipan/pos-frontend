<template>
  <b-container>
    <b-card
      title="Main"
    >
      <b-card-text>
        <b-row>
          <b-col cols="4">
            <ChachangMenuList />
          </b-col>
          <b-col cols="4">
            <ChachangAddOrder />
          </b-col>
        </b-row>
      </b-card-text>
    </b-card>
  </b-container>
</template>

<script>
import ChachangAddOrder from '@/components/chachang/add_order'
import ChachangMenuList from '@/components/chachang/menu_list'

export default {
  name: 'Order',
  components: {
    ChachangAddOrder,
    ChachangMenuList
  }
}
</script>

<style scoped>

</style>
