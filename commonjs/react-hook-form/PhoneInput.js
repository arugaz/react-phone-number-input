"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPhoneInput = createPhoneInput;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _ReactHookFormInput = _interopRequireDefault(require("./ReactHookFormInput.js"));
var _PhoneInputBrowser = _interopRequireDefault(require("../PhoneInputBrowser.js"));
var _PropTypes = require("../PropTypes.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function createPhoneInput(defaultMetadata) {
  var PhoneInput = function PhoneInput(props, ref) {
    return /*#__PURE__*/_react["default"].createElement(_ReactHookFormInput["default"], _extends({}, props, {
      ref: ref,
      Component: _PhoneInputBrowser["default"]
    }));
  };
  PhoneInput = /*#__PURE__*/_react["default"].forwardRef(PhoneInput);
  PhoneInput.propTypes = {
    metadata: _PropTypes.metadata.isRequired
  };
  PhoneInput.defaultProps = {
    metadata: defaultMetadata
  };
  return PhoneInput;
}
var _default = createPhoneInput();
exports["default"] = _default;
//# sourceMappingURL=PhoneInput.js.map