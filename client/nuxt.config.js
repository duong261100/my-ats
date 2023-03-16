export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    title: 'My ATS',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'google-signin-client_id',
        content:
          '724953140197-6nmrq14e01431303c29hh1j5re98jb0q.apps.googleusercontent.com',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' }],
    script: [
      {
        src: 'https://apis.google.com/js/platform.js',
        async: true,
        defer: true,
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.8.0/html2pdf.bundle.min.js',
      },
    ],
  },

  server: {
    port: process.env.PORT || 3000,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/scss/app.scss',
    '~/assets/scss/override.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/fontawesome.ts',
    '~/plugins/helpers.ts',
    '~/plugins/apexchart.js',
    // { src: '~/interceptors/axios.ts', ssr: true },
  ],

  render: { fallback: false },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    [
      'vue-toastification/nuxt',
      {
        timeout: 2000,
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:3001',
  },

  auth: {
    redirect: false,
    strategies: {
      local: {
        scheme: 'refresh',
        user: {
          property: 'user',
          autoFetch: false,
        },
        token: {
          property: 'access_token',
          global: true,
          maxAge: 60 * 60,
          // required: true,
          // type: 'Bearer',
        },
        refreshToken: {
          property: 'user.refresh_token',
          data: 'refresh_token',
          tokenRequired: true,
          maxAge: 60 * 60 * 24 * 30,
        },
        endpoints: {
          // các đường dẫn đến API
          // propertyName: kết quả từ API trả về, nhớ xem kết quả để đặt key cho đúng
          login: { url: '/session', method: 'post' },
          refresh: { url: '/session/refresh_token', method: 'post' },
          user: { url: '/users/me', method: 'get' },
          logout: { url: '/session/', method: 'delete' },
        },
        redirect: {
          login: '/login',
          logout: '/',
        },
      },
    },
    plugins: [{ src: '~/interceptors/axios.ts', ssr: true }],
  },
  //dùng cái này để sử dụng middleware xác thực người dùng cho mọi route, tương tự middleware trong Laravel
  router: {
    middleware: ['authCustom'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    extend(config, ctx) {
      // fix to work with swiperjs 8 add needed deps. you can get them from error when doing nuxt generate
      config.externals = [
        {
          encoding: 'encoding',
        },
      ]
    },
  },
}
