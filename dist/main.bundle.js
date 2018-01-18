/******/ (function(modules) { // webpackBootstrap
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

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: /Users/john.taylor/git/p/kucc/src/index.js: Unexpected token, expected \";\" (1:9)\n\n> 1 | actually fill this out\n    |          ^\n  2 | \n    at Parser.raise (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:840:15)\n    at Parser.unexpected (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:2236:16)\n    at Parser.semicolon (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:2216:40)\n    at Parser.parseExpressionStatement (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:4753:10)\n    at Parser.parseStatementContent (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:4351:19)\n    at Parser.parseStatement (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:4230:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:4788:23)\n    at Parser.parseBlockBody (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:4774:10)\n    at Parser.parseTopLevel (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:4198:10)\n    at Parser.parse (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:5637:17)\n    at parse (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/node_modules/babylon/lib/index.js:10696:38)\n    at parser (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/lib/transformation/normalize-file.js:106:33)\n    at normalizeFile (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/lib/transformation/normalize-file.js:53:11)\n    at runSync (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/lib/transformation/index.js:34:41)\n    at transformSync (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/lib/transform-sync.js:15:38)\n    at Object.transform (/Users/john.taylor/git/p/kucc/node_modules/@babel/core/lib/transform.js:20:65)\n    at transpile (/Users/john.taylor/git/p/kucc/node_modules/babel-loader/lib/index.js:55:20)\n    at Object.module.exports (/Users/john.taylor/git/p/kucc/node_modules/babel-loader/lib/index.js:179:20)");

/***/ })
/******/ ]);