<template>
  <a-form layout="inline" :form="form" @submit="handleSubmit">
    <a-form-item
      :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [{ required: true, message: 'Please input your username!' }],
          },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item
      :validate-status="passwordError() ? 'error' : ''"
      :help="passwordError() || ''"
    >
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please input your Password!' }],
          },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('userName') && getFieldError('userName')
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    async handleSubmit(e) {
      e.preventDefault()
      await this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
           try {
            const response = await this.$auth.loginWith('local', {
              data: {
                email: values.userName,
                password: values.password,
              },
            })
            // this.$auth.loginWith('localRefresh', {
            //       data: {
            //         username: this.username,
            //         password: this.password
            //       }
            //     })
            //     .catch((err) => {
            //       // eslint-disable-next-line no-console
            //       console.error(err)
            //       this.error = err.response?.data
            //     })
            if (response){
              await this.$router.push('/pos')
            }
            console.log(response)
          } catch (error) {
            console.log(error)
            this.$notification.open({
              message: 'Notification Title',
              description:error,
              onClick: () => {
                console.log('Notification Clicked!')
              },
            })
          }
        }
      })
    },
  },
}
</script>
