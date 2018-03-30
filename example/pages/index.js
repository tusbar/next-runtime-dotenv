import getConfig from 'next/config'

const {
  publicRuntimeConfig: {PUBLIC_VALUE},
  serverRuntimeConfig: {SERVER_ONLY}
} = getConfig()

export default () => {
  console.log('PUBLIC_VALUE', PUBLIC_VALUE)
  console.log('SERVER_ONLY', SERVER_ONLY)

  return (
    <div>
      Open your console!
    </div>
  )
}
