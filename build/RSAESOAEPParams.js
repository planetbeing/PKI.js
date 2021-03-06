"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _AlgorithmIdentifier = require("./AlgorithmIdentifier.js");

var _AlgorithmIdentifier2 = _interopRequireDefault(_AlgorithmIdentifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC3447
 */
class RSAESOAEPParams {
	//**********************************************************************************
	/**
  * Constructor for RSAESOAEPParams class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {AlgorithmIdentifier}
   * @desc hashAlgorithm
   */
		this.hashAlgorithm = (0, _pvutils.getParametersValue)(parameters, "hashAlgorithm", RSAESOAEPParams.defaultValues("hashAlgorithm"));
		/**
   * @type {AlgorithmIdentifier}
   * @desc maskGenAlgorithm
   */
		this.maskGenAlgorithm = (0, _pvutils.getParametersValue)(parameters, "maskGenAlgorithm", RSAESOAEPParams.defaultValues("maskGenAlgorithm"));
		/**
   * @type {AlgorithmIdentifier}
   * @desc pSourceAlgorithm
   */
		this.pSourceAlgorithm = (0, _pvutils.getParametersValue)(parameters, "pSourceAlgorithm", RSAESOAEPParams.defaultValues("pSourceAlgorithm"));
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
			case "hashAlgorithm":
				return new _AlgorithmIdentifier2.default({
					algorithmId: "1.3.14.3.2.26", // SHA-1
					algorithmParams: new asn1js.Null()
				});
			case "maskGenAlgorithm":
				return new _AlgorithmIdentifier2.default({
					algorithmId: "1.2.840.113549.1.1.8", // MGF1
					algorithmParams: new _AlgorithmIdentifier2.default({
						algorithmId: "1.3.14.3.2.26", // SHA-1
						algorithmParams: new asn1js.Null()
					}).toSchema()
				});
			case "pSourceAlgorithm":
				return new _AlgorithmIdentifier2.default({
					algorithmId: "1.2.840.113549.1.1.9", // id-pSpecified
					algorithmParams: new asn1js.OctetString({ valueHex: new Uint8Array([0xda, 0x39, 0xa3, 0xee, 0x5e, 0x6b, 0x4b, 0x0d, 0x32, 0x55, 0xbf, 0xef, 0x95, 0x60, 0x18, 0x90, 0xaf, 0xd8, 0x07, 0x09]).buffer }) // SHA-1 hash of empty string
				});
			default:
				throw new Error(`Invalid member name for RSAESOAEPParams class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * RSAES-OAEP-params ::= SEQUENCE {
  *    hashAlgorithm     [0] HashAlgorithm    DEFAULT sha1,
  *    maskGenAlgorithm  [1] MaskGenAlgorithm DEFAULT mgf1SHA1,
  *    pSourceAlgorithm  [2] PSourceAlgorithm DEFAULT pSpecifiedEmpty
  * }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [hashAlgorithm]
   * @property {string} [maskGenAlgorithm]
   * @property {string} [pSourceAlgorithm]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				optional: true,
				value: [_AlgorithmIdentifier2.default.schema(names.hashAlgorithm || {})]
			}), new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				optional: true,
				value: [_AlgorithmIdentifier2.default.schema(names.maskGenAlgorithm || {})]
			}), new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				optional: true,
				value: [_AlgorithmIdentifier2.default.schema(names.pSourceAlgorithm || {})]
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
		(0, _pvutils.clearProps)(schema, ["hashAlgorithm", "maskGenAlgorithm", "pSourceAlgorithm"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, RSAESOAEPParams.schema({
			names: {
				hashAlgorithm: {
					names: {
						blockName: "hashAlgorithm"
					}
				},
				maskGenAlgorithm: {
					names: {
						blockName: "maskGenAlgorithm"
					}
				},
				pSourceAlgorithm: {
					names: {
						blockName: "pSourceAlgorithm"
					}
				}
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RSAESOAEPParams");
		//endregion

		//region Get internal properties from parsed schema
		if ("hashAlgorithm" in asn1.result) this.hashAlgorithm = new _AlgorithmIdentifier2.default({ schema: asn1.result.hashAlgorithm });

		if ("maskGenAlgorithm" in asn1.result) this.maskGenAlgorithm = new _AlgorithmIdentifier2.default({ schema: asn1.result.maskGenAlgorithm });

		if ("pSourceAlgorithm" in asn1.result) this.pSourceAlgorithm = new _AlgorithmIdentifier2.default({ schema: asn1.result.pSourceAlgorithm });
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		//region Create array for output sequence
		const outputArray = [];

		if (!this.hashAlgorithm.isEqual(RSAESOAEPParams.defaultValues("hashAlgorithm"))) {
			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [this.hashAlgorithm.toSchema()]
			}));
		}

		if (!this.maskGenAlgorithm.isEqual(RSAESOAEPParams.defaultValues("maskGenAlgorithm"))) {
			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: [this.maskGenAlgorithm.toSchema()]
			}));
		}

		if (!this.pSourceAlgorithm.isEqual(RSAESOAEPParams.defaultValues("pSourceAlgorithm"))) {
			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				value: [this.pSourceAlgorithm.toSchema()]
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
		const object = {};

		if (!this.hashAlgorithm.isEqual(RSAESOAEPParams.defaultValues("hashAlgorithm"))) object.hashAlgorithm = this.hashAlgorithm.toJSON();

		if (!this.maskGenAlgorithm.isEqual(RSAESOAEPParams.defaultValues("maskGenAlgorithm"))) object.maskGenAlgorithm = this.maskGenAlgorithm.toJSON();

		if (!this.pSourceAlgorithm.isEqual(RSAESOAEPParams.defaultValues("pSourceAlgorithm"))) object.pSourceAlgorithm = this.pSourceAlgorithm.toJSON();

		return object;
	}
	//**********************************************************************************
}
exports.default = RSAESOAEPParams; //**************************************************************************************
//# sourceMappingURL=RSAESOAEPParams.js.map