"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactHookForm = require("react-hook-form");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _excluded = ["Component", "name", "defaultValue", "shouldUnregister", "control", "rules", "onChange", "onBlur"],
  _excluded2 = ["ref", "onChange", "onBlur"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var ReactHookFormInput = function ReactHookFormInput(_ref, ref) {
  var Component = _ref.Component,
    name = _ref.name,
    defaultValue = _ref.defaultValue,
    shouldUnregister = _ref.shouldUnregister,
    control = _ref.control,
    rules = _ref.rules,
    onChange_ = _ref.onChange,
    onBlur_ = _ref.onBlur,
    rest = _objectWithoutProperties(_ref, _excluded);
  var internalRef = (0, _react.useRef)();
  var setRef = (0, _react.useCallback)(function (instance) {
    internalRef.current = instance;
    if (ref) {
      if (typeof ref === 'function') {
        ref(instance);
      } else {
        ref.current = instance;
      }
    }
  }, [ref]);

  // `feact-hook-form` doesn't know how to properly handle `undefined` values.
  // https://github.com/react-hook-form/react-hook-form/issues/2990
  defaultValue = defaultValue === undefined ? null : defaultValue;
  var renderInputComponent = function renderInputComponent(_ref2) {
    var ref = _ref2.ref,
      onChange = _ref2.onChange,
      onBlur = _ref2.onBlur,
      restReactHookFormControlledFieldProps = _objectWithoutProperties(_ref2, _excluded2);
    // Setting `ref` passed by `react-hook-form` results in a bug:
    // when an initial value is defined (example: "+78005553535")
    // it seems to be set directly on the `ref`d `<input/>`
    // by `react-hook-form` and the result is a non-formatted
    // "+78005553535" initial value in the `<input/>`.
    //
    // To work around that bug, a fake `ref` is assigned,
    // so that it could only `.focus()` it and no more.
    //
    // `useImperativeHandle()` hook seems to allow `ref` being `undefined`.
    //
    // if (ref) {
    (0, _react.useImperativeHandle)(ref, function () {
      return {
        focus: function focus() {
          internalRef.current.focus();
        }
      };
    });
    // }

    var setComponentRef = (0, _react.useCallback)(function (instance) {
      setRef(instance);
      // if (ref) {
      //   if (typeof ref === 'function') {
      //     ref(instance)
      //   } else {
      //     ref.current = instance
      //   }
      // }
    }, [ref, setRef]);

    // This function may not work correctly when `defaultValues` are set for the input
    // and the user clears the input value manually: the default value may re-appear as a result.
    // https://github.com/catamphetamine/react-phone-number-input/issues/405#issuecomment-1295885201
    var onChangeCombined = (0, _react.useCallback)(function (value) {
      // `react-hook-form` doesn't know how to properly handle `undefined` values.
      // https://github.com/react-hook-form/react-hook-form/issues/2990
      if (value === undefined) {
        value = null;
      }
      onChange(value);
      if (onChange_) {
        onChange_(value);
      }
    }, [onChange, onChange_]);
    var onBlurCombined = (0, _react.useCallback)(function (event) {
      onBlur(event);
      if (onBlur_) {
        onBlur_(event);
      }
    }, [onBlur, onBlur_]);
    return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, rest, restReactHookFormControlledFieldProps, {
      ref: setComponentRef,
      onChange: onChangeCombined,
      onBlur: onBlurCombined
    }));
  };

  // `react-hook-form@7` no longer accepts `onFocus` property.
  // Since this component can be used with both `v6` and `v7`,
  // the `onFocus` property is left here.
  var onFocus = (0, _react.useCallback)(function () {
    // internalRef.current.disabled = false
    internalRef.current.focus();
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
    control: control,
    name: name,
    defaultValue: defaultValue,
    shouldUnregister: shouldUnregister,
    rules: rules,
    onFocus: onFocus,
    render: function render(props) {
      // Differentiate between `react-hook-form@6` and `react-hook-form@7`.
      // https://react-hook-form.com/migrate-v6-to-v7/
      // https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/57
      // `props` (before v7) and `props.fields` (in v7) contain properties like:
      // `ref`, `name`, `value`, `onChange`, `onBlur`.
      // https://github.com/react-hook-form/react-hook-form/blob/b0e6c3057ac12a7b12d5616aecf3791acb7d7204/src/types/controller.ts#L21-L30
      return renderInputComponent(props.field || props);
    }
  });
};
ReactHookFormInput = /*#__PURE__*/_react["default"].forwardRef(ReactHookFormInput);
ReactHookFormInput.propTypes = {
  Component: _propTypes["default"].elementType.isRequired,
  name: _propTypes["default"].string.isRequired,
  defaultValue: _propTypes["default"].string,
  // A quote from `react-hook-form`:
  // Without `shouldUnregister: true`, an input value would be retained when input is removed.
  // Setting `shouldUnregister: true` makes the form behave more closer to native.
  shouldUnregister: _propTypes["default"].bool,
  control: _propTypes["default"].object.isRequired,
  rules: _propTypes["default"].object,
  onChange: _propTypes["default"].func,
  onBlur: _propTypes["default"].func
};
var _default = ReactHookFormInput;
exports["default"] = _default;
//# sourceMappingURL=ReactHookFormInput.js.map