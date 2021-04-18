<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
  >
    <a-form-item label="Name" has-feedback>
      <a-input
        v-decorator="[
          'name',
          { rules: [{ required: true, message: 'Please input your name!' }] },
        ]"
        placeholder="Please input your name"
        @change="handleChange"
      />
    </a-form-item>
    <a-form-item label="Name thai" has-feedback>
      <a-input
        v-decorator="[
          'nameTh',
          {
            rules: [
              { required: true, message: 'Please input your name thai!' },
            ],
          },
        ]"
        placeholder="Please input your name thai"
      />
    </a-form-item>
    <a-form-item
      v-for="(k, index) in form.getFieldValue('keys')"
      :key="k"
      v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
      :label="index === 0 ? 'Passengers' : ''"
      :required="false"
    >
      <a-input-group compact>
        <a-select style="width: 30%" v-decorator="[`paymentType[${k}]`]">
          <a-select-option
            v-for="(value, paymentIndex) in paymentType"
            :key="paymentIndex"
            :value="value.id"
            >{{ value.name }}</a-select-option
          >
        </a-select>
        <a-input
          style="width: 30%"
          v-decorator="[
            `prices[${k}]`,
            {
              validateTrigger: ['change', 'blur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                },
              ],
            },
          ]"
        />
        <a-icon
          style="width: 10%"
          v-if="form.getFieldValue('keys').length > 1"
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="form.getFieldValue('keys').length === 1"
          @click="() => remove(k)"
        />
      </a-input-group>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="add">
        <a-icon type="plus" /> Add field
      </a-button>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'AddMenu',
  data() {
    return {
      paymentType: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      id: 0,
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
    }
  },
  async beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'add_menu' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
    await this.$store.dispatch('chachang/fetchPaymentType')
    this.paymentType = this.$store.getters['chachang/getPaymentTypeList']
  },
  watch: {
    paymentTypeList: function () {
      this.paymentType = this.$store.getters['chachang/getPaymentTypeList']
      console.log(this.$store.getters['chachang/getPaymentTypeList'])
    },
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

    add() {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      const nextKeys = keys.concat(this.id++)
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
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
