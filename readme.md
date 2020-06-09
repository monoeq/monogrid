<h1 align="center">monogrid</h1>

<div align="center">
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="Stability" />
  </a>
  <a href="https://www.npmjs.com/package/monogrid">
    <img src="https://img.shields.io/npm/v/monogrid.svg?style=flat-square" alt="NPM version" />
  </a>
</div>

<br />

*Experimental* auto-centering css grid helper → [**Demo**](https://jongacnik.github.io/monogrid)

## Usage

```js
import Monogrid from 'monogrid'

const grid = new Monogrid(document.querySelector('.monogrid'))

// center grid, re-center on resize
grid.observe()

// stop resize observer
grid.unobserve()
```

## Details

[css grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) is used for laying out elements on a true grid with coherent column and row gutters. These grids often expect explicit column start positions, and for that reason, do not handle auto centering (unlike flex’s `justify-content`). Certain layouts are not possible: try centering a 5-column block on a 12-column css grid. 

`monogrid` unlocks flex style auto centering for css grids. Each row width is measured, and if it does not match the parent grid width, the row will be nudged to the center.

<img src="https://services.folderstudio.com/monogrid/monogrid-a.jpg" width="100%" />

## API

### `instance = new Monogrid(element)`

Initialize a `monogrid` instance with a `display:grid` dom element.

### `instance.render()`

Measure each row and center those which do not fill the width of the grid.

### `instance.observe()`

Boot up a [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to re-center the grid on element resize.

### `instance.unobserve()`

Stop observing the element.

## Overrides

Override `monogrid` behavior on a per-element basis by explicitly setting `grid-column-start`. In the example below, the highlighted item has `grid-column-start: 1` defined, so the row will not be centered and remain locked to the left.

<img src="https://services.folderstudio.com/monogrid/monogrid-b.jpg" width="50%" />

## Todo

- [ ] `on('render')` event
- [ ] `once('render')` event