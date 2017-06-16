(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Freud", [], factory);
	else if(typeof exports === 'object')
		exports["Freud"] = factory();
	else
		root["Freud"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.freud = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;

        if ("value" in descriptor) {
          descriptor.writable = true;
        }

        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) {
        defineProperties(Constructor.prototype, protoProps);
      }

      if (staticProps) {
        defineProperties(Constructor, staticProps);
      }

      return Constructor;
    };
  }();

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var default_options = {
    behaviourKey: 'behaviours'
  };

  var normalize_behaviours = function normalize_behaviours(behaviours) {
    if (!behaviours) {
      return [];
    }

    try {
      behaviours = JSON.parse(behaviours);
    } catch (e) {
      behaviours = behaviours;

      if ((typeof behaviours === 'undefined' ? 'undefined' : _typeof(behaviours)) != 'object') {
        behaviours = [behaviours];
      }
    }
    return behaviours;
  };

  function getBehaviours(element, options) {
    var behaviours = normalize_behaviours(element.dataset[options['behaviourKey']]);

    if (options['behaviours']) {
      behaviours = (behaviours || []).concat(options['behaviours']);
    }

    return behaviours;
  }

  function getTargets(selector_or_dom, options) {
    var targets;

    if (selector_or_dom == null) {
      var target_attr = 'data-' + options['behaviourKey'];
      targets = document.querySelectorAll('[' + target_attr + ']');
    } else if (selector_or_dom instanceof HTMLElement) {
      targets = [selector_or_dom];
    } else if (typeof selector_or_dom == 'string') {
      var targets = document.querySelectorAll(selector_or_dom);
    } else {
      throw 'No compatible selector or DOM node given to Freud.init';
    }

    return targets;
  }

  var Freud = function () {
    function Freud() {
      _classCallCheck(this, Freud);

      this.behaviours = {};
    }

    _createClass(Freud, [{
      key: 'init',
      value: function init() {
        var _this = this;

        var selector_or_dom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var options = _extends({}, default_options, options);
        var targets = getTargets(selector_or_dom, options) || [];

        var _a = targets;

        var _f = function _f(target) {
          var el_behaviours = getBehaviours(target, options);
          var target_options = _extends({}, options, target.dataset);

          var _a2 = el_behaviours;

          var _f2 = function _f2(behaviour_name) {
            if (_this.behaviours[behaviour_name]) {
              if (!target.dataset['loaded_behaviour_' + behaviour_name]) {
                target.dataset['loaded_behaviour_' + behaviour_name] = true;
                new _this.behaviours[behaviour_name](target, target_options);
              }
            }
          };

          for (var _i2 = 0; _i2 < _a2.length; _i2++) {
            _f2(_a2[_i2], _i2, _a2);
          }

          undefined;
        };

        for (var _i = 0; _i < _a.length; _i++) {
          _f(_a[_i], _i, _a);
        }

        undefined;

        return targets;
      }
    }, {
      key: 'register',
      value: function register(behaviour_or_name) {
        var behaviour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (!behaviour_or_name) {
          throw "Freud.register called without a behaviour or name";
        }

        if (typeof behaviour_or_name == 'function') {
          var name = behaviour_or_name.name;
          var behaviour = behaviour_or_name;
        } else {
          if (!behaviour || typeof behaviour != 'function') {
            throw "Freud.register called without a behaviour or behaviour type is invalid";
          }
          var name = behaviour_or_name;
          var behaviour = behaviour;
        }

        this.behaviours[name] = behaviour;
      }
    }, {
      key: 'ready',
      value: function ready(fn) {
        if (document.readyState != 'loading') {
          fn();
        } else {
          document.addEventListener('DOMContentLoaded', fn);
        }
      }
    }]);

    return Freud;
  }();

  exports.default = new Freud();
  module.exports = exports['default'];
});

/***/ })
/******/ ]);
});