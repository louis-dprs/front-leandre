// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Modules
  modules: [
    "nuxt-oidc-auth",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/eslint",
    "shadcn-nuxt",
  ],

  // Application settings
  app: {
    baseURL: "/dev/",
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=IM+Fell+DW+Pica&display=swap",
        },
      ],
    },
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:5253/api/",
    },
  },

  // OIDC Configuration
  oidc: {
    defaultProvider: "keycloak",
    middleware: {
      globalMiddlewareEnabled: false,
      customLoginPage: false,
    },
    providers: {
      keycloak: {
        clientId:
          process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_CLIENT_ID ||
          "dungeoncrawler-frontend-local",
        clientSecret:
          process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_CLIENT_SECRET || "",
        baseUrl:
          process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_BASE_URL ||
          "http://10.4.30.2:8040/keycloak/realms/dungeoncrawler",
        redirectUri:
          process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_REDIRECT_URI ||
          "http://localhost:3000/dev/auth/keycloak/callback",
        exposeAccessToken: true,
        validateAccessToken: false,
        scope: ["openid", "profile", "email"],
      },
    },
  },

  // Static generation rules for public pages
  /*routeRules: {
    "/dev/": { isr: 600 },
    "/dev/bestiary": { isr: 600 },
    "/dev/lore": { isr: 1800 },
  },*/

  // Internationalization
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "fr", name: "Français", file: "fr.json" },
    ],
    langDir: "./locales/",
  },

  // Shadcn UI config
  shadcn: {
    prefix: "cn",
    componentDir: "./app/components/ui",
  },

  // Compatibility
  compatibilityDate: "2025-07-15",

  // Devtools
  devtools: { enabled: true },
});
