export default class Monogrid {
  constructor (element) {
    this.element = element
    this.items = [...this.element.children]
    this.render = this.render.bind(this)
    this.observer = new ResizeObserver(this.render)
  }

  observe () {
    this.render()
    this.observer.observe(this.element)
  }

  unobserve () {
    this.observer.disconnect()
  }

  clear () {
    this.items.forEach(item => item.style.transform = '')
  }

  getRows (items) {
    return items.reduce((obj, item) => {
      if (!!item.offsetWidth) { // skip 0-width elements
        if (!obj[item.offsetTop]) obj[item.offsetTop] = []
        obj[item.offsetTop].push(item)  
      }
      return obj
    }, {})
  }

  getElementRight (element, withPadding = true) {
    let paddingRight = 0
    if (!withPadding) {
      const computedStyles = window.getComputedStyle(element)
      paddingRight = parseInt(computedStyles.getPropertyValue('padding-right'), 10)  
    }
    
    const rect = element.getBoundingClientRect()
    return rect.left + rect.width - paddingRight
  }

  isAutoColumn (element) {
    const computedStyles = window.getComputedStyle(element)
    const columnStart = computedStyles.getPropertyValue('grid-column-start')
    return columnStart.indexOf('span') >= 0 || columnStart.indexOf('auto') >= 0
  }

  sort (elements) {
    return elements.slice().sort((a, b) => {
      return a.offsetLeft - b.offsetLeft
    })
  }

  render () {
    this.clear()

    const gridRight = this.getElementRight(this.element, false)
    const rows = this.getRows(this.items)

    Object.keys(rows).forEach(key => {
      const row = this.sort(rows[key])
      const [ lastItem ] = row.slice(-1)
      const [ firstItem ] = row.slice(0)
      const lastItemRight = this.getElementRight(lastItem)
      const isAutoColumn = this.isAutoColumn(firstItem)
      const shouldNudge = isAutoColumn && Math.abs(gridRight - lastItemRight) > 3

      if (shouldNudge) {
        const offset = (gridRight - lastItemRight) / 2
        row.forEach(item => item.style.transform = `translateX(${offset}px)`)
      }
    })
  }
}