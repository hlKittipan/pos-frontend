<template>
  <a-layout-header style="background: #fff; padding: 0" :style="{ position: 'fixed', zIndex: 100, width: '100%' }">
    <a-icon
      class="trigger"
      :type="setSliderPage ? 'menu-unfold' : 'menu-fold'"
      @click="() => sliderToggle()"
    />
  </a-layout-header>
</template>

<script>
export default {
  name: 'PosHeader',
  computed: {
    setSliderPage() {
      return this.$store.getters['pos/getSliderPage']
    },
  },
  methods: {
    sliderToggle() {
      this.$store.dispatch('pos/setSliderPage')
    },
  },
}
</script>
