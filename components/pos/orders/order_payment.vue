<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-row>
        <a-col :span="12" class="text-right p-1">Total :</a-col>
        <a-col :span="12" class="p-1">{{ summaryOrderList }}</a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="text-right p-1">Discount :</a-col>
        <a-col :span="12" class="p-1">
          <a-input-number
            @change="handleSetDiscount"
            v-decorator="['discount', { initialValue: 0 }]"
        /></a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="text-right p-1">Net total :</a-col>
        <a-col :span="12" class="p-1">{{ calculatorNetTotal }}</a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="text-right p-1">Payment type :</a-col>
        <a-col :span="12" class="p-1">
          <a-select
            v-decorator="[
              'payment_type',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select your payment type!',
                  },
                ],
              },
            ]"
            style="width: 120px"
          >
            <a-select-option
              v-for="(value, index) in paymentType"
              :key="index"
              :value="value.id"
              >{{ value.name }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="text-right p-1">Cash :</a-col>
        <a-col :span="12" class="p-1">
          <a-input-number
            @change="handleSetCash"
            v-decorator="['cash', { initialValue: 0 }]"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="text-right p-1">Change :</a-col>
        <a-col :span="12" class="p-1">
          {{ calculatorChange }}
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
}

export default {
  name: 'FormOrderAdd',
  async beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'order_payment' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  mounted() {
    this.paymentType = this.$store.getters['pos/getPaymentTypeList']
  },
  updated() {
    console.log('updated')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  data() {
    return {
      formItemLayout,
      formTailLayout,
      paymentType: undefined,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleSetCash(value) {
      this.$emit('newCash', value)
    },
    handleSetDiscount(value) {
      this.$emit('newDiscount', value)
    },
  },
  watch: {
    getSelectProduct: function (value) {
      this.selectProduct = value
    },
  },
  props: ['summaryOrderList', 'cash', 'discount'],
  computed: {
    getSelectProduct() {
      return this.$store.getters['pos/getSelectProduct']
    },
    calculatorNetTotal() {
      return this.summaryOrderList - this.discount
    },
    calculatorChange() {
      return this.cash - this.calculatorNetTotal
    },
    // inputCash: {
    //   set(val) {
    //     console.log(val)
    //     this.$emit('cash', val);
    //     return val
    //   }
    // },
    // inputDiscount: {
    //   set(val) {
    //     console.log(val)
    //     this.$emit('discount', val);
    //     return val
    //   }
    // },
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroy() {
    console.log('destroy')
  },
}
</script>