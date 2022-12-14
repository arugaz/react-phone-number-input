"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountrySelectWithIcon = CountrySelectWithIcon;
exports["default"] = CountrySelect;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _unicode = _interopRequireDefault(require("country-flag-icons/unicode"));
var _excluded = ["value", "onChange", "options"],
  _excluded2 = ["value", "options", "className", "iconComponent", "getIconAspectRatio", "arrowComponent", "unicodeFlags"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function CountrySelect(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    options = _ref.options,
    rest = _objectWithoutProperties(_ref, _excluded);
  var onChange_ = (0, _react.useCallback)(function (event) {
    var value = event.target.value;
    onChange(value === 'ZZ' ? undefined : value);
  }, [onChange]);
  var selectedOption = (0, _react.useMemo)(function () {
    return getSelectedOption(options, value);
  }, [options, value]);

  // "ZZ" means "International".
  // (HTML requires each `<option/>` have some string `value`).
  return /*#__PURE__*/_react["default"].createElement("select", _extends({}, rest, {
    value: value || 'ZZ',
    onChange: onChange_
  }), options.map(function (_ref2) {
    var value = _ref2.value,
      label = _ref2.label,
      divider = _ref2.divider;
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: divider ? '|' : value || 'ZZ',
      value: divider ? '|' : value || 'ZZ',
      disabled: divider ? true : false,
      style: divider ? DIVIDER_STYLE : undefined
    }, label);
  }));
}
CountrySelect.propTypes = {
  /**
   * A two-letter country code.
   * Example: "US", "RU", etc.
   */
  value: _propTypes["default"].string,
  /**
   * A function of `value: string`.
   * Updates the `value` property.
   */
  onChange: _propTypes["default"].func.isRequired,
  // `<select/>` options.
  options: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    value: _propTypes["default"].string,
    label: _propTypes["default"].string,
    divider: _propTypes["default"].bool
  })).isRequired
};
var DIVIDER_STYLE = {
  fontSize: '1px',
  backgroundColor: 'currentColor',
  color: 'inherit'
};
function CountrySelectWithIcon(_ref3) {
  var value = _ref3.value,
    options = _ref3.options,
    className = _ref3.className,
    Icon = _ref3.iconComponent,
    getIconAspectRatio = _ref3.getIconAspectRatio,
    Arrow = _ref3.arrowComponent,
    unicodeFlags = _ref3.unicodeFlags,
    rest = _objectWithoutProperties(_ref3, _excluded2);
  var selectedOption = (0, _react.useMemo)(function () {
    return getSelectedOption(options, value);
  }, [options, value]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "PhoneInputCountry"
  }, /*#__PURE__*/_react["default"].createElement(CountrySelect, _extends({}, rest, {
    value: value,
    options: options,
    className: (0, _classnames["default"])('PhoneInputCountrySelect', className)
  })), unicodeFlags && value && /*#__PURE__*/_react["default"].createElement("div", {
    className: "PhoneInputCountryIconUnicode"
  }, (0, _unicode["default"])(value)), !(unicodeFlags && value) && /*#__PURE__*/_react["default"].createElement(Icon, {
    "aria-hidden": true,
    country: value,
    label: selectedOption && selectedOption.label,
    aspectRatio: unicodeFlags ? 1 : undefined
  }), /*#__PURE__*/_react["default"].createElement(Arrow, null));
}
CountrySelectWithIcon.propTypes = {
  // Country flag component.
  iconComponent: _propTypes["default"].elementType,
  // Select arrow component.
  arrowComponent: _propTypes["default"].elementType.isRequired,
  // Set to `true` to render Unicode flag icons instead of SVG images.
  unicodeFlags: _propTypes["default"].bool
};
CountrySelectWithIcon.defaultProps = {
  arrowComponent: function arrowComponent() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "PhoneInputCountrySelectArrow"
    });
  }
};
function getSelectedOption(options, value) {
  for (var _iterator = _createForOfIteratorHelperLoose(options), _step; !(_step = _iterator()).done;) {
    var option = _step.value;
    if (!option.divider && option.value === value) {
      return option;
    }
  }
}
//# sourceMappingURL=CountrySelect.js.map