const process = require('process')

const dotenv = require('dotenv')
const {PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD} = require('next/constants')

function exposeKeys(keys) {
  if (!Array.isArray(keys)) {
    throw new TypeError('The `server` and `public` keys should be arrays of env variables to expose')
  }

  return Object.fromEntries(keys.map(key => [key, process.env[key]]))
}

module.exports = options => {
  options = {
    path: '.env',
    server: [],
    public: [],

    ...options,
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
        path: options.path,
      })

      return {
        ...config,

        serverRuntimeConfig: {
          ...config.serverRuntimeConfig,
          ...exposeKeys(options.server),
        },
        publicRuntimeConfig: {
          ...config.publicRuntimeConfig,
          ...exposeKeys(options.public),
        },
      }
    }

    return {
      serverRuntimeConfig: {},
      publicRuntimeConfig: {},
      ...config,
    }
  }
}
