# Documentation

The `docs` package contains a Vitepress site which compiles documentation for the zero-core package upon running the `npm run docs:dev` command.
Before launching the server, the `docs/generate.cjs` script parses through all the files in the zero-core package and converts Jsdoc comments within them into `.md` files that populate the Vitepress content directory mirroring the folder structure of the zero-core directory. Comments from files in specific subdirectories are concatenated into a single markdown file while all others generate markdown files in a 1:1 manner. See `docs/generate.cjs` to edit which subdirectories should be concatenated.

Currently, there are only two types of files that are parsed for Jsdoc comments; `.js` and `.vue` files.
In order for comments to be parsed and used to generate documentation in the Vitepress site, they must use [official Jsdoc tags](https://jsdoc.app/).

## Js files

Javascript files accept all common Jsdoc comment conventions. See the Jsdoc site linked above for guides.
One small difference is that `@member` tags such as `@method`, etc. must explicitly declare which comment is a description using a `@description` or `@desc` tag. This doesn't apply to descriptions for subsequent tags like `@param` descriptions which, can simply follow from the tag display name.

## Vue files

Comments in `.vue` files must follow a slightly more rigid schema. To begin with, you may include a descriptive summary of a component by using a Jsdoc comment with a `@description` tag at the very top of the component files script tag as follows:

```html
<script setup>
/**
 * @description My component description
 */
...code
</script>
```

#### Props

The parser converts Vue prop comments into a table of props. Comments in props do not need to use any special tags to indicate the prop name, type and/or required status - these will be picked up by `vue-docgen-api` parser. You can simply include a description with or without a `@description` tag and it will be included in the table. You can also use the `@values` tag to enumerate possible values for a prop.

#### Slots

Component slots do not require any comments to be written. They will automatically be converted into a table of data containing the name of the slot and any bindings on it.

#### Emits

Component emitters will likewise be captured and displayed without any Jsdoc comments necessary. However, if you would like to write a description or include other tags in the documentation of an emitter you can include tags above the emitter in the `defineEmits` array like so:

```js
const emit = defineEmits([
  /**
   * Description for myEmitter1
   * @param {string} foo - bar 
   */
  'myEmitter1',
  /**
   * Description for myEmitter2
   */
  'myEmitter2'
  ...etc.
])
```

#### Methods

Methods are the only component members which must be declared explicitly using the `@method` tag followed by the method name. In Vue 3 components methods are implicitly defined as such, so, it is necessary to tag them for the docgen parser. You can follow the method tag/name comment with a description and any other tags you wish. `@param` tags will be compiled into a table with their name, type and description.

## Links

It's encouraged to use internal links in descriptions as much as possible to provide references to different parts of the documentation. For example, you can link to the store method that a component calls by following the pattern below:

Vue component script tag
```js
/**
 * @method clickHandler
 * @desc Set the loading state in the button store using [setButton](/zero-core/modules/button/store.html#setbutton)
 */
const clickHandler = async () => {
  await buttonStore.setButton({ id: props.id, loading: true })
}
```

In the example above, since the description will be dropped into a markdown file, the line;
```
[setButton](/zero-core/modules/button/store.html#setbutton)
```
will be converted into an internal link that navigates to the `setButton` method of the button-store markdown file at the specified route. This is contingent however on the
method itself being documented with a Jsdoc tag in the `/zero-core/modules/button/store.js` file. Otherwise, there won't be a heading generated on the `/zero-core/modules/button/store` route to link to. In the button store, a comment link the following should be present on the `setButton` method in order for linking to work:

Js button store file
```js
/**
 * @method setButton
 */
const setButton = (payload) => {
  buttons.value[payload.id] = payload
}
```
