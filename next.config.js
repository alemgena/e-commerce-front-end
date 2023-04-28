// next.config.js

module.exports = {
  images: {
    domains: ['api.liyumarket.com', 'lh3.googleusercontent.com'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME,
    BACKEND_ENDPOINT: process.env.API_URL,
    CONSOLE_BACKEND_IMG_ENDPOIN: process.env.CONSOLE_BACKEND_IMG_ENDPOIN,
  },
  publicRuntimeConfig: {
    APP_ID: process.env.APP_ID,
    BACKEND_ENDPOINT: process.env.API_URL,
    CONSOLE_BACKEND_IMG_ENDPOIN: process.env.CONSOLE_BACKEND_IMG_ENDPOIN,
  },
};
