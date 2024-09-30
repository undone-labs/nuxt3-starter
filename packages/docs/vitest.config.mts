import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8'
    },
    include: ['tests/component/*.{test,spec}.?(c|m)[jt]s?(x)']
  }
})
