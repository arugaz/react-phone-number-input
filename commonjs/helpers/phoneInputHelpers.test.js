"use strict";

var _phoneInputHelpers = require("./phoneInputHelpers.js");
var _metadata = _interopRequireDefault(require("libphonenumber-js/min/metadata"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
describe('phoneInputHelpers', function () {
  it('should get pre-selected country', function () {
    // Can't return "International". Return the first country available.
    (0, _phoneInputHelpers.getPreSelectedCountry)({
      value: '+11111111111',
      phoneNumber: {},
      countries: ['US', 'RU'],
      getAnyCountry: function getAnyCountry() {
        return 'US';
      },
      required: true,
      metadata: _metadata["default"]
    }).should.equal('US');

    // Can return "International".
    // Country can't be derived from the phone number.
    // https://github.com/catamphetamine/react-phone-number-input/issues/378
    expect((0, _phoneInputHelpers.getPreSelectedCountry)({
      value: '+11111111111',
      phoneNumber: {},
      countries: ['US', 'RU'],
      getAnyCountry: function getAnyCountry() {
        return 'US';
      },
      required: false,
      metadata: _metadata["default"]
    })).to.be.undefined;

    // Can return "International".
    // Country can't be derived from the phone number.
    // Has `defaultCountry`.
    // Has `value`.
    // https://github.com/catamphetamine/react-phone-number-input/issues/378
    expect((0, _phoneInputHelpers.getPreSelectedCountry)({
      value: '+11111111111',
      phoneNumber: {},
      defaultCountry: 'RU',
      countries: ['RU', 'FR'],
      required: false,
      metadata: _metadata["default"]
    })).to.be.undefined;

    // Can return "International".
    // Country can be derived from the phone number.
    // Has `defaultCountry`.
    // Has a valid partial `value`.
    // https://github.com/catamphetamine/react-phone-number-input/issues/378
    expect((0, _phoneInputHelpers.getPreSelectedCountry)({
      value: '+7800',
      defaultCountry: 'RU',
      countries: ['RU', 'FR'],
      required: false,
      metadata: _metadata["default"]
    })).to.equal('RU');

    // Derive country from the phone number.
    (0, _phoneInputHelpers.getPreSelectedCountry)({
      value: '+78005553535',
      phoneNumber: {
        country: 'RU',
        phone: '8005553535'
      },
      countries: ['US', 'RU'],
      getAnyCountry: function getAnyCountry() {
        return 'US';
      },
      required: true,
      metadata: _metadata["default"]
    }).should.equal('RU');

    // Country derived from the phone number overrides the supplied one.
    (0, _phoneInputHelpers.getPreSelectedCountry)({
      value: '+78005553535',
      phoneNumber: {
        country: 'RU',
        phone: '8005553535'
      },
      defaultCountry: 'US',
      countries: ['US', 'RU'],
      required: true,
      metadata: _metadata["default"]
    }).should.equal('RU');

    // Only pre-select a country if it's in the available `countries` list.
    (0, _phoneInputHelpers.getPreSelectedCountry)({
      value: '+78005553535',
      phoneNumber: {
        country: 'RU',
        phone: '8005553535'
      },
      countries: ['US', 'DE'],
      getAnyCountry: function getAnyCountry() {
        return 'US';
      },
      required: true,
      metadata: _metadata["default"]
    }).should.equal('US');
    expect((0, _phoneInputHelpers.getPreSelectedCountry)({
      value: '+78005553535',
      phoneNumber: {
        country: 'RU',
        phone: '8005553535'
      },
      defaultCountry: 'US',
      countries: ['US', 'DE'],
      required: false,
      metadata: _metadata["default"]
    })).to.be.undefined;
  });
  it('should generate country select options', function () {
    var defaultLabels = {
      'RU': 'Russia (????????????)',
      'US': 'United States',
      'ZZ': 'International'
    };

    // Without custom country names.
    (0, _phoneInputHelpers.getCountrySelectOptions)({
      countries: ['US', 'RU'],
      countryNames: defaultLabels
    }).should.deep.equal([{
      value: 'RU',
      label: 'Russia (????????????)'
    }, {
      value: 'US',
      label: 'United States'
    }]);

    // With custom country names.
    (0, _phoneInputHelpers.getCountrySelectOptions)({
      countries: ['US', 'RU'],
      countryNames: _objectSpread(_objectSpread({}, defaultLabels), {}, {
        'RU': 'Russia'
      })
    }).should.deep.equal([{
      value: 'RU',
      label: 'Russia'
    }, {
      value: 'US',
      label: 'United States'
    }]);

    // Should substitute missing country names with country codes.
    (0, _phoneInputHelpers.getCountrySelectOptions)({
      countries: ['US', 'RU'],
      countryNames: _objectSpread(_objectSpread({}, defaultLabels), {}, {
        'RU': undefined
      })
    }).should.deep.equal([{
      value: 'RU',
      label: 'RU'
    }, {
      value: 'US',
      label: 'United States'
    }]);

    // With "International" (without custom country names).
    (0, _phoneInputHelpers.getCountrySelectOptions)({
      countries: ['US', 'RU'],
      countryNames: defaultLabels,
      addInternationalOption: true
    }).should.deep.equal([{
      label: 'International'
    }, {
      value: 'RU',
      label: 'Russia (????????????)'
    }, {
      value: 'US',
      label: 'United States'
    }]);

    // With "International" (with custom country names).
    (0, _phoneInputHelpers.getCountrySelectOptions)({
      countries: ['US', 'RU'],
      countryNames: _objectSpread(_objectSpread({}, defaultLabels), {}, {
        'RU': 'Russia',
        ZZ: 'Intl'
      }),
      addInternationalOption: true
    }).should.deep.equal([{
      label: 'Intl'
    }, {
      value: 'RU',
      label: 'Russia'
    }, {
      value: 'US',
      label: 'United States'
    }]);
  });
  it('should generate country select options (custom `compareStrings`)', function () {
    var defaultLabels = {
      'RU': 'Russia (????????????)',
      'US': 'United States',
      'ZZ': 'International'
    };

    // Without custom country names.
    (0, _phoneInputHelpers.getCountrySelectOptions)({
      countries: ['US', 'RU'],
      countryNames: defaultLabels,
      // Reverse order.
      compareStrings: function compareStrings(a, b) {
        return a < b ? 1 : a > b ? -1 : 0;
      }
    }).should.deep.equal([{
      value: 'US',
      label: 'United States'
    }, {
      value: 'RU',
      label: 'Russia (????????????)'
    }]);
  });

  // it('should generate country select options (Chinese locale)', () => {
  // 	// https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/20
  //
  // 	const defaultLabels = {
  // 		'RU': 'Russia (????????????)',
  // 		'US': 'United States',
  // 		'ZZ': 'International'
  // 	}
  //
  // 	// Without custom country names.
  // 	getCountrySelectOptions({
  // 		countries: ['US', 'RU'],
  // 		countryNames: defaultLabels,
  // 		compareStringsLocales: 'zh-CN-u-co-pinyin'
  // 	}).should.deep.equal([{
  // 		value: 'US',
  // 		label: 'United States'
  // 	}, {
  // 		value: 'RU',
  // 		label: 'Russia (????????????)'
  // 	}])
  // })

  it('should parse phone numbers', function () {
    var phoneNumber = (0, _phoneInputHelpers.parsePhoneNumber)('+78005553535', _metadata["default"]);
    phoneNumber.country.should.equal('RU');
    phoneNumber.nationalNumber.should.equal('8005553535');

    // No `value` passed.
    expect((0, _phoneInputHelpers.parsePhoneNumber)(null, _metadata["default"])).to.be.undefined;
  });
  it('should generate national number digits', function () {
    var phoneNumber = (0, _phoneInputHelpers.parsePhoneNumber)('+33509758351', _metadata["default"]);
    (0, _phoneInputHelpers.generateNationalNumberDigits)(phoneNumber).should.equal('0509758351');
  });
  it('should migrate parsed input for new country', function () {
    // Country didn't change. Return the same digits.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('', {
      prevCountry: 'US',
      newCountry: 'US',
      metadata: _metadata["default"],
      useNationalFormat: true
    }).should.equal('');

    // Country didn't change. Return the same digits.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('123', {
      prevCountry: 'US',
      newCountry: 'US',
      metadata: _metadata["default"],
      useNationalFormat: true
    }).should.equal('123');

    // Country didn't change. Return the same digits.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+123', {
      prevCountry: 'US',
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('+123');

    // No input. Returns `undefined`.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('', {
      prevCountry: 'RU',
      newCountry: 'US',
      metadata: _metadata["default"],
      useNationalFormat: true
    }).should.equal('');

    // Switching from "International" to a country
    // to which the phone number already belongs to.
    // No changes. Returns `undefined`.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+18005553535', {
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('+18005553535');

    // Switching between countries. National number. No changes.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('8005553535', {
      prevCountry: 'RU',
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('8005553535');

    // Switching from "International" to a country. Calling code not matches. Resets parsed input.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+78005553535', {
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('+1');

    // Switching from "International" to a country. Calling code matches. Doesn't reset parsed input.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+12223333333', {
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('+12223333333');

    // Switching countries. International number. Calling code doesn't match.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+78005553535', {
      prevCountry: 'RU',
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('+1');

    // Switching countries. International number. Calling code matches.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+18005553535', {
      prevCountry: 'CA',
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('+18005553535');

    // Switching countries. International number.
    // Country calling code is longer than the amount of digits available.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+99', {
      prevCountry: 'KG',
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('+1');

    // Switching countries. International number. No such country code.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+99', {
      prevCountry: 'KG',
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('+1');

    // Switching to "International". National number.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('8800555', {
      prevCountry: 'RU',
      metadata: _metadata["default"]
    }).should.equal('+7800555');

    // Switching to "International". No national (significant) number digits entered.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('8', {
      prevCountry: 'RU',
      metadata: _metadata["default"]
      // }).should.equal('')
    }).should.equal('+7');

    // Switching to "International". International number. No changes.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+78005553535', {
      prevCountry: 'RU',
      metadata: _metadata["default"]
    }).should.equal('+78005553535');

    // Prefer national format. Country matches. Leaves the "national (significant) number".
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+78005553535', {
      newCountry: 'RU',
      metadata: _metadata["default"],
      useNationalFormat: true
    }).should.equal('8005553535');

    // Prefer national format. Country doesn't match, but country calling code does. Leaves the "national (significant) number".
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+12133734253', {
      newCountry: 'CA',
      metadata: _metadata["default"],
      useNationalFormat: true
    }).should.equal('2133734253');

    // Prefer national format. Country doesn't match, neither does country calling code. Clears the value.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+78005553535', {
      newCountry: 'US',
      metadata: _metadata["default"],
      useNationalFormat: true
    }).should.equal('');

    // Force international format. `phoneDigits` is empty. From no country to a country.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)(null, {
      newCountry: 'US',
      metadata: _metadata["default"],
      useNationalFormat: false
    }).should.equal('+1');

    // Force international format. `phoneDigits` is not empty. From a country to a country with the same calling code.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+1222', {
      prevCountry: 'CA',
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('+1222');

    // Force international format. `phoneDigits` is not empty. From a country to a country with another calling code.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+1222', {
      prevCountry: 'CA',
      newCountry: 'RU',
      metadata: _metadata["default"]
    }).should.equal('+7');

    // Force international format. `phoneDigits` is not empty. From no country to a country.
    (0, _phoneInputHelpers.getPhoneDigitsForNewCountry)('+1222', {
      newCountry: 'US',
      metadata: _metadata["default"]
    }).should.equal('+1222');
  });
  it('should format phone number in e164', function () {
    // No number.
    expect((0, _phoneInputHelpers.e164)()).to.be.undefined;

    // International number. Just a '+' sign.
    expect((0, _phoneInputHelpers.e164)('+')).to.be.undefined;

    // International number.
    (0, _phoneInputHelpers.e164)('+7800', null, _metadata["default"]).should.equal('+7800');

    // National number. Without country.
    expect((0, _phoneInputHelpers.e164)('8800', null, _metadata["default"])).to.be.undefined;

    // National number. With country. Just national prefix.
    // expect(e164('8', 'RU', metadata)).to.be.undefined
    (0, _phoneInputHelpers.e164)('8', 'RU', _metadata["default"]).should.equal('+7');

    // National number. With country.
    (0, _phoneInputHelpers.e164)('8800', 'RU', _metadata["default"]).should.equal('+7800');
  });
  it('should trim the phone number if it exceeds the maximum length', function () {
    // // No number.
    // expect(trimNumber()).to.be.undefined

    // Empty number.
    expect((0, _phoneInputHelpers.trimNumber)('', 'RU', _metadata["default"])).to.equal('');

    // // International number. Without country.
    // trimNumber('+780055535351').should.equal('+780055535351')

    // // National number. Without country.
    // trimNumber('880055535351', null).should.equal('880055535351')

    // National number. Doesn't exceed the maximum length.
    (0, _phoneInputHelpers.trimNumber)('2135553535', 'US', _metadata["default"]).should.equal('2135553535');
    // National number. Exceeds the maximum length.
    (0, _phoneInputHelpers.trimNumber)('21355535351', 'US', _metadata["default"]).should.equal('2135553535');

    // International number. Doesn't exceed the maximum length.
    (0, _phoneInputHelpers.trimNumber)('+12135553535', 'US', _metadata["default"]).should.equal('+12135553535');
    // International number. Exceeds the maximum length.
    (0, _phoneInputHelpers.trimNumber)('+121355535351', 'US', _metadata["default"]).should.equal('+12135553535');
  });
  it('should get country for partial E.164 number', function () {
    // Just a '+' sign.
    (0, _phoneInputHelpers.getCountryForPartialE164Number)('+', {
      country: 'RU',
      countries: ['US', 'RU'],
      metadata: _metadata["default"]
    }).should.equal('RU');
    expect((0, _phoneInputHelpers.getCountryForPartialE164Number)('+', {
      countries: ['US', 'RU'],
      metadata: _metadata["default"]
    })).to.be.undefined;

    // A country can be derived.
    (0, _phoneInputHelpers.getCountryForPartialE164Number)('+78005553535', {
      countries: ['US', 'RU'],
      metadata: _metadata["default"]
    }).should.equal('RU');

    // A country can't be derived yet.
    // And the currently selected country doesn't fit the number.
    expect((0, _phoneInputHelpers.getCountryForPartialE164Number)('+7', {
      country: 'FR',
      countries: ['FR', 'RU'],
      metadata: _metadata["default"]
    })).to.be.undefined;
    expect((0, _phoneInputHelpers.getCountryForPartialE164Number)('+12', {
      country: 'FR',
      countries: ['FR', 'US'],
      metadata: _metadata["default"]
    })).to.be.undefined;

    // A country can't be derived yet.
    // And the currently selected country doesn't fit the number.
    // Bit "International" option is not available.
    (0, _phoneInputHelpers.getCountryForPartialE164Number)('+7', {
      country: 'FR',
      countries: ['FR', 'RU'],
      required: true,
      metadata: _metadata["default"]
    }).should.equal('FR');
    (0, _phoneInputHelpers.getCountryForPartialE164Number)('+12', {
      country: 'FR',
      countries: ['FR', 'US'],
      required: true,
      metadata: _metadata["default"]
    }).should.equal('FR');
  });
  it('should get country from possibly incomplete international phone number', function () {
    // // `001` country calling code.
    // // Non-geographic numbering plan.
    // expect(getCountryFromPossiblyIncompleteInternationalPhoneNumber('+800', metadata)).to.be.undefined

    // Country can be derived.
    (0, _phoneInputHelpers.getCountryFromPossiblyIncompleteInternationalPhoneNumber)('+33', _metadata["default"]).should.equal('FR');

    // Country can't be derived yet.
    expect((0, _phoneInputHelpers.getCountryFromPossiblyIncompleteInternationalPhoneNumber)('+12', _metadata["default"])).to.be.undefined;
  });
  it('should compare strings', function () {
    (0, _phoneInputHelpers.compareStrings)('aa', 'ab').should.equal(-1);
    (0, _phoneInputHelpers.compareStrings)('aa', 'aa').should.equal(0);
    (0, _phoneInputHelpers.compareStrings)('aac', 'aab').should.equal(1);
  });
  it('should strip country calling code from a number', function () {
    // Number is longer than country calling code prefix.
    (0, _phoneInputHelpers.stripCountryCallingCode)('+7800', 'RU', _metadata["default"]).should.equal('800');

    // Number is shorter than (or equal to) country calling code prefix.
    (0, _phoneInputHelpers.stripCountryCallingCode)('+3', 'FR', _metadata["default"]).should.equal('');
    (0, _phoneInputHelpers.stripCountryCallingCode)('+7', 'FR', _metadata["default"]).should.equal('');

    // `country` doesn't fit the actual `number`.
    // Iterates through all available country calling codes.
    (0, _phoneInputHelpers.stripCountryCallingCode)('+7800', 'FR', _metadata["default"]).should.equal('800');

    // No `country`.
    // And the calling code doesn't belong to any country.
    (0, _phoneInputHelpers.stripCountryCallingCode)('+999', null, _metadata["default"]).should.equal('');
  });
  it('should get national significant number part', function () {
    // International number.
    (0, _phoneInputHelpers.getNationalSignificantNumberDigits)('+7800555', null, _metadata["default"]).should.equal('800555');

    // International number.
    // No national (significant) number digits.
    expect((0, _phoneInputHelpers.getNationalSignificantNumberDigits)('+', null, _metadata["default"])).to.be.undefined;
    expect((0, _phoneInputHelpers.getNationalSignificantNumberDigits)('+7', null, _metadata["default"])).to.be.undefined;

    // National number.
    (0, _phoneInputHelpers.getNationalSignificantNumberDigits)('8800555', 'RU', _metadata["default"]).should.equal('800555');

    // National number.
    // No national (significant) number digits.
    expect((0, _phoneInputHelpers.getNationalSignificantNumberDigits)('8', 'RU', _metadata["default"])).to.be.undefined;
    expect((0, _phoneInputHelpers.getNationalSignificantNumberDigits)('', 'RU', _metadata["default"])).to.be.undefined;
  });
  it('should determine of a number could belong to a country', function () {
    // Matching.
    (0, _phoneInputHelpers.couldNumberBelongToCountry)('+7800', 'RU', _metadata["default"]).should.equal(true);

    // First digit already not matching.
    (0, _phoneInputHelpers.couldNumberBelongToCountry)('+7800', 'FR', _metadata["default"]).should.equal(false);

    // First digit matching, second - not matching.
    (0, _phoneInputHelpers.couldNumberBelongToCountry)('+33', 'AM', _metadata["default"]).should.equal(false);

    // Number is shorter than country calling code.
    (0, _phoneInputHelpers.couldNumberBelongToCountry)('+99', 'KG', _metadata["default"]).should.equal(true);
  });
  it('should handle phone digits change (should choose new "value" based on phone digits)', function () {
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+', {
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+',
      country: undefined,
      value: undefined
    });
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+', {
      metadata: _metadata["default"],
      countryRequired: true,
      getAnyCountry: function getAnyCountry() {
        return 'US';
      }
    }).should.deep.equal({
      phoneDigits: '+',
      country: 'US',
      value: undefined
    });
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+7', {
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+7',
      country: undefined,
      value: '+7'
    });
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+7', {
      metadata: _metadata["default"],
      country: 'RU'
    }).should.deep.equal({
      phoneDigits: '+7',
      country: 'RU',
      value: undefined
    });
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+78', {
      metadata: _metadata["default"],
      country: 'RU'
    }).should.deep.equal({
      phoneDigits: '+78',
      country: 'RU',
      value: '+78'
    });
  });
  it('should handle phone digits change', function () {
    (0, _phoneInputHelpers.onPhoneDigitsChange)(undefined, {
      country: 'RU',
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: undefined,
      country: 'RU',
      value: undefined
    });
    (0, _phoneInputHelpers.onPhoneDigitsChange)('', {
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '',
      country: undefined,
      value: undefined
    });
    (0, _phoneInputHelpers.onPhoneDigitsChange)('1213', {
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+1213',
      country: undefined,
      value: '+1213'
    });
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+1213', {
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+1213',
      country: undefined,
      value: '+1213'
    });
    (0, _phoneInputHelpers.onPhoneDigitsChange)('213', {
      country: 'US',
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '213',
      country: 'US',
      value: '+1213'
    });
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+78005553535', {
      country: 'US',
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+78005553535',
      country: 'RU',
      value: '+78005553535'
    });

    // Won't reset an already selected country.

    (0, _phoneInputHelpers.onPhoneDigitsChange)('+15555555555', {
      country: 'US',
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+15555555555',
      country: 'US',
      value: '+15555555555'
    });

    // Should reset the country if it has likely been automatically
    // selected based on international phone number input
    // and the user decides to erase all input.
    (0, _phoneInputHelpers.onPhoneDigitsChange)('', {
      prevPhoneDigits: '+78005553535',
      country: 'RU',
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '',
      country: undefined,
      value: undefined
    });

    // Should reset the country if it has likely been automatically
    // selected based on international phone number input
    // and the user decides to erase all input.
    // Should reset to default country.
    (0, _phoneInputHelpers.onPhoneDigitsChange)('', {
      prevPhoneDigits: '+78005553535',
      country: 'RU',
      defaultCountry: 'US',
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '',
      country: 'US',
      value: undefined
    });

    // Should reset the country if it has likely been automatically
    // selected based on international phone number input
    // and the user decides to erase all input up to the `+` sign.
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+', {
      prevPhoneDigits: '+78005553535',
      country: 'RU',
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+',
      country: undefined,
      value: undefined
    });
  });
  it('should handle phone digits change (limitMaxLength: true)', function () {
    (0, _phoneInputHelpers.onPhoneDigitsChange)('21337342530', {
      country: 'US',
      limitMaxLength: true,
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '2133734253',
      country: 'US',
      value: '+12133734253'
    });
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+121337342530', {
      country: 'US',
      limitMaxLength: true,
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+12133734253',
      country: 'US',
      value: '+12133734253'
    });

    // This case is intentionally ignored to simplify the code.
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+121337342530', {
      limitMaxLength: true,
      metadata: _metadata["default"]
    }).should.deep.equal({
      // phoneDigits: '+12133734253',
      // country: 'US',
      // value: '+12133734253'
      phoneDigits: '+121337342530',
      country: undefined,
      value: '+121337342530'
    });
  });
  it('should handle phone digits change (`international: true`)', function () {
    // Shouldn't set `country` to `defaultCountry`
    // when erasing parsed input starting with a `+`
    // when `international` is `true`.
    (0, _phoneInputHelpers.onPhoneDigitsChange)('', {
      prevPhoneDigits: '+78005553535',
      country: 'RU',
      defaultCountry: 'US',
      international: true,
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '',
      country: undefined,
      value: undefined
    });

    // Should support forcing international phone number input format.
    (0, _phoneInputHelpers.onPhoneDigitsChange)('2', {
      prevPhoneDigits: '+78005553535',
      country: 'RU',
      international: true,
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+2',
      country: undefined,
      value: '+2'
    });
  });
  it('should handle phone digits change (`international: true` and `countryCallingCodeEditable: false`) (reset incompatible international input)', function () {
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+1', {
      prevPhoneDigits: '+78005553535',
      country: 'RU',
      international: true,
      countryCallingCodeEditable: false,
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+7',
      country: 'RU',
      value: undefined
    });
  });
  it('should handle phone digits change (`international: true` and `countryCallingCodeEditable: false`) (append national input)', function () {
    (0, _phoneInputHelpers.onPhoneDigitsChange)('8', {
      prevPhoneDigits: '+78005553535',
      country: 'RU',
      international: true,
      countryCallingCodeEditable: false,
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+78',
      country: 'RU',
      value: '+78'
    });
  });
  it('should handle phone digits change (`international: true` and `countryCallingCodeEditable: false`) (compatible input)', function () {
    (0, _phoneInputHelpers.onPhoneDigitsChange)('+7', {
      prevPhoneDigits: '+78005553535',
      country: 'RU',
      international: true,
      countryCallingCodeEditable: false,
      metadata: _metadata["default"]
    }).should.deep.equal({
      phoneDigits: '+7',
      country: 'RU',
      value: undefined
    });
  });
  it('should handle phone digits change (`international: false`)', function () {
    var onChange = function onChange(phoneDigits, prevPhoneDigits, country) {
      return (0, _phoneInputHelpers.onPhoneDigitsChange)(phoneDigits, {
        prevPhoneDigits: prevPhoneDigits,
        country: country,
        international: false,
        metadata: _metadata["default"]
      });
    };

    // `phoneDigits` in international format.
    // Just country calling code.
    onChange('+7', '', 'RU').should.deep.equal({
      phoneDigits: '',
      country: 'RU',
      value: undefined
    });

    // `phoneDigits` in international format.
    // Country calling code and first digit.
    // (which is assumed a "national prefix").
    onChange('+78', '', 'RU').should.deep.equal({
      phoneDigits: '8',
      country: 'RU',
      // value: undefined
      value: '+7'
    });

    // `phoneDigits` in international format.
    // Country calling code and first two digits.
    onChange('+121', '', 'US').should.deep.equal({
      phoneDigits: '21',
      country: 'US',
      value: '+121'
    });

    // `phoneDigits` in international format.
    onChange('+78005553535', '', 'RU').should.deep.equal({
      phoneDigits: '88005553535',
      country: 'RU',
      value: '+78005553535'
    });

    // `phoneDigits` in international format.
    // Another country: just trims the `+`.
    onChange('+78005553535', '', 'US').should.deep.equal({
      phoneDigits: '78005553535',
      country: 'US',
      value: '+178005553535'
    });

    // `phoneDigits` in national format.
    onChange('88005553535', '', 'RU').should.deep.equal({
      phoneDigits: '88005553535',
      country: 'RU',
      value: '+78005553535'
    });

    // `phoneDigits` in national format.
    onChange('88005553535', '8800555353', 'RU').should.deep.equal({
      phoneDigits: '88005553535',
      country: 'RU',
      value: '+78005553535'
    });

    // Empty `phoneDigits`.
    onChange('', '88005553535', 'RU').should.deep.equal({
      phoneDigits: '',
      country: 'RU',
      value: undefined
    });
  });
  it('should handle phone digits change (`international: false` and no country selected)', function () {
    // If `international` is `false` then it means that
    // "International" option should not be available,
    // so it doesn't handle the cases when it is available.

    var onChange = function onChange(phoneDigits) {
      return (0, _phoneInputHelpers.onPhoneDigitsChange)(phoneDigits, {
        prevPhoneDigits: '',
        international: false,
        metadata: _metadata["default"]
      });
    };

    // `phoneDigits` in international format.
    // No country calling code.
    onChange('+').should.deep.equal({
      phoneDigits: '+',
      country: undefined,
      value: undefined
    });

    // `phoneDigits` in international format.
    // Just country calling code.
    onChange('+7').should.deep.equal({
      phoneDigits: '+7',
      country: undefined,
      value: '+7'
    });

    // `phoneDigits` in international format.
    // Country calling code and first digit.
    // (which is assumed a "national prefix").
    onChange('+78').should.deep.equal({
      phoneDigits: '8',
      country: 'RU',
      // value: undefined
      value: '+7'
    });

    // `phoneDigits` in international format.
    // Country calling code and first two digits.
    onChange('+3311').should.deep.equal({
      phoneDigits: '11',
      country: 'FR',
      value: '+3311'
    });

    // `phoneDigits` in international format.
    // Full number.
    onChange('+78005553535').should.deep.equal({
      phoneDigits: '88005553535',
      country: 'RU',
      value: '+78005553535'
    });
  });
  it('should get initial parsed input', function () {
    (0, _phoneInputHelpers.getInitialPhoneDigits)({
      value: '+78005553535',
      defaultCountry: 'RU',
      international: false,
      metadata: _metadata["default"]
    }).should.equal('+78005553535');
    (0, _phoneInputHelpers.getInitialPhoneDigits)({
      value: '+78005553535',
      defaultCountry: 'RU',
      international: true,
      metadata: _metadata["default"]
    }).should.equal('+78005553535');
    (0, _phoneInputHelpers.getInitialPhoneDigits)({
      value: undefined,
      defaultCountry: 'RU',
      international: true,
      metadata: _metadata["default"]
    }).should.equal('+7');
    expect((0, _phoneInputHelpers.getInitialPhoneDigits)({
      value: undefined,
      defaultCountry: 'RU',
      international: false,
      metadata: _metadata["default"]
    })).to.be.undefined;
    expect((0, _phoneInputHelpers.getInitialPhoneDigits)({
      value: undefined,
      international: false,
      metadata: _metadata["default"]
    })).to.be.undefined;
  });
  it('should get initial parsed input (has `phoneNumber` that has `country`)', function () {
    var phoneNumber = (0, _phoneInputHelpers.parsePhoneNumber)('+78005553535', _metadata["default"]);
    (0, _phoneInputHelpers.getInitialPhoneDigits)({
      value: phoneNumber.number,
      defaultCountry: 'RU',
      useNationalFormat: true,
      phoneNumber: phoneNumber,
      metadata: _metadata["default"]
    }).should.equal('88005553535');
  });
  it('should get initial parsed input (has `phoneNumber` that has no `country`)', function () {
    var phoneNumber = (0, _phoneInputHelpers.parsePhoneNumber)('+870773111632', _metadata["default"]);
    (0, _phoneInputHelpers.getInitialPhoneDigits)({
      value: phoneNumber.number,
      defaultCountry: 'RU',
      useNationalFormat: true,
      phoneNumber: phoneNumber,
      metadata: _metadata["default"]
    }).should.equal('+870773111632');
  });
});
//# sourceMappingURL=phoneInputHelpers.test.js.map