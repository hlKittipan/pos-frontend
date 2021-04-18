<template>
  <a-layout id="components" style="min-height: 100vh">
    <Slider />
    <a-layout>
      <Header />
      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
        <a-breadcrumb style="margin: 16px 10px">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ background: '#fff', padding: '24px', minHeight: '380px' }"
        >
          <nuxt />
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </a-layout>
</template>
<script>
import Header from '@/layouts/header/chachang'
import Slider from '@/layouts/slider/chachang'
import Footer from '@/layouts/footer/chachang'

export default {
  components: {
    Header,
    Slider,
    Footer,
  },
}
</script>

<style>
#components .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components .trigger:hover {
  color: #1890ff;
}

#components .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
