<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14 }">
      <PaymentTypeList />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10 }">
      <PaymentTypeAdd />
    </a-col>
  </a-row>
</template>

<script>
import PaymentTypeList from '@/components/pos/payments/payment_type_list'
import PaymentTypeAdd from '@/components/pos/payments/payment_type_add'

export default {
  layout: 'pos',
  name: 'PaymentType',
  components: {
    PaymentTypeList,
    PaymentTypeAdd,
  },
}
</script>

<style scoped></style>
