"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _usePhoneDigits3 = _interopRequireDefault(require("./usePhoneDigits.js"));
var _excluded = ["Component", "country", "defaultCountry", "useNationalFormatForDefaultCountryValue", "value", "onChange", "metadata", "international", "withCountryCallingCode"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function PhoneInput(_ref, ref) {
  var Component = _ref.Component,
    country = _ref.country,
    defaultCountry = _ref.defaultCountry,
    useNationalFormatForDefaultCountryValue = _ref.useNationalFormatForDefaultCountryValue,
    value = _ref.value,
    onChange = _ref.onChange,
    metadata = _ref.metadata,
    international = _ref.international,
    withCountryCallingCode = _ref.withCountryCallingCode,
    rest = _objectWithoutProperties(_ref, _excluded);
  // "Phone digits" includes not only "digits" but also a `+` sign.
  var _usePhoneDigits = (0, _usePhoneDigits3["default"])({
      value: value,
      onChange: onChange,
      country: country,
      defaultCountry: defaultCountry,
      international: international,
      withCountryCallingCode: withCountryCallingCode,
      useNationalFormatForDefaultCountryValue: useNationalFormatForDefaultCountryValue,
      metadata: metadata
    }),
    _usePhoneDigits2 = _slicedToArray(_usePhoneDigits, 2),
    phoneDigits = _usePhoneDigits2[0],
    setPhoneDigits = _usePhoneDigits2[1];
  return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, rest, {
    ref: ref,
    metadata: metadata,
    international: international,
    withCountryCallingCode: withCountryCallingCode,
    country: country || defaultCountry,
    value: phoneDigits,
    onChange: setPhoneDigits
  }));
}
PhoneInput = /*#__PURE__*/_react["default"].forwardRef(PhoneInput);
PhoneInput.propTypes = {
  /**
   * The phone number (in E.164 format).
   * Examples: `"+12"`, `"+12133734253"`.
   * An "empty" `value` could be represented by any "falsy" value like `undefined`, `null` or an empty string `""`.
   */
  value: _propTypes["default"].string,
  /**
   * A function of `value: string?`.
   * Updates the `value` property (to `undefined` in case it's empty).
   */
  onChange: _propTypes["default"].func.isRequired,
  /**
   * A two-letter country code for formatting `value`
   * as a national phone number (example: `(213) 373-4253`),
   * or as an international phone number without "country calling code"
   * if `international` property is passed (example: `213 373 4253`).
   * Example: "US".
   * If no `country` is passed then `value`
   * is formatted as an international phone number.
   * (example: `+1 213 373 4253`)
   */
  country: _propTypes["default"].string,
  /**
   * A two-letter country code for formatting `value`
   * when a user inputs a national phone number (example: `(213) 373-4253`).
   * The user can still input a phone number in international format.
   * Example: "US".
   * `country` and `defaultCountry` properties are mutually exclusive.
   */
  defaultCountry: _propTypes["default"].string,
  /**
   * If `country` property is passed along with `international={true}` property
   * then the phone number will be input in "international" format for that `country`
   * (without "country calling code").
   * For example, if `country="US"` property is passed to "without country select" input
   * then the phone number will be input in the "national" format for `US` (`(213) 373-4253`).
   * But if both `country="US"` and `international={true}` properties are passed then
   * the phone number will be input in the "international" format for `US` (`213 373 4253`)
   * (without "country calling code" `+1`).
   */
  international: _propTypes["default"].bool,
  /**
   * If `country` and `international` properties are set,
   * then by default it won't include "country calling code" in the input field.
   * To change that, pass `withCountryCallingCode` property,
   * and it will include "country calling code" in the input field.
   */
  withCountryCallingCode: _propTypes["default"].bool,
  /**
   * A component that renders the `<input/>` itself and also
   * parses and formats its `value` as the user inputs it.
   */
  Component: _propTypes["default"].elementType.isRequired,
  /**
   * When `defaultCountry` is defined and the initial `value` corresponds to `defaultCountry`,
   * then the `value` will be formatted as a national phone number by default.
   * To format the initial `value` of `defaultCountry` as an international number instead
   * set `useNationalFormatForDefaultCountryValue` property to `true`.
   */
  useNationalFormatForDefaultCountryValue: _propTypes["default"].bool.isRequired,
  /**
   * `libphonenumber-js` metadata.
   */
  metadata: _propTypes["default"].object.isRequired
};
PhoneInput.defaultProps = {
  /**
   * Set to `true` to force international phone number format
   * (without "country calling code") when `country` is specified.
   */
  // international: false,

  /**
   * Prefer national format when formatting E.164 phone number `value`
   * corresponding to `defaultCountry`.
   */
  useNationalFormatForDefaultCountryValue: true
};
var _default = PhoneInput;
exports["default"] = _default;
//# sourceMappingURL=PhoneInput.js.map