"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _PrivateKeyInfo = require("./PrivateKeyInfo.js");

var _PrivateKeyInfo2 = _interopRequireDefault(_PrivateKeyInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//**************************************************************************************
/**
 * Class from RFC5208
 */
class KeyBag extends _PrivateKeyInfo2.default {
	//**********************************************************************************
	/**
  * Constructor for Attribute class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		super(parameters);
	}
	//**********************************************************************************
}
exports.default = KeyBag; //**************************************************************************************
//# sourceMappingURL=KeyBag.js.map