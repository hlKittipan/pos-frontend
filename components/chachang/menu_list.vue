<template>
  <b-container>
    <b-card
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
    >
      <b-card-text>
        <nuxt-link
          v-for="menus in menuList"
          :key="menus.id"
          :to="{ path: `/photos/${menus.id}` }"
        >
          <img :src="menus.name" class="photo-item">
          {{ menus.name_th }}
        </nuxt-link>
      </b-card-text>
      <b-button href="#" variant="primary">
        Go somewhere
      </b-button>
    </b-card>
  </b-container>
</template>

<script>

export default {
  name: 'MenuList',
  computed: {
    menuList () {
      // eslint-disable-next-line no-console
      return this.$store.getters['chachang/getMenuList']
    }
  },
  created () {
    // eslint-disable-next-line no-console
    console.log(this.$store.getters['chachang/getMenuList'])
    this.$store.dispatch('chachang/fetchMenu')
  }
  // methods: {
  //   ...mapActions('chachang', ['fetchMenu'])
  // }
}
</script>

<style scoped>

</style>
