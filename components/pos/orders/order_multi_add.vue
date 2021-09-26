<template>
  <div>
    <a-form :form="form">
      <a-form-item>
        <span class="ant-form-text" v-if="selectProduct">
          Product name : {{ selectProduct.language[this.$i18n.locale] }}
        </span>
      </a-form-item>
      <div>
        <a-row class="text-center">
          <a-col :span="6"></a-col>
          <a-col :span="2"></a-col>
          <a-col class="mr-2 ml-2" :span="4">Qty</a-col>
          <a-col class="mr-2 ml-2" :span="4">Dis.</a-col>
          <a-col class="mr-2 ml-2" :span="4"></a-col>
        </a-row>
        <div v-if="selectProduct">
          <a-row v-for="(item, index) in selectProduct.price" :key="index">
            <div v-if="item.price > 0">
              <a-col :span="6">
                <a-form-item>
                  <span class="ant-form-text">
                    {{ item.name }}
                  </span>
                </a-form-item>
              </a-col>
              <a-col :span="2">
                <a-form-item>
                  <span class="ant-form-text text-right">
                    {{ item.price }}
                  </span>
                </a-form-item>
              </a-col>
              <a-col :span="4" class="mr-2 ml-2 text-right">
                <a-form-item>
                  <a-input-number
                    @change="calculatorPrice($event, index, 'qty')"
                    v-decorator="[`qty[${index}]`, { initialValue: 0 }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="4" class="mr-2 ml-2 text-right">
                <a-form-item>
                  <a-input-number
                    @change="calculatorPrice($event, index, 'discount')"
                    v-decorator="[`discount[${index}]`, { initialValue: 0 }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="4" class="mr-2 ml-2 text-right">
                {{ item.total }}
              </a-col>
            </div>
          </a-row>
        </div>
      </div>
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
    this.form = this.$form.createForm(this, { name: 'order_add' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  mounted() {
    this.selectProduct = this.$store.getters['pos/getSelectProduct']
    console.log(this.selectProduct)
  },
  updated() {
    console.log('updated')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  data() {
    return {
      columns: null,
      formItemLayout,
      formTailLayout,
      selectProduct: undefined,
    }
  },
  methods: {
    calculatorPrice(...item) {
      this.$store.dispatch('pos/calculatePrice', item)
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  },
  watch: {
    getSelectProduct: function (value) {
      this.selectProduct = value
    },
  },
  computed: {
    getSelectProduct() {
      return this.$store.getters['pos/getSelectProduct']
    },
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroy() {
    console.log('destroy')
  },
}
</script>

<style>
.ant-form-item {
  margin-bottom: 0px;
}
.text-right input {
  text-align: right;
  padding-right: 25px;
}
</style>
