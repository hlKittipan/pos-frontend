<template>
  <div>
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
      <a-form-item label="Code" has-feedback>
        <a-input
          v-decorator="[
            'code',
            { rules: [{ required: true, message: 'Please input your code!' }] },
          ]"
          placeholder="Please input your code"
          @change="handleChange"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" :loading="loading"> Submit </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'LanguageAdd',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'language_add' })
  },
  data() {
    return {
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
      visible: false,
      loading: false,
      title: '',
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.loading = true
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const response = await this.$store.dispatch('chachang/addLanguage',values)
          console.log(response)
          this.loading = false
          this.form.resetFields();
          if( response.status == 200) {
            this.$notification.open({
              message: 'Insert '+response.statusText,
              description: response.statusText,
              icon: <a-icon type="smile" style="color: #108ee9" />,
            });
          }else{
            this.loading = false
            let statusText = null
            if(Array.isArray(response.data.errors.errors)){
              statusText = response.data.errors.errors[0].param + ' ' + response.data.errors.errors[0].msg
            }else{
              statusText = response.data.errors.errors
            }
            this.$notification.open({
              message: 'Something wrong !!! ',
              description: statusText,
              icon: <a-icon type="frown" style="color: #e94d10" />,
            });
          }
        }
      })
    },
    handleChange(e) {
      e.preventDefault()
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
