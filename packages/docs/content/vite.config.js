import { defineConfig } from 'vite'
import Fs from 'fs'

// https://github.com/vuejs/vitepress/issues/1403#issuecomment-1273894961
export default defineConfig({

  ...(process.env.NODE_ENV === 'development' && {
    server: {
      https: {
        key: Fs.readFileSync('../../localhost_key.pem'),
        cert: Fs.readFileSync('../../localhost_cert.pem')
      },
      port: 10000
    }
  })

})
