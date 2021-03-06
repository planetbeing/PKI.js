"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC3447
 */
class RSAPublicKey {
	//**********************************************************************************
	/**
  * Constructor for RSAPublicKey class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  * @property {Integer} [modulus]
  * @property {Integer} [publicExponent]
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {Integer}
   * @desc Modulus part of RSA public key
   */
		this.modulus = (0, _pvutils.getParametersValue)(parameters, "modulus", RSAPublicKey.defaultValues("modulus"));
		/**
   * @type {Integer}
   * @desc Public exponent of RSA public key
   */
		this.publicExponent = (0, _pvutils.getParametersValue)(parameters, "publicExponent", RSAPublicKey.defaultValues("publicExponent"));
		//endregion

		//region If input argument array contains "schema" for this object
		if ("schema" in parameters) this.fromSchema(parameters.schema);
		//endregion
		//region If input argument array contains "json" for this object
		if ("json" in parameters) this.fromJSON(parameters.json);
		//endregion
	}
	//**********************************************************************************
	/**
  * Return default values for all class members
  * @param {string} memberName String name for a class member
  */
	static defaultValues(memberName) {
		switch (memberName) {
			case "modulus":
				return new asn1js.Integer();
			case "publicExponent":
				return new asn1js.Integer();
			default:
				throw new Error(`Invalid member name for RSAPublicKey class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * RSAPublicKey ::= Sequence {
  *    modulus           Integer,  -- n
  *    publicExponent    Integer   -- e
  * }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} utcTimeName Name for "utcTimeName" choice
   * @property {string} generalTimeName Name for "generalTimeName" choice
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Integer({ name: names.modulus || "" }), new asn1js.Integer({ name: names.publicExponent || "" })]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["modulus", "publicExponent"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, RSAPublicKey.schema({
			names: {
				modulus: "modulus",
				publicExponent: "publicExponent"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RSAPublicKey");
		//endregion

		//region Get internal properties from parsed schema
		this.modulus = asn1.result.modulus.convertFromDER(256);
		this.publicExponent = asn1.result.publicExponent;
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
			value: [this.modulus.convertToDER(), this.publicExponent]
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
			n: (0, _pvutils.toBase64)((0, _pvutils.arrayBufferToString)(this.modulus.valueBlock.valueHex), true, true, true),
			e: (0, _pvutils.toBase64)((0, _pvutils.arrayBufferToString)(this.publicExponent.valueBlock.valueHex), true, true, true)
		};
	}
	//**********************************************************************************
	/**
  * Convert JSON value into current object
  * @param {Object} json
  */
	fromJSON(json) {
		if ("n" in json) {
			const array = (0, _pvutils.stringToArrayBuffer)((0, _pvutils.fromBase64)(json.n, true));
			this.modulus = new asn1js.Integer({ valueHex: array.slice(0, Math.pow(2, (0, _pvutils.nearestPowerOf2)(array.byteLength))) });
		} else throw new Error("Absent mandatory parameter \"n\"");

		if ("e" in json) this.publicExponent = new asn1js.Integer({ valueHex: (0, _pvutils.stringToArrayBuffer)((0, _pvutils.fromBase64)(json.e, true)).slice(0, 3) });else throw new Error("Absent mandatory parameter \"e\"");
	}
	//**********************************************************************************
}
exports.default = RSAPublicKey; //**************************************************************************************
//# sourceMappingURL=RSAPublicKey.js.map