<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="Title" has-feedback>
        <a-input
          v-decorator="[
            'title',
            { rules: [{ required: true, message: 'Please input your title!' }] },
          ]"
          placeholder="Please input your title"
          @change="handleChange"
        />
      </a-form-item>
      <a-form-item label="Price" has-feedback>
         <a-input-number
            v-decorator="[`price`, { initialValue: 0 }]"
          />
      </a-form-item>
      <a-form-item label="Type" has-feedback>
        <a-select
          v-decorator="[
            `type`,
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
          <div slot="dropdownRender" slot-scope="addOn">
            <v-nodes :vnodes="addOn" />
            <a-divider style="margin: 4px 0" />
            <div
              style="padding: 4px 8px; cursor: pointer"
              @mousedown="(e) => e.preventDefault()"
              @click="addItem('addAddOnType')"
            >
              <a-icon type="plus" /> Add item
            </div>
          </div>
          <a-select-option
            v-for="(value, index) in addOnType"
            :key="index"
            :value="value.id"
            >{{ value.title }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" :loading="loading"> Submit </a-button>
      </a-form-item>
    </a-form>
    <a-modal v-model="visible" title="Title" on-ok="handleOk">
      <a-input v-decorator="[`add_on_type`]" v-model="title" />
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Return </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
        >
          Submit
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'AddOnAdd',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'add_on_add' })
        this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })

  },
  created() {
    this.addOnType = this.$store.getters['pos/getAddOnTypeList']
  },
  watch: {
    addOnType: function () {
      this.addOnType = this.$store.getters['pos/getAddOnTypeList']
    },
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
      addOnType: [],
      addType: '',
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.loading = true
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const response = await this.$store.dispatch('pos/addAddOn',values)
          console.log(response)
          this.loading = false
          this.form.resetFields();
          if( response.status == 200) {
            this.$notification.open({
              message: 'Insert '+response.statusText,
              description: response.statusText,
              icon: <a-icon type="smile" style="color: #108ee9" />,
            });
          }
        }
      })
    },
    handleChange(e) {
      e.preventDefault()
    },
    addItem(value) {
      this.visible = true
      this.addType = value
    },
    async handleOk(e) {
      this.loading = true
      const response = await this.$store.dispatch('pos/' + this.addType, {
        title: this.title,
      })
      console.log(response)
      if (response) {
        if (this.addType == 'addLanguage') {
          this.LanguageCode = this.$store.getters['pos/getLanguageCode']
        } else {
          this.productType = this.$store.getters['pos/getProductTypeList']
        }
        this.visible = false
        this.loading = false
        this.addType = ''
      }
    },
    handleCancel(e) {
      this.visible = false
      this.addType = ''
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
