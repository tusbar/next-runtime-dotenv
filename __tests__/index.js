const nextRuntimeDotenv = require('..')
const {PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD} = require('next/constants')

describe('tests', () => {
  it('should expose a plugin function', () => {
    const withConfig = nextRuntimeDotenv()

    expect(withConfig).toBeInstanceOf(Function)
  })

  it('should expose only in server mode', () => {
    process.env.FOO = 'bar'

    const withConfig = nextRuntimeDotenv({
      public: [
        'FOO'
      ]
    })

    for (const phase of [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER]) {
      const config = withConfig()(phase)

      expect(config.publicRuntimeConfig.FOO).toEqual('bar')
    }
  })

  it('should fail if public or server is not an array', () => {
    const withConfig = nextRuntimeDotenv({
      public: {
        an: 'object'
      }
    })

    const f = () => withConfig()(PHASE_DEVELOPMENT_SERVER)

    expect(f).toThrow('The `server` and `public` keys should be arrays of env variables to expose')
  })

  it('should not expose in other phases', () => {
    process.env.FOO = 'baz'

    const withConfig = nextRuntimeDotenv({
      public: [
        'FOO'
      ]
    })

    const config = withConfig()('unknown-phase')

    expect(config.publicRuntimeConfig).toEqual({})
  })

  it('should preserve existing runtime configuration', () => {
    process.env.FOO = 'hello'

    const withConfig = nextRuntimeDotenv({
      server: [
        'FOO'
      ]
    })

    const config = withConfig({
      serverRuntimeConfig: {
        test: 'keep me'
      }
    })(PHASE_DEVELOPMENT_SERVER)

    expect(config.serverRuntimeConfig).toEqual({
      test: 'keep me',
      FOO: 'hello'
    })
  })

  it('should allow chaining function plugins', () => {
    process.env.VAR1 = 'hello'
    process.env.VAR2 = 'hi'

    const withConfig1 = nextRuntimeDotenv({
      server: [
        'VAR1'
      ]
    })

    const withConfig2 = nextRuntimeDotenv({
      server: [
        'VAR2'
      ]
    })

    const config = withConfig2(withConfig1({
      serverRuntimeConfig: {
        VAR0: 'yo'
      }
    }))(PHASE_DEVELOPMENT_SERVER)

    expect(config.serverRuntimeConfig).toEqual({
      VAR0: 'yo',
      VAR1: 'hello',
      VAR2: 'hi'
    })
  })

  it('should throw for serverless deployments', () => {
    const withConfig = nextRuntimeDotenv({
      server: [
        'VAR1'
      ]
    })

    expect(() => {
      withConfig({
        target: 'serverless'
      })(PHASE_PRODUCTION_BUILD)
    }).toThrow('next-runtime-dotenv is not compatible with serverless deployment.')
  })

  it('should not throw for serverless deployments in dev server', () => {
    const withConfig = nextRuntimeDotenv({
      server: [
        'VAR1'
      ]
    })

    expect(() => {
      withConfig({
        target: 'serverless'
      })(PHASE_DEVELOPMENT_SERVER)
    }).not.toThrow()
  })
})
