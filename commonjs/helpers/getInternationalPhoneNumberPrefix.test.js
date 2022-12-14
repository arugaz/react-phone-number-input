"use strict";

var _metadata = _interopRequireDefault(require("libphonenumber-js/min/metadata"));
var _getInternationalPhoneNumberPrefix = _interopRequireDefault(require("./getInternationalPhoneNumberPrefix.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe('getInternationalPhoneNumberPrefix', function () {
  it('should prepend leading digits when generating international phone number prefix', function () {
    // No leading digits.
    (0, _getInternationalPhoneNumberPrefix["default"])('RU', _metadata["default"]).should.equal('+7');
    // Has "fixed" leading digits.
    (0, _getInternationalPhoneNumberPrefix["default"])('AS', _metadata["default"]).should.equal('+1684');
  });
});
//# sourceMappingURL=getInternationalPhoneNumberPrefix.test.js.map