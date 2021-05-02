<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item v-bind="formItemLayout" label="Name" has-feedback>
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: 'Please input your name!' }] },
          ]"
          placeholder="Please input your name"
          @change="handleChange"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Name thai" has-feedback>
        <a-input
          v-decorator="[
            'name_th',
            {
              rules: [
                { required: true, message: 'Please input your name thai!' },
              ],
            },
          ]"
          placeholder="Please input your name thai"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Category" has-feedback>        
        <a-select
            v-decorator="[
              `category`,
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
            <div slot="dropdownRender" slot-scope="menu">
              <v-nodes :vnodes="menu" />
              <a-divider style="margin: 4px 0" />
              <div
                style="padding: 4px 8px; cursor: pointer"
                @mousedown="(e) => e.preventDefault()"
                @click="addItem('addMenuType')"
              >
                <a-icon type="plus" /> Add item
              </div>
            </div>
            <a-select-option
              v-for="(value, menuIndex) in menuType"
              :key="menuIndex"
              :value="value.id"
              >{{ value.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
      <a-form-item
        v-for="(k, index) in form.getFieldValue('keys')"
        :key="k"
        v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        :label="index === 0 ? 'Price type' : ''"
        :required="false"
      >
        <a-input-group compact>
          <a-select
            style="width: 30%"
            v-decorator="[
              `priceType[${k}]`,
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
            <div slot="dropdownRender" slot-scope="menu">
              <v-nodes :vnodes="menu" />
              <a-divider style="margin: 4px 0" />
              <div
                style="padding: 4px 8px; cursor: pointer"
                @mousedown="(e) => e.preventDefault()"
                @click="addItem('addPriceType')"
              >
                <a-icon type="plus" /> Add item
              </div>
            </div>
            <a-select-option
              v-for="(value, priceIndex) in priceType"
              :key="priceIndex"
              :value="value.id"
              >{{ value.name }}</a-select-option
            >
          </a-select>
          <a-input-number
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
  name: 'AddMenu',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      priceType: [],
      menuType: [],
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
          sm: { span: 20, offset: 4 },
        },
      },
      visible: false,
      loading: false,
      title: '',
      addType: '',
    }
  },
  async beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'add_menu' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
    const priceTye = await this.$store.dispatch('chachang/fetchPriceType')
    if (priceTye) {
      this.priceType = this.$store.getters['chachang/getPriceTypeList']
    }
    const menuType = await this.$store.dispatch('chachang/fetchMenuType')
    if (menuType) {
      this.menuType = this.$store.getters['chachang/getMenuTypeList']
    }
  },
  watch: {
    priceType: function () {
      this.priceType = this.$store.getters['chachang/getPriceTypeList']
    },
    menuType: function () {
      this.menuType = this.$store.getters['chachang/getMenuTypeList']
    },
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields( async (err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          const response = await this.$store.dispatch('chachang/addMenu',values)
          this.loading = false
          this.form.resetFields();
          this.id = 0
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
      form.getFieldDecorator(`prices[${lastArray}]`,{initialValue:0})
    },
    addItem(value) {
      this.visible = true
      this.addType = value
    },
    async handleOk(e) {
      this.loading = true
      const response = await this.$store.dispatch('chachang/'+this.addType,{name : this.title})
      console.log(response)
      if (response) {
        if (this.addType == 'addPriceType'){
          this.$store.dispatch('chachang/addDefaultPriceNewAfterAddPriceType',response.data)
          this.priceType = this.$store.getters['chachang/getPriceTypeList']
        }else {
          this.menuType = this.$store.getters['chachang/getMenuTypeList']
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
