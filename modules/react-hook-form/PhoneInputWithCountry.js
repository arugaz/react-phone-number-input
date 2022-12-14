function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import PropTypes from 'prop-types';
import ReactHookFormInput from './ReactHookFormInput.js';
import PhoneInputWithCountry_ from '../PhoneInputWithCountryDefault.js';
import { metadata as metadataType } from '../PropTypes.js';
export function createPhoneInput(defaultMetadata) {
  var PhoneInputWithCountry = function PhoneInputWithCountry(props, ref) {
    return /*#__PURE__*/React.createElement(ReactHookFormInput, _extends({}, props, {
      ref: ref,
      Component: PhoneInputWithCountry_
    }));
  };
  PhoneInputWithCountry = /*#__PURE__*/React.forwardRef(PhoneInputWithCountry);
  PhoneInputWithCountry.propTypes = {
    metadata: metadataType.isRequired
  };
  PhoneInputWithCountry.defaultProps = {
    metadata: defaultMetadata
  };
  return PhoneInputWithCountry;
}
export default createPhoneInput();
//# sourceMappingURL=PhoneInputWithCountry.js.map