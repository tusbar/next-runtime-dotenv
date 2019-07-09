const dotenv = require('dotenv')
const {PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD} = require('next/constants')

function exposeKeys(keys) {
  if (!Array.isArray(keys)) {
    throw new TypeError('The `server` and `public` keys should be arrays of env variables to expose')
  }

  return keys.reduce((acc, key) => {
    acc[key] = process.env[key]

    return acc
  }, {})
}

module.exports = opts => {
  opts = {
    path: '.env',
    server: [],
    public: [],

    ...opts
  }

  return (config = {}) => (phase, args) => {
    if (typeof config === 'function') {
      config = config(phase, args)
    }

    if (config.target === 'serverless' && phase === PHASE_PRODUCTION_BUILD) {
      throw new Error(`next-runtime-dotenv is not compatible with serverless deployment.
       \`publicRuntimeConfig\` and \`serverRuntimeConfig\` will not be exposed, you should use the \`env\` key.
       See https://github.com/zeit/next.js#build-time-configuration.
      `)
    }

    if (phase === PHASE_PRODUCTION_SERVER || phase === PHASE_DEVELOPMENT_SERVER) {
      dotenv.config({
        path: opts.path
      })

      return {
        ...config,

        serverRuntimeConfig: {
          ...config.serverRuntimeConfig,
          ...exposeKeys(opts.server)
        },
        publicRuntimeConfig: {
          ...config.publicRuntimeConfig,
          ...exposeKeys(opts.public)
        }
      }
    }

    return {
      serverRuntimeConfig: {},
      publicRuntimeConfig: {},
      ...config
    }
  }
}
