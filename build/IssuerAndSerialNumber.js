"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _RelativeDistinguishedNames = require("./RelativeDistinguishedNames.js");

var _RelativeDistinguishedNames2 = _interopRequireDefault(_RelativeDistinguishedNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5652
 */
class IssuerAndSerialNumber {
	//**********************************************************************************
	/**
  * Constructor for IssuerAndSerialNumber class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {RelativeDistinguishedNames}
   * @desc issuer
   */
		this.issuer = (0, _pvutils.getParametersValue)(parameters, "issuer", IssuerAndSerialNumber.defaultValues("issuer"));
		/**
   * @type {Integer}
   * @desc serialNumber
   */
		this.serialNumber = (0, _pvutils.getParametersValue)(parameters, "serialNumber", IssuerAndSerialNumber.defaultValues("serialNumber"));
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
			case "issuer":
				return new _RelativeDistinguishedNames2.default();
			case "serialNumber":
				return new asn1js.Integer();
			default:
				throw new Error(`Invalid member name for IssuerAndSerialNumber class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * IssuerAndSerialNumber ::= SEQUENCE {
  *    issuer Name,
  *    serialNumber CertificateSerialNumber }
  *
  * CertificateSerialNumber ::= INTEGER
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [issuer]
   * @property {string} [serialNumber]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [_RelativeDistinguishedNames2.default.schema(names.issuer || {}), new asn1js.Integer({ name: names.serialNumber || "" })]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["issuer", "serialNumber"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, IssuerAndSerialNumber.schema({
			names: {
				issuer: {
					names: {
						blockName: "issuer"
					}
				},
				serialNumber: "serialNumber"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for IssuerAndSerialNumber");
		//endregion

		//region Get internal properties from parsed schema
		this.issuer = new _RelativeDistinguishedNames2.default({ schema: asn1.result.issuer });
		this.serialNumber = asn1.result.serialNumber;
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
			value: [this.issuer.toSchema(), this.serialNumber]
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
			issuer: this.issuer.toJSON(),
			serialNumber: this.serialNumber.toJSON()
		};
	}
	//**********************************************************************************
}
exports.default = IssuerAndSerialNumber; //**************************************************************************************
//# sourceMappingURL=IssuerAndSerialNumber.js.map