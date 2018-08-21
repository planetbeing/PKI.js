"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _RecipientEncryptedKey = require("./RecipientEncryptedKey.js");

var _RecipientEncryptedKey2 = _interopRequireDefault(_RecipientEncryptedKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5652
 */
class RecipientEncryptedKeys {
	//**********************************************************************************
	/**
  * Constructor for RecipientEncryptedKeys class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {Array.<RecipientEncryptedKey>}
   * @desc encryptedKeys
   */
		this.encryptedKeys = (0, _pvutils.getParametersValue)(parameters, "encryptedKeys", RecipientEncryptedKeys.defaultValues("encryptedKeys"));
		//endregion

		//region If input argument array contains "schema" for this object
		if ("schema" in parameters) this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
  * Return default values for all class members
  * @param {string} memberName String name for a class member
  */
	static defaultValues(memberName) {
		switch (memberName) {
			case "encryptedKeys":
				return [];
			default:
				throw new Error(`Invalid member name for RecipientEncryptedKeys class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Compare values with default values for all class members
  * @param {string} memberName String name for a class member
  * @param {*} memberValue Value to compare with default value
  */
	static compareWithDefault(memberName, memberValue) {
		switch (memberName) {
			case "encryptedKeys":
				return memberValue.length === 0;
			default:
				throw new Error(`Invalid member name for RecipientEncryptedKeys class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * RecipientEncryptedKeys ::= SEQUENCE OF RecipientEncryptedKey
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [RecipientEncryptedKeys]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Repeated({
				name: names.RecipientEncryptedKeys || "",
				value: _RecipientEncryptedKey2.default.schema()
			})]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["RecipientEncryptedKeys"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, RecipientEncryptedKeys.schema({
			names: {
				RecipientEncryptedKeys: "RecipientEncryptedKeys"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RecipientEncryptedKeys");
		//endregion

		//region Get internal properties from parsed schema
		this.encryptedKeys = Array.from(asn1.result.RecipientEncryptedKeys, element => new _RecipientEncryptedKey2.default({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		//region Construct and return new ASN.1 schema for this object
		return new asn1js.Sequence({
			value: Array.from(this.encryptedKeys, element => element.toSchema())
		});
		//endregion
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		return {
			encryptedKeys: Array.from(this.encryptedKeys, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
exports.default = RecipientEncryptedKeys; //**************************************************************************************
//# sourceMappingURL=RecipientEncryptedKeys.js.map