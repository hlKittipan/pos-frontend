<template>
  <a-layout-sider
    :collapsed="sliderPage"
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
        <nuxt-link to="/pos">
          <a-icon type="dashboard" /> <span>Dashboard</span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="1">
        <nuxt-link to="/pos/products/product">
          <a-icon type="experiment" /> <span>Product</span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="2">
        <nuxt-link to="/pos/products/add_on">
          <a-icon type="appstore" /> <span>Add on</span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="3">
        <nuxt-link to="/pos/orders/order">
          <a-icon type="container" /> <span>Order</span>
        </nuxt-link>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="database" /><span>Menagement</span></span>
        <a-menu-item key="4">
          <nuxt-link to="/pos/products/product_type">
            <a-icon type="experiment" /> <span>Product type</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="5">
          <nuxt-link to="/pos/prices/price_type">
            <a-icon type="dollar" /> <span>Price type</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="6">
          <nuxt-link to="/pos/prices/price_template">
            <a-icon type="dollar" /> <span>Price template</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="7">
          <nuxt-link to="/pos/payments/payment_type">
            <a-icon type="wallet" /> <span>Payment type</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="8">
          <nuxt-link to="/pos/products/add_on_type">
            <a-icon type="appstore" /> <span>Add on type</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="9">
          <nuxt-link to="/pos/setings/language">
            <a-icon type="global" /> <span>Language</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="10">
          <nuxt-link to="/pos/settings/setting">
            <a-icon type="setting" /> <span>Setting</span>
          </nuxt-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script>
export default {
  name: 'PosSlider',
  data() {
    return {
      current: '0',
      theme: 'dark',
    };
  },
  computed: {
    sliderPage() {
      return this.$store.getters['pos/getSliderPage']
    },
  },
  watch: {
    sliderPage() {
      return this.$store.getters['pos/getSliderPage']
    },
  },
  methods: {
    handleClick(e) {
      console.log('click ', e);
      this.current = e.key;
    },
    onCollapse(collapsed, type) {
      this.$store.dispatch('pos/setSliderPage', collapsed)
      console.log(collapsed, type)
    },
    onBreakpoint(broken) {
      this.$store.dispatch('pos/setSliderPage', broken)
      console.log(broken)
    },
  },
}
</script>
