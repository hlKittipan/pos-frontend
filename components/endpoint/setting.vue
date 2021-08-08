<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
      ><a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-select
          v-decorator="[
            `languages_main`,
            {
              validateTrigger: ['change', 'blur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Please input !',
                },
              ],
            },
          ]"
        >
          <a-select-option
            v-for="(value, lang) in LanguageCode"
            :key="lang"
            :value="value.code"
            >{{ value.name }}</a-select-option
          >
        </a-select>

      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> Submit </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      LanguageCode: [],
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
      id: 1,
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        },
      },
      visible: false,
      loading: false,
      defaultValue: '',
    }
  },
  async beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form_setting' })
    const LanguageCode = await this.$store.dispatch('pos/fetchLanguage')
    if (LanguageCode) {
      this.LanguageCode = this.$store.getters['pos/getLanguageCode']
      if (this.LanguageCode.length > 0 && this.$auth.$state.user.settings.default_language) {
        this.form.setFieldsValue({
          languages_main: this.$auth.$state.user.settings.default_language
        })
      }
    }
  },
  watch: {
    LanguageCode: function () {
      this.LanguageCode = this.$store.getters['pos/getLanguageCode']
    },
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  },
}
</script>

