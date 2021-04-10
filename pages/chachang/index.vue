<template>
  <div class="container">
    <a-row>
      <a-col :span="12">
        <a-space>
          <a-button type="primary" >
            <nuxt-link to="/chachang/menu">Menu</nuxt-link>
          </a-button>
          <a-button type="primary">
            <nuxt-link to="/chachang/order">Order</nuxt-link>
          </a-button>
        </a-space>
      </a-col>
      <a-col :span="12">
        <a-space direction="vertical">
          <a-card title="Card" style="width: 300px">
            <p>Card content</p>
            <p>Card content</p>
          </a-card>
          <a-card title="Card" style="width: 300px">
            <p>Card content</p>
            <p>Card content</p>
          </a-card>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Dashboard from '@/components/chachang/dashboard'

export default {
  name: 'Index',
  components: {
    Dashboard,
  },
}
</script>

<style scoped>
</style>
