# next-runtime-dotenv [![CircleCI](https://circleci.com/gh/tusbar/next-runtime-dotenv.svg?style=svg)](https://circleci.com/gh/tusbar/next-runtime-dotenv)

[![npm version](https://img.shields.io/npm/v/next-runtime-dotenv.svg)](https://www.npmjs.com/package/next-runtime-dotenv)
[![dependencies Status](https://david-dm.org/tusbar/next-runtime-dotenv/status.svg)](https://david-dm.org/tusbar/next-runtime-dotenv)
[![codecov](https://codecov.io/gh/tusbar/next-runtime-dotenv/branch/master/graph/badge.svg)](https://codecov.io/gh/tusbar/next-runtime-dotenv)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Expose environment variables to the runtime config of Next.js

## Getting started

```bash
$ yarn add next-runtime-dotenv
```

This [Next.js](https://github.com/zeit/next.js) plugin uses [dotenv](https://github.com/motdotla/dotenv) to expose environment variables to the Next.js runtime configuration.
It requires `next@5.1.0`.

## Usage

This module exposes a function that allows to configure a Next.js plugin.

In your `next.config.js`:

```js
const nextRuntimeDotenv = require('next-runtime-dotenv')

const withConfig = nextRuntimeDotenv({
  // path: '.env',
  public: [
    'MY_API_URL'
  ],
  server: [
    'GITHUB_TOKEN'
  ]
})

module.exports = withConfig({
  // Your Next.js config.
})
```

## Phases

This plugin leverages `next@5.1.0` and build phases. It exposes a plugin function in order to run the plugin only when running the server (`PHASE_DEVELOPMENT_SERVER` and `PHASE_PRODUCTION_SERVER`).

## License

MIT


## Miscellaneous

```
    ╚⊙ ⊙╝
  ╚═(███)═╝
 ╚═(███)═╝
╚═(███)═╝
 ╚═(███)═╝
  ╚═(███)═╝
   ╚═(███)═╝
```
