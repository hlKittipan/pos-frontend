<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col>
          <Dashboard />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Dashboard from '@/components/chachang/dashboard'

export default {
  name: 'Index',
  components: {
    Dashboard
  }
}
</script>

<style scoped>

</style>
