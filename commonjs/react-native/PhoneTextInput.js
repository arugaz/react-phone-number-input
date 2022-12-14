"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactNative = require("react-native");
var _excluded = ["TextInputComponent", "onChange"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * This is an _experimental_ React Native component.
 * Feedback thread: https://github.com/catamphetamine/react-phone-number-input/issues/296
 */
function PhoneTextInput(_ref, ref) {
  var TextInputComponent = _ref.TextInputComponent,
    onChange = _ref.onChange,
    rest = _objectWithoutProperties(_ref, _excluded);
  // Instead of `onChangeText(value: string)` it could use
  // `onChange(nativeEvent: Event)` and get `value` from `nativeEvent.text`.
  var onChangeText = (0, _react.useCallback)(function (value) {
    onChange({
      preventDefault: function preventDefault() {
        this.defaultPrevented = true;
      },
      target: {
        value: value
      }
    });
  }, [onChange]);

  // React Native `<TextInput/>` supports properties:
  // * `placeholder: string?`
  // * `autoFocus: boolean?`
  // * `value: string?`
  // plus the ones mentioned below:
  return /*#__PURE__*/_react["default"].createElement(TextInputComponent, _extends({
    ref: ref,
    keyboardType: "phone-pad",
    onChangeText: onChangeText
  }, rest));
}
PhoneTextInput = /*#__PURE__*/_react["default"].forwardRef(PhoneTextInput);
PhoneTextInput.propTypes = {
  /**
   * The input field `value: string`.
   */
  value: _propTypes["default"].string,
  /**
   * A function of `event: Event`.
   * Updates the `value: string` property.
   */
  onChange: _propTypes["default"].func.isRequired,
  /**
   * The standard `autoCompleteType` property of a React Native `<TextInput/>`.
   */
  autoCompleteType: _propTypes["default"].string,
  /**
   * The input field component.
   */
  TextInputComponent: _propTypes["default"].elementType.isRequired
};
PhoneTextInput.defaultProps = {
  /**
   * Shows phone number suggestion(s) when the user focuses the input field.
   */
  autoCompleteType: 'tel',
  /**
   * By default, uses the default React Native `TextInput` component.
   */
  TextInputComponent: _reactNative.TextInput
};
var _default = PhoneTextInput;
exports["default"] = _default;
//# sourceMappingURL=PhoneTextInput.js.map