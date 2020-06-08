var Monogrid = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var Monogrid = /*#__PURE__*/function () {
    function Monogrid(element) {
      _classCallCheck(this, Monogrid);

      this.element = element;
      this.items = _toConsumableArray(this.element.children);
      this.render = this.render.bind(this);
      this.observer = new ResizeObserver(this.render);
    }

    _createClass(Monogrid, [{
      key: "observe",
      value: function observe() {
        this.render();
        this.observer.observe(this.element);
      }
    }, {
      key: "unobserve",
      value: function unobserve() {
        this.observer.disconnect();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items.forEach(function (item) {
          return item.style.transform = '';
        });
      }
    }, {
      key: "getRows",
      value: function getRows(items) {
        return items.reduce(function (obj, item) {
          if (!!item.offsetWidth) {
            // skip 0-width elements
            if (!obj[item.offsetTop]) obj[item.offsetTop] = [];
            obj[item.offsetTop].push(item);
          }

          return obj;
        }, {});
      }
    }, {
      key: "getElementRight",
      value: function getElementRight(element) {
        var withPadding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var paddingRight = 0;

        if (!withPadding) {
          var computedStyles = window.getComputedStyle(element);
          paddingRight = parseInt(computedStyles.getPropertyValue('padding-right'), 10);
        }

        var rect = element.getBoundingClientRect();
        return rect.left + rect.width - paddingRight;
      }
    }, {
      key: "isAutoColumn",
      value: function isAutoColumn(element) {
        var computedStyles = window.getComputedStyle(element);
        var columnStart = computedStyles.getPropertyValue('grid-column-start');
        return columnStart.indexOf('span') >= 0 || columnStart.indexOf('auto') >= 0;
      }
    }, {
      key: "sort",
      value: function sort(elements) {
        return elements.slice().sort(function (a, b) {
          return a.offsetLeft - b.offsetLeft;
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        this.clear();
        var gridRight = this.getElementRight(this.element, false);
        var rows = this.getRows(this.items);
        Object.keys(rows).forEach(function (key) {
          var row = _this.sort(rows[key]);

          var _row$slice = row.slice(-1),
              _row$slice2 = _slicedToArray(_row$slice, 1),
              lastItem = _row$slice2[0];

          var _row$slice3 = row.slice(0),
              _row$slice4 = _slicedToArray(_row$slice3, 1),
              firstItem = _row$slice4[0];

          var lastItemRight = _this.getElementRight(lastItem);

          var isAutoColumn = _this.isAutoColumn(firstItem);

          var shouldNudge = isAutoColumn && Math.abs(gridRight - lastItemRight) > 3;

          if (shouldNudge) {
            var offset = (gridRight - lastItemRight) / 2;
            row.forEach(function (item) {
              return item.style.transform = "translateX(".concat(offset, "px)");
            });
          }
        });
      }
    }]);

    return Monogrid;
  }();

  return Monogrid;

}());
