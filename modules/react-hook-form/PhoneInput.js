function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import ReactHookFormInput from './ReactHookFormInput.js';
import PhoneInput_ from '../PhoneInputBrowser.js';
import { metadata as metadataType } from '../PropTypes.js';
export function createPhoneInput(defaultMetadata) {
  var PhoneInput = function PhoneInput(props, ref) {
    return /*#__PURE__*/React.createElement(ReactHookFormInput, _extends({}, props, {
      ref: ref,
      Component: PhoneInput_
    }));
  };
  PhoneInput = /*#__PURE__*/React.forwardRef(PhoneInput);
  PhoneInput.propTypes = {
    metadata: metadataType.isRequired
  };
  PhoneInput.defaultProps = {
    metadata: defaultMetadata
  };
  return PhoneInput;
}
export default createPhoneInput();
//# sourceMappingURL=PhoneInput.js.map