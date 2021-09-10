<template>
  <div>
    <a-form :form="form">
      <a-form-item>
        <span class="ant-form-text">
          Product name : {{ selectProduct.language[this.$i18n.locale] }}
        </span>
      </a-form-item>
      <div>
        <a-row v-for="(item, index) in productsOnSale" :key="index">
          <a-col :span="4">
            <a-form-item>
              <span class="ant-form-text">
                {{ item.name }}
              </span>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item>
              <span class="ant-form-text">
                {{ item.price }}
              </span>
            </a-form-item>
          </a-col>
          <a-col :span="4" class="mr-2 ml-2">
            <a-form-item>
              <a-input
                @change="calculatorPrice(index)"
                v-decorator="[`qty[${index}]`, { initialValue: 0 }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4" class="mr-2 ml-2">
            <a-form-item>
              <a-input
                @change="calculatorPrice(index)"
                v-decorator="[`discount[${index}]`, { initialValue: 0 }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <a-form-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary"> Check </a-button>
      </a-form-item>
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
  data() {
    return {
      columns: null,
      formItemLayout,
      formTailLayout,
    }
  },
  props: ['selectProduct'],
  methods: {
    calculatorPrice(index) {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  },
  computed: {
    productsOnSale: function () {
      return this.selectProduct.price.filter(
        (selectProduct) => selectProduct.price != 0
      )
    },
  },
}
</script>

<style>
.ant-form-item {
  margin-bottom: 0px;
}
</style>
