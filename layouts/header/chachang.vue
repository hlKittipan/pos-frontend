<template>
  <a-layout-header style="background: #fff; padding: 0" :style="{ position: 'fixed', zIndex: 100, width: '100%' }">
    <a-icon
      class="trigger"
      :type="sliderChaChang ? 'menu-unfold' : 'menu-fold'"
      @click="() => sliderToggle()"
    />
  </a-layout-header>
</template>

<script>
export default {
  computed: {
    sliderChaChang() {
      return this.$store.getters['chachang/getSliderChaChang']
    },
  },
  methods: {
    sliderToggle() {
      this.$store.dispatch('chachang/setSliderChaChang')
    },
  },
}
</script>
