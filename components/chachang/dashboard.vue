<template>
  <b-container>
    <b-card title="Main">
      <b-card-text>
        <b-row>
          <b-col lg="4" class="pb-2">
            <b-button href="/chachang/order" variant="success" size="lg">
              Add order
            </b-button>
          </b-col>
          <b-col lg="4" class="pb-2">
            <b-button href="/chachang/menu" variant="success" size="lg">
              Add Menu
            </b-button>
          </b-col>
        </b-row>
      </b-card-text>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped></style>
