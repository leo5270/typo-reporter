(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TypoReporter", [], factory);
	else if(typeof exports === 'object')
		exports["TypoReporter"] = factory();
	else
		root["TypoReporter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = el;
/*
 * Helper function to create a DOM elements
 *
 * @param string tagName
 * @param object attributes. Set tag attributes or event handlers.
 * Event handlers start with `on` and are written in upperCamelCase, e.g. `onClick`
 * @param array||string children. Either a string that is parsed as HTML or an array of DOM nodes
 * @return Element. Rendered Element object
 */
function el(tagName, attributes, children) {
	if (typeof tagName !== 'string') {
		throw new Error('tagName must be a string');
	}

	var element = document.createElement(tagName);

	if (attributes && (typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) === 'object') {
		Object.keys(attributes).forEach(function (i) {
			// Set event handlers
			if (/on[A-Z][a-z]/.test(i)) {
				element[i.toLowerCase()] = attributes[i];
			} else {
				// Set attributes
				element.setAttribute(i, attributes[i]);
			}
		});
	}

	if (typeof children === 'string') {
		element.innerHTML = children;
	} else if (children instanceof Array) {
		children.forEach(function (child) {
			element.appendChild(child);
		});
	}

	return element;
}
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _el = __webpack_require__(0);

var _el2 = _interopRequireDefault(_el);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * TypoReporter.
 * @param object props. Object of options.
 * @param Element
 */
function TypoReporter(props, rootNode) {
	props = props || {};
	if (!rootNode) {
		throw new Error('"rootNode" is not passed');
	}
	if (!props.formId) {
		throw new Error('"formId" option is not defined');
	}
	props.snippetFieldName = props.snippetFieldName || 'entry.13240190';
	props.urlFieldName = props.urlFieldName || 'entry.238687347';
	props.commentFieldName = props.commentFieldName || 'entry.1447231081';
	props.endpointUrl = props.endpointUrl || 'https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/d/e/' + props.formId + '/formResponse?embedded=true';
	props.offset = props.offset || 50;
	props.translations = props.translations || this.translations;
	props.locale = props.locale || 'en';
	if (!props.translations[props.locale]) {
		throw new Error('No translations defined for locale ' + props.locale);
	}
	this.i18n = props.translations[props.locale];
	this.props = props;
	this.node = rootNode;
	this.state = {};

	// Bind methods
	this.submit = this.submit.bind(this);
	this.handleCommentChange = this.handleCommentChange.bind(this);
	this.closeDialog = this.closeDialog.bind(this);

	// Setup key bindings
	document.addEventListener('keydown', function (event) {
		if (event.ctrlKey && event.which === 13) {
			this.showDialog();
		}
		if (event.which === 27) {
			this.closeDialog();
		}
	}.bind(this));

	this.refresh();
}

TypoReporter.prototype.translations = {
	en: {
		header: 'Report a mistake on the page',
		messageLabel: 'There is a mistake in the following text:',
		commentLabel: '<strong>Do you want to send a notice to a webmaster?</strong>',
		send: '<strong>Send</strong>',
		sending: 'Sending',
		cancel: 'Cancel',
		error: 'Error! Something went wrong...'
	},
	ru: {
		header: 'Сообщите об ошибке на странице',
		messageLabel: 'Ошибка содержится в следующем тексте:',
		commentLabel: '<strong>Отправить сообщение об ошибке редактору сайта?</strong>',
		send: '<strong>Отправить</strong>',
		sending: 'Отправляю',
		cancel: 'Отмена',
		error: 'Ошибка! Что-то пошло не так...'
	}
};

TypoReporter.prototype.render = function () {
	var state = this.state;
	var i18n = this.i18n;

	return state.isOpen && (0, _el2.default)('div', { class: 'ReportTypo' }, [(0, _el2.default)('div', { class: 'ReportTypo-header' }, i18n.header), (0, _el2.default)('div', { class: 'ReportTypo-label' }, i18n.messageLabel), (0, _el2.default)('div', { class: 'ReportTypo-message' }, state.snippet.replace('>>>', '<u class="ReportTypo-heighlight">').replace('<<<', '</u>')), (0, _el2.default)('textarea', { class: 'ReportTypo-comment', onKeyup: this.handleCommentChange }, state.comment), (0, _el2.default)('div', { class: 'ReportTypo-label' }, i18n.commentLabel), (0, _el2.default)('div', { style: 'text-align: right;' }, [(0, _el2.default)('button', { type: 'button', class: 'ReportTypo-submit', onClick: this.submit }, state.isSending ? i18n.sending : i18n.send), (0, _el2.default)('button', { type: 'button', class: 'ReportTypo-cancel', onClick: this.closeDialog }, i18n.cancel)]), (0, _el2.default)('div', null, state.isError && i18n.error)]);
};

TypoReporter.prototype.refresh = function () {
	var node = this.node;
	node.innerHTML = '';
	var nodeTree = this.render();
	if (nodeTree) {
		node.appendChild(nodeTree);
	}
};

TypoReporter.prototype.submit = function () {
	var _data,
	    _this = this;

	var state = this.state;
	var props = this.props;

	state.isSending = true;
	this.refresh();

	var data = {
		data: (_data = {}, _defineProperty(_data, props.snippetFieldName, state.snippet), _defineProperty(_data, props.commentFieldName, state.comment), _defineProperty(_data, props.urlFieldName, window.location.href), _defineProperty(_data, 'language', props.locale), _data)
	};

	fetch(props.endpointUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(function (response) {
		return response.json();
	}).then(function () {
		_this.closeDialog();
	}).catch(function (err) {
		console.error(err);
		state.isError = true;
		state.isSending = false;
		_this.refresh();
	});
};

TypoReporter.prototype.getSnippet = function () {
	var props = this.props;

	var selection = document.getSelection();
	var selectionText = selection.toString();
	if (selectionText) {
		var range = selection.getRangeAt(0);
		var preRange = document.createRange();
		var postRange = document.createRange();
		preRange.setStartBefore(range.startContainer.ownerDocument.body);
		preRange.setEnd(range.startContainer, range.startOffset);
		postRange.setStart(range.endContainer, range.endOffset);
		postRange.setEndAfter(range.endContainer.ownerDocument.body);
		var pre = preRange.toString().substr(-props.offset);
		var post = postRange.toString().substr(0, props.offset);
		var result = pre + '>>>' + selectionText + '<<<' + post;
		var sanitize = document.createElement('div');
		sanitize.innerHTML = result;
		return sanitize.innerText.replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ');
	}
};

TypoReporter.prototype.showDialog = function () {
	var state = this.state;

	state.snippet = this.getSnippet();
	if (state.snippet) {
		state.isOpen = true;
		this.refresh();
	}
};

TypoReporter.prototype.closeDialog = function () {
	// Completely reset the state
	this.state = {};
	this.refresh();
};

TypoReporter.prototype.handleCommentChange = function (event) {
	this.state.comment = event.target.value;
};

exports.default = TypoReporter;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=TypoReporter.js.map