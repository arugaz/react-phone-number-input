function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import parsePhoneNumber from 'libphonenumber-js/core';

/**
 * Formats a phone number.
 * Is a proxy for `libphonenumber-js`'s `.format()` function of a parsed `PhoneNumber`.
 * @param  {string} value
 * @param  {string} [format]
 * @param  {object} metadata
 * @return {string}
 */
export default function formatPhoneNumber(value, format, metadata) {
  if (!metadata) {
    if (_typeof(format) === 'object') {
      metadata = format;
      format = 'NATIONAL';
    }
  }
  if (!value) {
    return '';
  }
  var phoneNumber = parsePhoneNumber(value, metadata);
  if (!phoneNumber) {
    return '';
  }
  // Deprecated.
  // Legacy `format`s.
  switch (format) {
    case 'National':
      format = 'NATIONAL';
      break;
    case 'International':
      format = 'INTERNATIONAL';
      break;
  }
  return phoneNumber.format(format);
}
export function formatPhoneNumberIntl(value, metadata) {
  return formatPhoneNumber(value, 'INTERNATIONAL', metadata);
}
//# sourceMappingURL=formatPhoneNumber.js.map