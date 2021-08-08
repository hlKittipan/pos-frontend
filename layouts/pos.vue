<template>
  <a-layout id="components" style="min-height: 100vh">
    <Slider />
    <a-layout>
      <Header />
      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
        <a-breadcrumb style="margin: 16px 10px">
          <a-breadcrumb-item
            v-for="(crumb, index) in crumbs"
            :key="index"
            >{{ $route.fullPath === crumb.path && title !== null ? title : crumb.title}}</a-breadcrumb-item
          >
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
import Header from '@/layouts/header/pos'
import Slider from '@/layouts/slider/pos'
import Footer from '@/layouts/footer/pos'

export default {
  name: 'POSLayout',
  middleware: ['auth'],
  components: {
    Header,
    Slider,
    Footer,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []

      let path = ''

      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        // console.log(param)
        if (match.name !== null) {
          crumbs.push({
            title: param,
            ...match,
          })
        }
      })

      return crumbs
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
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
