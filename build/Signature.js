"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _AlgorithmIdentifier = require("./AlgorithmIdentifier.js");

var _AlgorithmIdentifier2 = _interopRequireDefault(_AlgorithmIdentifier);

var _Certificate = require("./Certificate.js");

var _Certificate2 = _interopRequireDefault(_Certificate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC6960
 */
class Signature {
	//**********************************************************************************
	/**
  * Constructor for Signature class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {AlgorithmIdentifier}
   * @desc signatureAlgorithm
   */
		this.signatureAlgorithm = (0, _pvutils.getParametersValue)(parameters, "signatureAlgorithm", Signature.defaultValues("signatureAlgorithm"));
		/**
   * @type {BitString}
   * @desc signature
   */
		this.signature = (0, _pvutils.getParametersValue)(parameters, "signature", Signature.defaultValues("signature"));

		if ("certs" in parameters)
			/**
    * @type {Array.<Certificate>}
    * @desc certs
    */
			this.certs = (0, _pvutils.getParametersValue)(parameters, "certs", Signature.defaultValues("certs"));
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
			case "signatureAlgorithm":
				return new _AlgorithmIdentifier2.default();
			case "signature":
				return new asn1js.BitString();
			case "certs":
				return [];
			default:
				throw new Error(`Invalid member name for Signature class: ${memberName}`);
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
			case "signatureAlgorithm":
				return memberValue.algorithmId === "" && "algorithmParams" in memberValue === false;
			case "signature":
				return memberValue.isEqual(Signature.defaultValues(memberName));
			case "certs":
				return memberValue.length === 0;
			default:
				throw new Error(`Invalid member name for Signature class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * Signature       ::=     SEQUENCE {
  *    signatureAlgorithm      AlgorithmIdentifier,
  *    signature               BIT STRING,
  *    certs               [0] EXPLICIT SEQUENCE OF Certificate OPTIONAL }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [signatureAlgorithm]
   * @property {string} [signature]
   * @property {string} [certs]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [_AlgorithmIdentifier2.default.schema(names.signatureAlgorithm || {}), new asn1js.BitString({ name: names.signature || "" }), new asn1js.Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [new asn1js.Sequence({
					value: [new asn1js.Repeated({
						name: names.certs || "",
						value: _Certificate2.default.schema(names.certs || {})
					})]
				})]
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
		(0, _pvutils.clearProps)(schema, ["signatureAlgorithm", "signature", "certs"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, Signature.schema({
			names: {
				signatureAlgorithm: {
					names: {
						blockName: "signatureAlgorithm"
					}
				},
				signature: "signature",
				certs: "certs"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for Signature");
		//endregion

		//region Get internal properties from parsed schema
		this.signatureAlgorithm = new _AlgorithmIdentifier2.default({ schema: asn1.result.signatureAlgorithm });
		this.signature = asn1.result.signature;

		if ("certs" in asn1.result) this.certs = Array.from(asn1.result.certs, element => new _Certificate2.default({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		//region Create array of output sequence
		const outputArray = [];

		outputArray.push(this.signatureAlgorithm.toSchema());
		outputArray.push(this.signature);

		if ("certs" in this) {
			outputArray.push(new asn1js.Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [new asn1js.Sequence({
					value: Array.from(this.certs, element => element.toSchema())
				})]
			}));
		}
		//endregion

		//region Construct and return new ASN.1 schema for this object
		return new asn1js.Sequence({
			value: outputArray
		});
		//endregion
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		const _object = {
			signatureAlgorithm: this.signatureAlgorithm.toJSON(),
			signature: this.signature.toJSON()
		};

		if ("certs" in this) _object.certs = Array.from(this.certs, element => element.toJSON());

		return _object;
	}
	//**********************************************************************************
}
exports.default = Signature; //**************************************************************************************
//# sourceMappingURL=Signature.js.map