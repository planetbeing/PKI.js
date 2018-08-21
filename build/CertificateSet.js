"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _Certificate = require("./Certificate.js");

var _Certificate2 = _interopRequireDefault(_Certificate);

var _AttributeCertificateV = require("./AttributeCertificateV1.js");

var _AttributeCertificateV2 = _interopRequireDefault(_AttributeCertificateV);

var _AttributeCertificateV3 = require("./AttributeCertificateV2.js");

var _AttributeCertificateV4 = _interopRequireDefault(_AttributeCertificateV3);

var _OtherCertificateFormat = require("./OtherCertificateFormat.js");

var _OtherCertificateFormat2 = _interopRequireDefault(_OtherCertificateFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5652
 */
class CertificateSet {
	//**********************************************************************************
	/**
  * Constructor for CertificateSet class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {Array}
   * @desc certificates
   */
		this.certificates = (0, _pvutils.getParametersValue)(parameters, "certificates", CertificateSet.defaultValues("certificates"));
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
			case "certificates":
				return [];
			default:
				throw new Error(`Invalid member name for Attribute class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * CertificateSet ::= SET OF CertificateChoices
  *
  * CertificateChoices ::= CHOICE {
  *    certificate Certificate,
  *    extendedCertificate [0] IMPLICIT ExtendedCertificate,  -- Obsolete
  *    v1AttrCert [1] IMPLICIT AttributeCertificateV1,        -- Obsolete
  *    v2AttrCert [2] IMPLICIT AttributeCertificateV2,
  *    other [3] IMPLICIT OtherCertificateFormat }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Set({
			name: names.blockName || "",
			value: [new asn1js.Repeated({
				name: names.certificates || "certificates",
				value: new asn1js.Choice({
					value: [_Certificate2.default.schema(), new asn1js.Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [new asn1js.Any()]
					}), // JUST A STUB
					new asn1js.Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: _AttributeCertificateV2.default.schema().valueBlock.value
					}), new asn1js.Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						},
						value: _AttributeCertificateV4.default.schema().valueBlock.value
					}), new asn1js.Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 3 // [3]
						},
						value: _OtherCertificateFormat2.default.schema().valueBlock.value
					})]
				})
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
		(0, _pvutils.clearProps)(schema, ["certificates"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, CertificateSet.schema());

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for CertificateSet");
		//endregion

		//region Get internal properties from parsed schema
		this.certificates = Array.from(asn1.result.certificates, element => {
			const initialTagNumber = element.idBlock.tagNumber;

			if (element.idBlock.tagClass === 1) return new _Certificate2.default({ schema: element });

			//region Making "Sequence" from "Constructed" value
			const elementSequence = new asn1js.Sequence({
				value: element.valueBlock.value
			});
			//endregion

			switch (initialTagNumber) {
				case 1:
					return new _AttributeCertificateV2.default({ schema: elementSequence });
				case 2:
					return new _AttributeCertificateV4.default({ schema: elementSequence });
				case 3:
					return new _OtherCertificateFormat2.default({ schema: elementSequence });
				case 0:
				default:
			}

			return element;
		});
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		//region Construct and return new ASN.1 schema for this object
		return new asn1js.Set({
			value: Array.from(this.certificates, element => {
				switch (true) {
					case element instanceof _Certificate2.default:
						return element.toSchema();
					case element instanceof _AttributeCertificateV2.default:
						return new asn1js.Constructed({
							idBlock: {
								tagClass: 3,
								tagNumber: 1 // [1]
							},
							value: element.toSchema().valueBlock.value
						});
					case element instanceof _AttributeCertificateV4.default:
						return new asn1js.Constructed({
							idBlock: {
								tagClass: 3,
								tagNumber: 2 // [2]
							},
							value: element.toSchema().valueBlock.value
						});
					case element instanceof _OtherCertificateFormat2.default:
						return new asn1js.Constructed({
							idBlock: {
								tagClass: 3,
								tagNumber: 3 // [3]
							},
							value: element.toSchema().valueBlock.value
						});
					default:
				}

				return element;
			})
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
			certificates: Array.from(this.certificates, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
exports.default = CertificateSet; //**************************************************************************************
//# sourceMappingURL=CertificateSet.js.map