# \<svg-import>
Wanna style an SVG, but its an `<img>`? This component helps by imports and embeds SVG as HTML, so one can adjust and style it as if one hardcoded it in.

Common use case if when designers pass incomplete assets to developers.
E.g. an account icon, white stroke, But there design has a thicker red variation on hover, which is not provided. With CSS, devs can style by adjusting properties `stroke-width` and `stroke`.

The component will preview the svg using `img` first, then swapped to the SVG when SVG is loaded.

Made with [LitElment](https://lit.dev/).

## Usage
```html
<script type="module" src="/dist/browser/svg-import.iife.js"></script>

<!-- Aiya, image cannot style! -->
<img src="/path/to/svg-to-style.svg" alt="">

<!-- Yaasss, SVG and CSS! -->
<style>
  svg-import path {
    stroke-width: 3px;
    stroke: red;
  }
</style>
<svg-import src="/path/to/svg-to-style.svg"></svg-import>
```

## Attributes

`src`: string <br>
href to image source, similar to `HTMLImageElement.src`

## Events
`loading` <br>
Fires when the SVG is being fetched as a text.

`loaded` <br>
Fires when SVG is done loaded and embedded into the component.

