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
 * Class from RFC4055
 */
class RSASSAPSSParams {
	//**********************************************************************************
	/**
  * Constructor for RSASSAPSSParams class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {AlgorithmIdentifier}
   * @desc Algorithms of hashing (DEFAULT sha1)
   */
		this.hashAlgorithm = (0, _pvutils.getParametersValue)(parameters, "hashAlgorithm", RSASSAPSSParams.defaultValues("hashAlgorithm"));
		/**
   * @type {AlgorithmIdentifier}
   * @desc Algorithm of "mask generaion function (MGF)" (DEFAULT mgf1SHA1)
   */
		this.maskGenAlgorithm = (0, _pvutils.getParametersValue)(parameters, "maskGenAlgorithm", RSASSAPSSParams.defaultValues("maskGenAlgorithm"));
		/**
   * @type {number}
   * @desc Salt length (DEFAULT 20)
   */
		this.saltLength = (0, _pvutils.getParametersValue)(parameters, "saltLength", RSASSAPSSParams.defaultValues("saltLength"));
		/**
   * @type {number}
   * @desc (DEFAULT 1)
   */
		this.trailerField = (0, _pvutils.getParametersValue)(parameters, "trailerField", RSASSAPSSParams.defaultValues("trailerField"));
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
			case "saltLength":
				return 20;
			case "trailerField":
				return 1;
			default:
				throw new Error(`Invalid member name for RSASSAPSSParams class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * RSASSA-PSS-params  ::=  Sequence  {
  *    hashAlgorithm      [0] HashAlgorithm DEFAULT sha1Identifier,
  *    maskGenAlgorithm   [1] MaskGenAlgorithm DEFAULT mgf1SHA1Identifier,
  *    saltLength         [2] Integer DEFAULT 20,
  *    trailerField       [3] Integer DEFAULT 1  }
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
   * @property {string} [saltLength]
   * @property {string} [trailerField]
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
				value: [new asn1js.Integer({ name: names.saltLength || "" })]
			}), new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 3 // [3]
				},
				optional: true,
				value: [new asn1js.Integer({ name: names.trailerField || "" })]
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
		(0, _pvutils.clearProps)(schema, ["hashAlgorithm", "maskGenAlgorithm", "saltLength", "trailerField"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, RSASSAPSSParams.schema({
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
				saltLength: "saltLength",
				trailerField: "trailerField"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RSASSAPSSParams");
		//endregion

		//region Get internal properties from parsed schema
		if ("hashAlgorithm" in asn1.result) this.hashAlgorithm = new _AlgorithmIdentifier2.default({ schema: asn1.result.hashAlgorithm });

		if ("maskGenAlgorithm" in asn1.result) this.maskGenAlgorithm = new _AlgorithmIdentifier2.default({ schema: asn1.result.maskGenAlgorithm });

		if ("saltLength" in asn1.result) this.saltLength = asn1.result.saltLength.valueBlock.valueDec;

		if ("trailerField" in asn1.result) this.trailerField = asn1.result.trailerField.valueBlock.valueDec;
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

		if (!this.hashAlgorithm.isEqual(RSASSAPSSParams.defaultValues("hashAlgorithm"))) {
			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [this.hashAlgorithm.toSchema()]
			}));
		}

		if (!this.maskGenAlgorithm.isEqual(RSASSAPSSParams.defaultValues("maskGenAlgorithm"))) {
			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: [this.maskGenAlgorithm.toSchema()]
			}));
		}

		if (this.saltLength !== RSASSAPSSParams.defaultValues("saltLength")) {
			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				value: [new asn1js.Integer({ value: this.saltLength })]
			}));
		}

		if (this.trailerField !== RSASSAPSSParams.defaultValues("trailerField")) {
			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 3 // [3]
				},
				value: [new asn1js.Integer({ value: this.trailerField })]
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

		if (!this.hashAlgorithm.isEqual(RSASSAPSSParams.defaultValues("hashAlgorithm"))) object.hashAlgorithm = this.hashAlgorithm.toJSON();

		if (!this.maskGenAlgorithm.isEqual(RSASSAPSSParams.defaultValues("maskGenAlgorithm"))) object.maskGenAlgorithm = this.maskGenAlgorithm.toJSON();

		if (this.saltLength !== RSASSAPSSParams.defaultValues("saltLength")) object.saltLength = this.saltLength;

		if (this.trailerField !== RSASSAPSSParams.defaultValues("trailerField")) object.trailerField = this.trailerField;

		return object;
	}
	//**********************************************************************************
}
exports.default = RSASSAPSSParams; //**************************************************************************************
//# sourceMappingURL=RSASSAPSSParams.js.map