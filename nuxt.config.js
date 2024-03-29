const webpack = require("webpack");

export default {
  target: "server",
  ssr: true,
  telemetry: false,
  mode: "universal",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Vroom Back Office",
    htmlAttrs: {
      lang: "fr",
    },

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Vroom" },
      {
        name: "description",
        content:
          "Nous accompagnons vos enfants selon leur besoins quotidiens. Notre service vous assure pleine tranquillité et sérénité tout au long de la journée.",
      },
      {
        name: "og:title",
        content: "Vroom - Back Office",
      },
      {
        name: "og:desciption",
        content:
          "Nous accompagnons vos enfants selon leur besoins quotidiens. Notre service vous assure pleine tranquillité et sérénité tout au long de la journée.",
      },
      {
        name: "og:locale",
        content: "fr_FR",
      },
      {
        name: "og:image",
        content: "",
      },
      {
        property: "og:url",
        content: ``,
      },
      {
        // a modifier avec le bon url : https://search.google.com/search-console/welcome?hl=fr
        name: "google-site-verification",
        content: "",
      },
    ],

    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  manifest: {
    name: "Vroom Back Office",
    short_name: "VroomKids Nuxt",
    description: "VroomKids manifest description",
    theme_color: "#2C3E50",
    start_url: "/",
  },
  babel: {
    babelrc: true,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // "~bootstrap/scss/bootstrap",
    "~/assets/styles/theme.scss",
    "~/assets/css/fontawesome.css",
    "~/assets/css/icofont.css",
    "~/assets/css/themify.css",
    "~/assets/css/feather-icon.css",
    "~/assets/css/chartist.css",
    "~/assets/css/animate.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", mode: "client" },
    { src: "~/plugins/tailwind-components.js" },
    { src: "~/plugins/eventHub.js", mode: "client" },
    { src: "~/plugins/html/observer.js", mode: "client" },
    { src: "~/plugins/html/device.js", mode: "client" },
    { src: "~/plugins/html/fixScroll.js", mode: "client" },
    "~/plugins/components",
    "~/plugins/axios.js",
    "~/plugins/global.js",
    { src: "~/assets/js/config.js", mode: "client" },
    { src: "~/assets/js/sidebar-menu.js", mode: "client" },
    { src: "~/assets/js/script.js", mode: "client" },
    { src: "~/assets/js/theme-customizer/customizer.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    "~/components",
    { path: "~/components/Base/", prefix: "Base" },
    { path: "~/components/Common/", prefix: "Common" },
    { path: "~/components/Content/", prefix: "Content" },
    { path: "~/components/Strates/", prefix: "Strates" },
    { path: "~/components/Core/", prefix: "Core" },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "nuxt-purgecss",
    "@nuxtjs/style-resources",
    "nuxt-lazysizes",
  ],
  pageTransition: "fade",
  lazySizes: {
    plugins: {
      unveilhooks: true,
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    // "@nuxtjs/auth",
    "@nuxt/image",
    "nuxt-svg-loader",
    "@nuxtjs/moment",
  ],
  // Purge module configuration: https://purgecss.com/guides/nuxt.html
  purgeCSS: {
    enabled: false,
  },
  styleResources: {
    scss: ["./assets/styles/_all_settings.scss"],
  },

  moment: {
    defaultLocale: "fr",
    locales: ["fr"],
  },
  // Nuxt Axios
  axios: {
    baseURL: "http://localhost:3000/",
    proxyHeaders: false,
    credentials: false,
    proxy: true,
  },
  proxy: {
    "/api/": {
      target: "http://localhost:80/",
      pathRewrite: { "^/api/": "" },
    },
  },
  auth: {
    localStorage: false,
    cookie: {
      prefix: "auth.",
      options: {
        path: "/",
        maxAge: 10800,
      },
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: "login", method: "post", propertyName: "access_token" },
          user: {
            url: "/api/users/get",
            method: "get",
            propertyName: "content",
          },
          logout: false,
        },
      },
    },
  },
  router: {
    middleware: "log",
  },

  env: {
    baseURL: process.env.BASE_URL || "https://vroom-api-99af7.firebaseapp.com",
    fbAPIKey: "AIzaSyDRbzZQJKFU-ykEgxUoOM4grnSjbBqlVek",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["epic-spinners"],
    vendor: ["jquery", "bootstrap"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
      }),
    ],
  },
  loading: false,
  publicRuntimeConfig: {
    assetsPath: process.env.NODE_ASSETS_PATH,
    baseURL: process.env.BASE_URL || "http://localhost:80",
    nodeEnv: process.env.NODE_ENV || "development",
  },
};
