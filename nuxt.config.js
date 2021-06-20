export default {
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-ant',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'ant-design-vue/dist/antd.css',
    '@/assets/css/index',
    // '~/assets/css/variables.less',
    {
      src: '~/assets/css/variables.less',
      lang: 'less'
    },
    { src: '@/assets/css/main.less', lang: 'less' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/antd-ui','@/plugins/lodash'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  /*
  ** importing a custom loader. this will overwrite the default loader
  */
  loading: '@/components/loading_page.vue',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-i18n',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_API_URL || 'http://localhost:4000',
    BASE_API_URL: process.env.BASE_API_URL || 'http://localhost:4000',
    retry: { retries: 3 },
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
      BASE_API_URL: process.env.BASE_API_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  env: {
    baseUrl: process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : 'https://my-domain.com',
  },

  auth: {
    localStorage: true,
    strategies: {
      local: {
        token: {
          property: 'token.accessToken',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: process.env.BASE_API_URL+'/auth/login',
            method: 'post',
          },
          logout: false,
          user: {
            url: process.env.BASE_API_URL+'/auth/user',
            method: 'get',
          },
        },
      },
      // custom: { scheme: '~/schemes/customStrategy', /* ... */ },
      localRefresh: {
        scheme: 'refresh',
        token: {
          property: 'token.accessToken',
          maxAge: 15
        },
        refreshToken: {
          property: 'token.refreshToken',
          data: 'refreshToken',
          maxAge: false
        }
      },
    },
    redirect: {
      logout: '/',
      callback: '/login',
      home: '/'
    },
  },
  // router: {
  //   middleware: ['auth']
  // },
  i18n: {
    locales: ['en', 'th', 'fr', 'es'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome'
        },
        fr: {
          welcome: 'ยินดีต้อนรับ'
        },
        fr: {
          welcome: 'Bienvenue'
        },
        es: {
          welcome: 'Bienvenido'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
}
