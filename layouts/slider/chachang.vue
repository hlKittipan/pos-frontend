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
    <a-menu mode="inline" :default-selected-keys="['0']" @click="handleClick" :theme="theme" :selected-keys="[current]">
      <a-menu-item key="0">
        <nuxt-link to="/chachang">
          <a-icon type="user" /> <span>Dashboard</span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="1">
        <nuxt-link to="/chachang/menu">
          <a-icon type="user" /> <span>Menu</span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="2">
        <nuxt-link to="/chachang/order">
          <a-icon type="video-camera" /> <span>Order</span>
        </nuxt-link>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" /><span>Menagement</span></span>
        <a-menu-item key="3">
          <nuxt-link to="/chachang/menu_type">
            <a-icon type="video-camera" /> <span>Menu type</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="4">
          <nuxt-link to="/chachang/price_type">
            <a-icon type="video-camera" /> <span>Payment type</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="5">
          <nuxt-link to="/chachang/payment_type">
            <a-icon type="video-camera" /> <span>Payment type</span>
          </nuxt-link>
        </a-menu-item>
      </a-sub-menu>      
    </a-menu>
  </a-layout-sider>
</template>
<script>
export default {
  name: 'ChaChangSlider',
  data() {
    return {
      current: '1',
      theme: 'dark',
    };
  },
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
    handleClick(e) {
      console.log('click ', e);
      this.current = e.key;
    },
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
