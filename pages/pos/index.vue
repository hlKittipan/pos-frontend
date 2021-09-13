<template>
  <div class="container">
    <a-row>
      <a-col :span="12">
        <a-space>
          <a-button type="primary">
            <nuxt-link to="/pos/product/product">Product</nuxt-link>
          </a-button>
          <a-button type="primary">
            <nuxt-link to="/pos/product/order">Order</nuxt-link>
          </a-button>
        </a-space>
      </a-col>
      <a-col :span="12">
        <a-space direction="vertical">
          <a-card title="Card" style="width: 300px">
            <div v-if="loggedIn">
              <h1>Hello, {{ user.email }}</h1>
              <button @click="logout" class="button--grey">Logout</button>
            </div>
            <div v-else>
              <nuxt-link to="/login" class="button--grey">Login</nuxt-link>
            </div>
          </a-card>
          <a-card title="Card" style="width: 300px">
            <p><pre>{{ state }}</pre></p>
            <p>
              User: <label>{{ $auth.hasScope('user') }}</label>
              Test: <label>{{ $auth.hasScope('test') }}</label>
              Admin: <label>{{ $auth.hasScope('admin') }}</label>
            </p>
            <p>
              Token
              <div style="white-space: nowrap; overflow: auto" v-if="$auth.strategy.token">
                {{ $auth.strategy.token.get() || '-' }}
              </div>
            </p>
            <p>
              refresh token
              <div style="white-space: nowrap; overflow: auto"  v-if="$auth.strategy.refreshToken">
                {{ $auth.strategy.refreshToken.get() || '-' }}
              </div>
            </p>
            <hr />
            <a-button type="primary" @click="$auth.fetchUser()">
              Fetch User
            </a-button>
            <a-button @click="refreshTokens" >Refresh Tokens</a-button>
            <a-button type="danger" @click="$auth.logout()" >Logout</a-button>

          </a-card>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Dashboard from '@/components/pos/dashboard'

export default {
  layout: 'pos',
  name: 'Index',
  components: {
    Dashboard,
  },
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
    refreshTokens() {
      this.$auth.refreshTokens().catch((e) => {
        this.error = e + ''
      })
    },
  },
  computed: {
    state() {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    },
  },
}
</script>

<style scoped>
</style>
