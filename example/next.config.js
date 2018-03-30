const nextRuntimeDotenv = require('next-runtime-dotenv')

const withConfig = nextRuntimeDotenv({
  public: [
    'PUBLIC_VALUE'
  ],

  server: [
    'SERVER_ONLY'
  ]
})

module.exports = withConfig()
