<template>
  <a-layout-sider
    :collapsed="sliderChaChang"
    :trigger="null"
    collapsible
    breakpoint="lg"
    collapsed-width="0"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
    :style="{ left: 0 }"
  >
    <div class="logo" />
    <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" >
      <a-menu-item key="1">
        <a-icon type="user" />
        <span><nuxt-link to="/chachang/menu">Menu</nuxt-link></span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="video-camera" />
        <span><nuxt-link to="/chachang/order">Order</nuxt-link></span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="video-camera" />
        <span><nuxt-link to="/chachang/order">Payment type</nuxt-link></span>
      </a-menu-item>
      <a-menu-item key="4">
        <a-icon type="video-camera" />
        <span><nuxt-link to="/chachang/order">Payment type</nuxt-link></span>
      </a-menu-item>     
    </a-menu>
  </a-layout-sider>
</template>
<script>
export default {
  name: 'ChaChangSlider',
  computed: {
    sliderChaChang() {
      return this.$store.getters['chachang/getSliderChaChang']
    },
  },
  watch: {
    sliderChaChang() {
      return this.$store.getters['chachang/getSliderChaChang']
    },
  },
  methods: {
    onCollapse(collapsed, type) {
      this.$store.dispatch('chachang/setSliderChaChang', collapsed)
      console.log(collapsed, type)
    },
    onBreakpoint(broken) {
      this.$store.dispatch('chachang/setSliderChaChang', broken)
      console.log(broken)
    },
  },
}
</script>
