var _excluded = ["TextInputComponent", "onChange"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

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
  var onChangeText = useCallback(function (value) {
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
  return /*#__PURE__*/React.createElement(TextInputComponent, _extends({
    ref: ref,
    keyboardType: "phone-pad",
    onChangeText: onChangeText
  }, rest));
}
PhoneTextInput = /*#__PURE__*/React.forwardRef(PhoneTextInput);
PhoneTextInput.propTypes = {
  /**
   * The input field `value: string`.
   */
  value: PropTypes.string,
  /**
   * A function of `event: Event`.
   * Updates the `value: string` property.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The standard `autoCompleteType` property of a React Native `<TextInput/>`.
   */
  autoCompleteType: PropTypes.string,
  /**
   * The input field component.
   */
  TextInputComponent: PropTypes.elementType.isRequired
};
PhoneTextInput.defaultProps = {
  /**
   * Shows phone number suggestion(s) when the user focuses the input field.
   */
  autoCompleteType: 'tel',
  /**
   * By default, uses the default React Native `TextInput` component.
   */
  TextInputComponent: TextInput
};
export default PhoneTextInput;
//# sourceMappingURL=PhoneTextInput.js.map