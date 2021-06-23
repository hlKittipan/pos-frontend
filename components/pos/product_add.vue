<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <h3 :style="{ marginBottom: '16px'}" class="text-center">Name</h3>
      <a-form-item v-bind="formItemLayout" label="Name" has-feedback>
        <!-- <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: 'Please input your name!' }],
            },
          ]"
          placeholder="Please input your name"
          @change="handleChange"
        /> -->
        <a-input-group compact>
          <a-select
            disabled
            style="width: 40%"
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
          <a-input
            style="width: 50%"
            v-decorator="[
              `languages_main_value`,
              {
                validateTrigger: ['change', 'blur'],
                rules: [
                  {
                    whitespace: true,
                  },
                ],
              },
            ]"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item
        v-for="(k, index) in form.getFieldValue('keys')"
        :key="k"
        v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        :label="index === 0 ? 'Multi Language' : ''"
        :required="false"
      >
        <a-input-group compact>
          <a-select
            style="width: 40%"
            v-decorator="[
              `languages[${k}]`,
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
            <!-- <div slot="dropdownRender" slot-scope="product">
              <v-nodes :vnodes="product" />
              <a-divider style="margin: 4px 0" />
              <div
                style="padding: 4px 8px; cursor: pointer"
                @mousedown="(e) => e.preventDefault()"
                @click="addItem('addLanguage')"
              >
                <a-icon type="plus" /> Add item
              </div>
            </div> -->
            <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
            <a-select-option
              v-for="(value, lang) in LanguageCode"
              v-if="lang > 0"
              :key="lang"
              :value="value.code"
              >{{ value.name }}</a-select-option
            >
          </a-select>
          <a-input
            style="width: 50%"
            v-decorator="[
              `languages_value[${k}]`,
              {
                validateTrigger: ['change', 'blur'],
                rules: [
                  {
                    whitespace: true,
                  },
                ],
              },
            ]"
          />
          <a-icon
            style="width: 10%"
            class="dynamic-delete-button"
            type="minus-circle-o"
            :disabled="form.getFieldValue('keys').length === 1"
            @click="() => remove(k)"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayoutWithOutLabel"
        :style="{ borderBottom: '1px solid #E9E9E9', paddingBottom: '5px' }"
      >
        <a-button type="dashed" style="width: 60%" @click="add">
          <a-icon type="plus" /> Add Language
        </a-button>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Type" has-feedback>
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
          <div slot="dropdownRender" slot-scope="product">
            <v-nodes :vnodes="product" />
            <a-divider style="margin: 4px 0" />
            <div
              style="padding: 4px 8px; cursor: pointer"
              @mousedown="(e) => e.preventDefault()"
              @click="addItem('addProductType')"
            >
              <a-icon type="plus" /> Add item
            </div>
          </div>
          <a-select-option
            v-for="(value, productIndex) in productType"
            :key="productIndex"
            :value="value.id"
            >{{ value.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Price template" has-feedback>
        <a-select @change="handlePriceTemplateChange">
          <a-select-option
            v-for="(value, priceIndex) in priceTemplate"
            :key="priceIndex"
            :value="value.id"
            >{{ value.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-card size="small" title="Price zone" justify="center">
        <a-form-item
          v-for="k in priceType"
          :key="k.id"
          v-bind="formItemLayout"
          :label="k.name"
          :required="false"
        >
          <a-input-number
            v-decorator="[`prices[${k.id}]`,{initialValue:0}]"
          />
        </a-form-item>
      </a-card>



      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> Submit </a-button>
      </a-form-item>
    </a-form>
    <a-modal v-model="visible" title="Title" on-ok="handleOk">
      <a-input v-decorator="[`price_type`]" v-model="title" />
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
  name: 'AddProduct',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      LanguageCode: [],
      priceType: [],
      productType: [],
      priceTemplate: [],
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
      title: '',
      addType: '',
      defaultValue: '',
    }
  },
  async beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'product_add' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
    console.log(this.form)
    const LanguageCode = await this.$store.dispatch('pos/fetchLanguage')
    if (LanguageCode) {
      this.LanguageCode = this.$store.getters['pos/getLanguageCode']
      if (this.LanguageCode.length > 0) {
        this.form.setFieldsValue({
          languages_main: this.LanguageCode[0].code,
        })
      }
    }
    
    this.priceType = this.$store.getters['pos/getPriceTypeList']
    
    const priceTemplate = await this.$store.dispatch(
      'pos/fetchPriceTemplate'
    )
    if (priceTemplate) {
      this.priceTemplate = this.$store.getters['pos/getPriceTemplateList']
    }
    const productType = await this.$store.dispatch('pos/fetchProductType')
    if (productType) {
      this.productType = this.$store.getters['pos/getProductTypeList']
    }
  },
  watch: {
    LanguageCode: function () {
      this.LanguageCode = this.$store.getters['pos/getLanguageCode']
    },
    priceType: function () {
      this.priceType = this.$store.getters['pos/getPriceTypeList']
    },
    priceTemplate: function () {
      this.priceTemplate = this.$store.getters['pos/getPriceTemplateList']
    },
    productType: function () {
      this.productType = this.$store.getters['pos/getProductTypeList']
    },
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const response = await this.$store.dispatch(
            'pos/addProduct',
            values
          )
          this.loading = false
          this.form.setFieldsValue({
            languages_main_value: '',
          })
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
    handlePriceTemplateChange(e) {
      const { form } = this
      const priceTemplateIndex = this._.findIndex(this.priceTemplate, ['id', e]);

      this._.forEach(this.priceTemplate[priceTemplateIndex].price, function(value, key) {
        const fieldKey = `prices[${key}]`
        form.setFieldsValue({ [fieldKey] : value })

      })
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
      const lastArray = this._.last(nextKeys)
    },
    addItem(value) {
      this.visible = true
      this.addType = value
    },
    async handleOk(e) {
      this.loading = true
      const response = await this.$store.dispatch('pos/' + this.addType, {
        name: this.title,
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
