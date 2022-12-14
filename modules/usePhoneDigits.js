function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { useRef, useState, useCallback, useEffect } from 'react';
import { AsYouType, getCountryCallingCode, parseDigits } from 'libphonenumber-js/core';
import getInternationalPhoneNumberPrefix from './helpers/getInternationalPhoneNumberPrefix.js';

/**
 * Returns `[phoneDigits, setPhoneDigits]`.
 * "Phone digits" includes not only "digits" but also a `+` sign.
 */
export default function usePhoneDigits(_ref) {
  var _this = this;
  var value = _ref.value,
    onChange = _ref.onChange,
    country = _ref.country,
    defaultCountry = _ref.defaultCountry,
    international = _ref.international,
    withCountryCallingCode = _ref.withCountryCallingCode,
    useNationalFormatForDefaultCountryValue = _ref.useNationalFormatForDefaultCountryValue,
    metadata = _ref.metadata;
  var countryMismatchDetected = useRef();
  var onCountryMismatch = function onCountryMismatch(value, country, actualCountry) {
    console.error("[react-phone-number-input] Expected phone number ".concat(value, " to correspond to country ").concat(country, " but ").concat(actualCountry ? 'in reality it corresponds to country ' + actualCountry : 'it doesn\'t', "."));
    countryMismatchDetected.current = true;
  };
  var getInitialPhoneDigits = function getInitialPhoneDigits(options) {
    return getPhoneDigitsForValue(value, country, international, withCountryCallingCode, defaultCountry, useNationalFormatForDefaultCountryValue, metadata, function () {
      if (options && options.onCountryMismatch) {
        options.onCountryMismatch();
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      onCountryMismatch.apply(_this, args);
    });
  };

  // This is only used to detect `country` property change.
  var _useState = useState(country),
    _useState2 = _slicedToArray(_useState, 2),
    prevCountry = _useState2[0],
    setPrevCountry = _useState2[1];
  // This is only used to detect `defaultCountry` property change.
  var _useState3 = useState(defaultCountry),
    _useState4 = _slicedToArray(_useState3, 2),
    prevDefaultCountry = _useState4[0],
    setPrevDefaultCountry = _useState4[1];
  // `phoneDigits` is the `value` passed to the `<input/>`.
  var _useState5 = useState(getInitialPhoneDigits()),
    _useState6 = _slicedToArray(_useState5, 2),
    phoneDigits = _useState6[0],
    setPhoneDigits = _useState6[1];
  // This is only used to detect `value` property changes.
  var _useState7 = useState(value),
    _useState8 = _slicedToArray(_useState7, 2),
    valueForPhoneDigits = _useState8[0],
    setValueForPhoneDigits = _useState8[1];

  // Rerender hack.
  var _useState9 = useState(),
    _useState10 = _slicedToArray(_useState9, 2),
    rerenderTrigger = _useState10[0],
    setRerenderTrigger = _useState10[1];
  var rerender = useCallback(function () {
    return setRerenderTrigger({});
  }, [setRerenderTrigger]);
  function getValueForPhoneDigits(phoneDigits) {
    // If the user hasn't input any digits then `value` is `undefined`.
    if (!phoneDigits) {
      return;
    }
    if (country && international && !withCountryCallingCode) {
      phoneDigits = "+".concat(getCountryCallingCode(country, metadata)).concat(phoneDigits);
    }
    // Return the E.164 phone number value.
    //
    // Even if no "national (significant) number" digits have been input,
    // still return a non-`undefined` value.
    // https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/113
    //
    // For example, if the user has selected country `US` and entered `"1"`
    // then that `"1"` is just a "national prefix" and no "national (significant) number"
    // digits have been input yet. Still, return `"+1"` as `value` in such cases,
    // because otherwise the app would think that the input is empty and mark it as such
    // while in reality it isn't empty, which might be thought of as a "bug", or just
    // a "weird" behavior.
    //
    // The only case when there's any input and `getNumberValue()` still returns `undefined`
    // is when that input is `"+"`.
    //
    var asYouType = new AsYouType(country || defaultCountry, metadata);
    asYouType.input(phoneDigits);
    return asYouType.getNumberValue();
  }

  // If `value` property has been changed externally
  // then re-initialize the component.
  useEffect(function () {
    if (value !== valueForPhoneDigits) {
      setValueForPhoneDigits(value);
      setPhoneDigits(getInitialPhoneDigits());
    }
  }, [value]);

  // If the `country` has been changed then re-initialize the component.
  useEffect(function () {
    if (country !== prevCountry) {
      setPrevCountry(country);
      var _countryMismatchDetected;
      var _phoneDigits = getInitialPhoneDigits({
        onCountryMismatch: function onCountryMismatch() {
          _countryMismatchDetected = true;
        }
      });
      setPhoneDigits(_phoneDigits);
      if (_countryMismatchDetected) {
        setValueForPhoneDigits(getValueForPhoneDigits(_phoneDigits));
      }
    }
  }, [country]);

  // If the `defaultCountry` has been changed then re-initialize the component.
  useEffect(function () {
    if (defaultCountry !== prevDefaultCountry) {
      setPrevDefaultCountry(defaultCountry);
      setPhoneDigits(getInitialPhoneDigits());
    }
  }, [defaultCountry]);

  // Update the `value` after `valueForPhoneDigits` has been updated.
  useEffect(function () {
    if (valueForPhoneDigits !== value) {
      onChange(valueForPhoneDigits);
    }
  }, [valueForPhoneDigits]);
  var onSetPhoneDigits = useCallback(function (phoneDigits) {
    var value;
    if (country) {
      if (international && withCountryCallingCode) {
        // The `<input/>` value must start with the country calling code.
        var prefix = getInternationalPhoneNumberPrefix(country, metadata);
        if (phoneDigits.indexOf(prefix) !== 0) {
          // If a user tabs into a phone number input field
          // that is `international` and `withCountryCallingCode`,
          // and then starts inputting local phone number digits,
          // the first digit would get "swallowed" if the fix below wasn't implemented.
          // https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/43
          if (phoneDigits && phoneDigits[0] !== '+') {
            phoneDigits = prefix + phoneDigits;
          } else {
            // // Reset phone digits if they don't start with the correct prefix.
            // // Undo the `<input/>` value change if it doesn't.
            if (countryMismatchDetected.current) {
              // In case of a `country`/`value` mismatch,
              // if it performed an "undo" here, then
              // it wouldn't let a user edit their phone number at all,
              // so this special case at least allows phone number editing
              // when `value` already doesn't match the `country`.
            } else {
              // If it simply did `phoneDigits = prefix` here,
              // then it could have no effect when erasing phone number
              // via Backspace, because `phoneDigits` in `state` wouldn't change
              // as a result, because it was `prefix` and it became `prefix`,
              // so the component wouldn't rerender, and the user would be able
              // to erase the country calling code part, and that part is
              // assumed to be non-eraseable. That's why the component is
              // forcefully rerendered here.
              setPhoneDigits(prefix);
              setValueForPhoneDigits(undefined);
              // Force a re-render of the `<input/>` with previous `phoneDigits` value.
              return rerender();
            }
          }
        }
      } else {
        // Entering phone number either in "national" format
        // when `country` has been specified, or in "international" format
        // when `country` has been specified but `withCountryCallingCode` hasn't.
        // Therefore, `+` is not allowed.
        if (phoneDigits && phoneDigits[0] === '+') {
          // Remove the `+`.
          phoneDigits = phoneDigits.slice(1);
        }
      }
    } else if (!defaultCountry) {
      // Force a `+` in the beginning of a `value`
      // when no `country` and `defaultCountry` have been specified.
      if (phoneDigits && phoneDigits[0] !== '+') {
        // Prepend a `+`.
        phoneDigits = '+' + phoneDigits;
      }
    }
    // Convert `phoneDigits` to `value`.
    if (phoneDigits) {
      value = getValueForPhoneDigits(phoneDigits);
    }
    setPhoneDigits(phoneDigits);
    setValueForPhoneDigits(value);
  }, [country, international, withCountryCallingCode, defaultCountry, metadata, setPhoneDigits, setValueForPhoneDigits, rerender, countryMismatchDetected]);
  return [phoneDigits, onSetPhoneDigits];
}

/**
 * Returns phone number input field value for a E.164 phone number `value`.
 * @param  {string} [value]
 * @param  {string} [country]
 * @param  {boolean} [international]
 * @param  {boolean} [withCountryCallingCode]
 * @param  {string} [defaultCountry]
 * @param  {boolean} [useNationalFormatForDefaultCountryValue]
 * @param  {object} metadata
 * @return {string}
 */
function getPhoneDigitsForValue(value, country, international, withCountryCallingCode, defaultCountry, useNationalFormatForDefaultCountryValue, metadata, onCountryMismatch) {
  if (country && international && withCountryCallingCode) {
    var prefix = getInternationalPhoneNumberPrefix(country, metadata);
    if (value) {
      if (value.indexOf(prefix) !== 0) {
        onCountryMismatch(value, country);
      }
      return value;
    }
    return prefix;
  }
  if (!value) {
    return '';
  }
  if (!country && !defaultCountry) {
    return value;
  }
  var asYouType = new AsYouType(undefined, metadata);
  asYouType.input(value);
  var phoneNumber = asYouType.getNumber();
  if (phoneNumber) {
    if (country) {
      if (phoneNumber.country && phoneNumber.country !== country) {
        onCountryMismatch(value, country, phoneNumber.country);
      } else if (phoneNumber.countryCallingCode !== getCountryCallingCode(country, metadata)) {
        onCountryMismatch(value, country);
      }
      if (international) {
        return phoneNumber.nationalNumber;
      }
      return parseDigits(phoneNumber.formatNational());
    } else {
      // `phoneNumber.countryCallingCode` is compared here  instead of
      // `phoneNumber.country`, because, for example, a person could have
      // previously input a phone number (in "national" format) that isn't
      // 100% valid for the `defaultCountry`, and if `phoneNumber.country`
      // was compared, then it wouldn't match, and such phone number
      // wouldn't be formatted as a "national" one, and instead would be
      // formatted as an "international" one, confusing the user.
      // Comparing `phoneNumber.countryCallingCode` works around such issues.
      //
      // Example: `defaultCountry="US"` and the `<input/>` is empty.
      // The user inputs: "222 333 4444", which gets formatted to "(222) 333-4444".
      // The user then clicks "Save", the page is refreshed, and the user sees
      // that the `<input/>` value is now "+1 222 333 4444" which confuses the user:
      // the user expected the `<input/>` value to be "(222) 333-4444", same as it
      // was when they've just typed it in. The cause of the issue is that "222 333 4444"
      // is not a valid national number for US, and `phoneNumber.country` is compared
      // instead of `phoneNumber.countryCallingCode`. After the `phoneNumber.country`
      // comparison is replaced with `phoneNumber.countryCallingCode` one, the issue
      // is no longer the case.
      //
      if (phoneNumber.countryCallingCode && phoneNumber.countryCallingCode === getCountryCallingCode(defaultCountry, metadata) && useNationalFormatForDefaultCountryValue) {
        return parseDigits(phoneNumber.formatNational());
      }
      return value;
    }
  } else {
    return '';
  }
}
//# sourceMappingURL=usePhoneDigits.js.map