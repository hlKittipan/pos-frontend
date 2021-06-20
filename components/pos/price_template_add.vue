<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
    <h3 :style="{ marginBottom: '16px',textAlign: 'center' }">
      Name
    </h3>
      <a-form-item v-bind="formItemLayout" label="Name" has-feedback>
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: 'Please input your name!' }],
            },
          ]"
          placeholder="Please input your name"
          @change="handleChange"
        />
      </a-form-item>
      <a-form-item
        v-for="k in priceType"
        :key="k.id"
        v-bind="formItemLayout"
        :label="k.name"
        :required="false"
      >
        <a-input-number
          v-decorator="[`prices[${k.id}]`, { initialValue: 0 }]"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> Submit </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'PriceTemplateAdd',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      priceType: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      id: 0,
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        },
      },
      visible: false,
      loading: false,
      title: '',
      addType: '',
    }
  },
  async beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'price_template_add' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
    const PriceType = await this.$store.dispatch('pos/fetchPriceType')
    if (PriceType) {
      this.priceType = this.$store.getters['pos/getPriceTypeList']
    }
  },
  watch: {
    priceType: function () {
      this.priceType = this.$store.getters['pos/getPriceTypeList']
    },
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const response = await this.$store.dispatch(
            'pos/addPriceTemplate',
            values
          )
          this.loading = false
          this.form.resetFields()
          this.id = 0
          if (response.status == 200) {
            this.$notification.open({
              message: 'Insert ' + response.statusText,
              description: response.statusText,
              icon: <a-icon type="smile" style="color: #108ee9" />,
            })
          }
        }
      })
    },
    handleChange(e) {
      e.preventDefault()
    },
    remove(k) {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      // We need at least one passenger
      if (keys.length === 1) {
        return
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter((key) => key !== k),
      })
    },
  },
}
</script>

<style scoped>
.dynamic-delete-button {
  width: 10%;
  margin-top: 2%;
}
</style>
