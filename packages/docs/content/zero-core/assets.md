# Assets Directory

The Zero Core assets folder contains a number of `.scss` files used to globally reset css styles as well as provide Gridlex grid classes and utility Sass mixins. These resets and utilities apply to components both within the Zero Core folder and extend to components within any package in the repository that runs a Nuxt instance if the Zero-Core package is included as a Nuxt Layer in that instance. A breakdown of each item in the assets directory is given here under its respective heading.

## Grid

The `grid` subdirectory contains Gridlex `.scss` files used to generate all grid and columns classes used across projects. This folder never changes and is a copy of [the Gridlex project's](https://github.com/devlint/gridlex/tree/master) src folder. See the [Gridlex docs](https://gridlex.devlint.fr/) for more info. There is also a README file included in the subdirectory to help with usage.

## Layout Grid

The `layout-grid.scss` file behaves as a reset and an upgrade to some default Nuxt styles as well as to the grid. Updates to this file should be portable across projects. This file should never be necessary to change except in rare circumstances.

## Main

`main.scss` simply imports the styles cover thus far as well as reset and normalize files. It is included as the entry css asset in the `nuxt.config.js` file of the Zero Core module.

## Reset and Normalize

`reset.scss` and `normalize.scss` are files that do just that. They prepare for project's base and custom styles by initializing all elements stylings with expected or convential default values. These files should not be changed. Rather, style tweaks to elements on a global basis should be added in subsequent files and override these default values.

## Responsive

The `responsive.scss` file is where breakpoint values are declared for responsive screen sizing. Currently, we use seven distinct breakpoints which will apply inner styles passed as argument to each of seven mixins at and below their breakpoint screen-width values. Smaller breakpoint mixins override larger breakpoint mixins. The breakpoints are:

- `tiny` 430px
- `mini` 640px
- `small` 850px
- `medium` 1024px
- `large` 1200px
- `xlarge` 1440px
- `ultraLarge` 2250px

Breakpoint styles can be applied by wrapping them in a mixin with one of the above names, like so:

```scss
@include small {
  margin: 0 0.5rem;
  ...more styles
}
```

In addition to these fixed breakpoints, there are four other mixins in the `responsive.scss` file which allow for my dynamic breakpoint declarations:

- `gridMaxMQ`: This breakpoint is applied 2rem before (above) the screen width reaches the maximum grid width set in the [settings file](/zero-core/assets#settings).
- `gridMinMQ`: This breakpoint is applied 1px before (above) the screen width reaches the maximum grid width set in the [settings file](/zero-core/assets#settings).
- `customMaxMQ` Allows for breakpoint styles to be added at a custom screen max-width. The screen width must be passed to the mixin as an argument.
- `customMinMQ` Allows for breakpoint styles to be added at a custom screen min-width. The screen width must be passed to the mixin as an argument.

## Settings

`settings.scss` contains global Sass variables that are used throughout other the other style sheets and mixins documented here. Each variable is described below. These variables should never be removed, only updated project to project.

- `$gridWidth`: The maximum grid width that a site will expand to.
- `$standardGutter`: The grid's gutter sizes.
- `$baseFontSize`: Site base/default font size. 
- `$baseLeading`: Site base/default leading. 
- `$baseLetterSpacing`: Site base/default letter-sizing. 
- `$fontAssetPath`: The base path that font assets are stored at relative to the zero-core package.

## Utilities

`utilities.scss` contains mixins for polyfilling animations and transforms to be compatible across browsers. It also contains two import Sass functions used frequently in our projects:

- `toRem($pxValue)`: Converts pixel value to rems using the `$baseFontSize` set in the [settings file](/zero-core/assets#settings). Pixel values should be passed as an argument without units appended - just their number value. It is encouraged to use this function in place of pixel values across all components and global styles. The reason for this is that it allows all pixel values and dimensions to be scaled up or down by simply changing the base rem value of a project via the `$baseFontSize` variable. If at some point a site needs to be visually enlarged or shrunk on a global scale, this function facilitates a smoother resize.

- `leading($lineHeight, $fontSize)`: A convenience function that computes a `line-height` unitless value from an input value and the font size of the text to apply the line-height to. Pass in unitless pixel values for the line-height (first arg) and font-size (second arg). This function allows for quickly copying line-height values from programs such as Figma which tend to display line height values in pixels rather than the unitless value used by browsers.

## Cross Browser

The `x-browser.scss` file contain Sass mixins that are useful for targeting specific browsers. They can be applied by wrapping styles for a target element in the mixin.
