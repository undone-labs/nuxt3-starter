# Zero Modules Introduction

Test for code highlighting

```js
const writeMdFile = async (path, data) => {
  return new Promise((resolve, reject) => {
    const split = path.split('/')
    const dir = split.slice(0, split.length - 1).join('/')
    if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }) }
    fs.writeFile(path, data, (err) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(`Markdown file generated at ${path}`)
        resolve()
      }
    })
  })
}
```
