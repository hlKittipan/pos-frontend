<template>
  <div v-if="loadingPage" class="loading-page">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px" spin />
    </a-spin>
    <!-- <a-progress :percent="percent" /> -->
  </div>
</template>
<script>
export default {
  data: () => ({
    percent: 0,
  }),
  computed: {
    loadingPage() {
      return this.$store.getters['pos/getLoadingPage']
    },
  },
  watch: {
    loadingPage() {
      return this.$store.getters['pos/getLoadingPage']
    },
  },
  methods: {
    increase() {
      let percent = this.percent + 10
      if (percent > 100) {
        percent = 100
      }
      this.percent = percent
    },
    start() {
      this.$store.dispatch('pos/setLoadingPage', true)
      console.log('start')
      window.setInterval(() => {
        if (this.percent === 100) {
          window.clearInterval()
        } else {
          this.increase()
        }
      }, 1000)
    },
    finish() {
      this.percent = 100
      setTimeout(
        () => this.$store.dispatch('pos/setLoadingPage', false),
        500
      )
    },
  },
}
</script>
<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Full height */
  height: 100%;
  width: 100%;
  background: rgba(213, 245, 227, 1);
}
.loading {
  display: inline-block;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
