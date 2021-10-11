<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-row>
        <a-col :span="12">
          <a-row>
            <a-col :span="12" class="text-right p-1">Total :</a-col>
            <a-col :span="12" class="p-1">{{ summaryOrderList }}</a-col>
            <a-col :span="12" class="text-right p-1">Discount :</a-col>
            <a-col :span="12" class="p-1">
              <a-input-number
                @change="handleSetDiscount"
                v-decorator="['discount', { initialValue: 0 }]"
            /></a-col>
            <a-col :span="12" class="text-right p-1">Net total :</a-col>
            <a-col :span="12" class="p-1">{{ calculatorNetTotal }}</a-col>
            <a-col :span="24" class="p-1">
              <a-form-item>
                <a-button type="dashed" style="width: 60%" @click="add">
                  <a-icon type="plus" /> Add payment
                </a-button>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-row
                v-for="(k, index) in form.getFieldValue('keys')"
                :key="k"
                :index="index"
                :required="false"
              >
                <a-col :span="12" class="text-right p-1">Payment type :</a-col>
                <a-col :span="12" class="p-1">
                  <a-select
                    v-decorator="[
                      `payment_type[${k}]`,
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
                <a-col :span="12" class="text-right p-1">Ref :</a-col>
                <a-col :span="12" class="p-1">
                  <a-input v-decorator="[`ref[${k}]`]" />
                </a-col>
                <a-col :span="12" class="text-right p-1">Cash :</a-col>
                <a-col :span="12" class="p-1">
                  <a-input
                    @change="handleSumCash($event, k)"
                    v-decorator="[`cash[${k}]`]"
                  />
                </a-col>
                <a-col :span="24" class="text-center">
                  <a-button type="danger" @click="() => remove(k)"
                    >Remove</a-button
                  >
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-row>
            <a-col :span="12" class="text-right p-1">Payment type :</a-col>
            <a-col :span="12" class="p-1">
              <a-select
                v-decorator="[
                  'payment_type[0]',
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
            <a-col :span="12" class="text-right p-1">Ref :</a-col>
            <a-col :span="12" class="p-1">
              <a-input v-decorator="['ref[0]']" />
            </a-col>
            <a-col :span="12" class="text-right p-1">Cash :</a-col>
            <a-col :span="12" class="p-1">
              <a-input
                @change="handleSumCash($event, 0)"
                v-decorator="['cash[0]']"
              />
            </a-col>
            <a-col :span="12" class="text-right p-1"><b>Change :</b></a-col>
            <a-col :span="12" class="p-1">
              {{ calculatorChange }}
            </a-col>
          </a-row>
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
let id = 1

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
      tempCash: [],
      tempDiscounst: [],
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
    remove(k) {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter((key) => key !== k),
      })

      //When the payout is deleted, the cash must be recalculated.
      _.remove(this.tempCash, {
        key: k,
      })
      this.sumCash()
    },
    add() {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      const nextKeys = keys.concat(id++)
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      })
    },
    handleSumCash(e, key) {
      const cash = this.tempCash
      const value = parseFloat(e.target.value)
      // if cash empty set cash = 0
      if (value == '' || Number.isNaN(value)) {
        const arrayCash = this._.findIndex(cash, { key: key })
        if (arrayCash >= 0) {
          cash[arrayCash].value = 0
          this.tempCash = cash
          this.sumCash()
        }
      } else {
        // first cash
        if (cash.length == 0) {
          this.tempCash.push({ key: key, value: value })
          this.handleSetCash(value)
        } else {
          const arrayCash = this._.findIndex(cash, { key: key })
          if (arrayCash >= 0) {
            cash[arrayCash].value = value
            this.tempCash = cash
          } else {
            this.tempCash.push({ key: key, value: value })
          }
          // Call Cash result calculation function
          this.sumCash()
        }
      }
    },
    //Cash result calculation function
    sumCash() {
      let sum = 0
      this._.forEach(this.tempCash, (item) => {
        sum += item.value
      })
      this.handleSetCash(sum)
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