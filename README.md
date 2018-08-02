# next-runtime-dotenv [![CircleCI](https://circleci.com/gh/tusbar/next-runtime-dotenv.svg?style=svg)](https://circleci.com/gh/tusbar/next-runtime-dotenv)

> Expose environment variables to the runtime config of Next.js

[![npm version](https://badgen.net/npm/v/next-runtime-dotenv)](https://www.npmjs.com/package/next-runtime-dotenv)
[![dependencies Status](https://badgen.net/david/dep/tusbar/next-runtime-dotenv)](https://david-dm.org/tusbar/next-runtime-dotenv)
[![codecov](https://badgen.net/codecov/c/github/tusbar/next-runtime-dotenv)](https://codecov.io/gh/tusbar/next-runtime-dotenv)
[![XO code style](https://badgen.net/badge/code%20style/XO/cyan)](https://github.com/xojs/xo)

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
