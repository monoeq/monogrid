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

<table style="display:table">
  <thead>
    <tr>
      <th style="width:50%;text-align:center;">without <code>monogrid</code></th>
      <th style="width:50%;text-align:center;">with <code>monogrid</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="width:50%;padding:20px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 110" style="width:100%" fill="rgba(27,31,35,0.3)"><rect width="76" height="14" rx="2"/><rect x="78" width="50" height="14" rx="2"/><rect y="16" width="24" height="14" rx="2"/><rect x="78" y="16" width="24" height="14" rx="2"/><rect x="26" y="16" width="50" height="14" rx="2"/><rect y="32" width="50" height="14" rx="2"/><rect y="96" width="50" height="14" rx="2"/><rect x="52" y="32" width="76" height="14" rx="2"/><rect y="48" width="24" height="14" rx="2"/><rect x="26" y="48" width="24" height="14" rx="2"/><rect x="52" y="48" width="24" height="14" rx="2"/><rect x="78" y="48" width="24" height="14" rx="2"/><rect x="104" y="48" width="24" height="14" rx="2"/><rect y="64" width="102" height="14" rx="2"/><rect x="104" y="64" width="24" height="14" rx="2"/><rect y="80" width="76" height="14" rx="2"/><rect x="78" y="80" width="24" height="14" rx="2"/></svg></td>
      <td style="width:50%;padding:20px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 110" style="width:100%" fill="rgba(27,31,35,0.3)"><rect x="13" y="16" width="24" height="14" rx="2"/><rect x="91" y="16" width="24" height="14" rx="2"/><rect x="39" y="16" width="50" height="14" rx="2"/><rect y="32" width="50" height="14" rx="2"/><rect x="39" y="96" width="50" height="14" rx="2"/><rect x="13" y="80" width="76" height="14" rx="2"/><rect x="91" y="80" width="24" height="14" rx="2"/><rect width="76" height="14" rx="2"/><rect x="78" width="50" height="14" rx="2"/><rect x="52" y="32" width="76" height="14" rx="2"/><rect y="48" width="24" height="14" rx="2"/><rect x="26" y="48" width="24" height="14" rx="2"/><rect x="52" y="48" width="24" height="14" rx="2"/><rect x="78" y="48" width="24" height="14" rx="2"/><rect x="104" y="48" width="24" height="14" rx="2"/><rect y="64" width="102" height="14" rx="2"/><rect x="104" y="64" width="24" height="14" rx="2"/></svg></td>
    </tr>
  </tbody>
</table>

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

<table style="display:table;width:50%">
  <thead>
    <tr>
      <th style="width:50%;text-align:center;">without <code>monogrid</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="width:50%;padding:20px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 110" style="width:100%" fill="rgba(27,31,35,0.3)"><rect x="13" y="16" width="24" height="14" rx="2"/><rect x="91" y="16" width="24" height="14" rx="2"/><rect x="39" y="16" width="50" height="14" rx="2"/><rect y="32" width="50" height="14" rx="2"/><rect x="39" y="96" width="50" height="14" rx="2"/><rect y="80" width="76" height="14" rx="2" style="fill:rgba(27,31,35,0.6)"/><rect x="78" y="80" width="24" height="14" rx="2"/><rect width="76" height="14" rx="2"/><rect x="78" width="50" height="14" rx="2"/><rect x="52" y="32" width="76" height="14" rx="2"/><rect y="48" width="24" height="14" rx="2"/><rect x="26" y="48" width="24" height="14" rx="2"/><rect x="52" y="48" width="24" height="14" rx="2"/><rect x="78" y="48" width="24" height="14" rx="2"/><rect x="104" y="48" width="24" height="14" rx="2"/><rect y="64" width="102" height="14" rx="2"/><rect x="104" y="64" width="24" height="14" rx="2"/></svg></td>
    </tr>
  </tbody>
</table>

<br/>

## `¯\_(ツ)_/¯`

Layouts unlocked by `monogrid` can definitely all be solved with flexbox or other methods.

## Todo

- [ ] `on('render')` event