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
 * Class from RFC2898
 */
class PBES2Params {
	//**********************************************************************************
	/**
  * Constructor for PBES2Params class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {AlgorithmIdentifier}
   * @desc keyDerivationFunc
   */
		this.keyDerivationFunc = (0, _pvutils.getParametersValue)(parameters, "keyDerivationFunc", PBES2Params.defaultValues("keyDerivationFunc"));
		/**
   * @type {AlgorithmIdentifier}
   * @desc encryptionScheme
   */
		this.encryptionScheme = (0, _pvutils.getParametersValue)(parameters, "encryptionScheme", PBES2Params.defaultValues("encryptionScheme"));
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
			case "keyDerivationFunc":
				return new _AlgorithmIdentifier2.default();
			case "encryptionScheme":
				return new _AlgorithmIdentifier2.default();
			default:
				throw new Error(`Invalid member name for PBES2Params class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * PBES2-params ::= SEQUENCE {
  *    keyDerivationFunc AlgorithmIdentifier {{PBES2-KDFs}},
  *    encryptionScheme AlgorithmIdentifier {{PBES2-Encs}} }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [keyDerivationFunc]
   * @property {string} [encryptionScheme]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [_AlgorithmIdentifier2.default.schema(names.keyDerivationFunc || {}), _AlgorithmIdentifier2.default.schema(names.encryptionScheme || {})]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["keyDerivationFunc", "encryptionScheme"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, PBES2Params.schema({
			names: {
				keyDerivationFunc: {
					names: {
						blockName: "keyDerivationFunc"
					}
				},
				encryptionScheme: {
					names: {
						blockName: "encryptionScheme"
					}
				}
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PBES2Params");
		//endregion

		//region Get internal properties from parsed schema
		this.keyDerivationFunc = new _AlgorithmIdentifier2.default({ schema: asn1.result.keyDerivationFunc });
		this.encryptionScheme = new _AlgorithmIdentifier2.default({ schema: asn1.result.encryptionScheme });
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
			value: [this.keyDerivationFunc.toSchema(), this.encryptionScheme.toSchema()]
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
			keyDerivationFunc: this.keyDerivationFunc.toJSON(),
			encryptionScheme: this.encryptionScheme.toJSON()
		};
	}
	//**********************************************************************************
}
exports.default = PBES2Params; //**************************************************************************************
//# sourceMappingURL=PBES2Params.js.map