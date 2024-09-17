import { setActivePinia, createPinia } from 'pinia'
import { describe, test, expect, beforeAll, beforeEach, afterEach } from 'vitest'
import { useZeroStore } from '@/stores/use-zero-store'

beforeAll(() => {
  setActivePinia(createPinia())
})

describe('useZeroStore', () => {
  let zeroStore

  beforeEach(() => {
    zeroStore = useZeroStore()
  })

  afterEach(() => {
    zeroStore.setSeo({})
  })

  test('creates a store', () => {
    expect(zeroStore).toBeDefined()
  })

  test('initializes with theme light', () => {
    expect(zeroStore.seo).toStrictEqual({})
  })
})
