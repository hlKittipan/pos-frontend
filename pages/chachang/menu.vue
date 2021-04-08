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
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                </tr>
              </thead>
            </table>
          </b-col>
        </b-row>
      </b-card-text>
    </b-card>
  </b-container>
</template>

<script>
import ChachangMenuList from '@/components/chachang/menu_list'

export default {
  name: 'Menu',
  components: {
    ChachangMenuList
  }
}
</script>

<style scoped>

</style>
