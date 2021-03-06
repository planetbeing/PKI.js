"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _DigestInfo = require("./DigestInfo.js");

var _DigestInfo2 = _interopRequireDefault(_DigestInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC7292
 */
class MacData {
	//**********************************************************************************
	/**
  * Constructor for MacData class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {DigestInfo}
   * @desc mac
   */
		this.mac = (0, _pvutils.getParametersValue)(parameters, "mac", MacData.defaultValues("mac"));
		/**
   * @type {OctetString}
   * @desc macSalt
   */
		this.macSalt = (0, _pvutils.getParametersValue)(parameters, "macSalt", MacData.defaultValues("macSalt"));

		if ("iterations" in parameters)
			/**
    * @type {number}
    * @desc iterations
    */
			this.iterations = (0, _pvutils.getParametersValue)(parameters, "iterations", MacData.defaultValues("iterations"));
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
			case "mac":
				return new _DigestInfo2.default();
			case "macSalt":
				return new asn1js.OctetString();
			case "iterations":
				return 1;
			default:
				throw new Error(`Invalid member name for MacData class: ${memberName}`);
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
			case "mac":
				return _DigestInfo2.default.compareWithDefault("digestAlgorithm", memberValue.digestAlgorithm) && _DigestInfo2.default.compareWithDefault("digest", memberValue.digest);
			case "macSalt":
				return memberValue.isEqual(MacData.defaultValues(memberName));
			case "iterations":
				return memberValue === MacData.defaultValues(memberName);
			default:
				throw new Error(`Invalid member name for MacData class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * MacData ::= SEQUENCE {
  *    mac 		DigestInfo,
  *    macSalt       OCTET STRING,
  *    iterations	INTEGER DEFAULT 1
  *    -- Note: The default is for historical reasons and its use is
  *    -- deprecated. A higher value, like 1024 is recommended.
  *    }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {

		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [optional]
   * @property {string} [mac]
   * @property {string} [macSalt]
   * @property {string} [iterations]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			optional: names.optional || true,
			value: [_DigestInfo2.default.schema(names.mac || {
				names: {
					blockName: "mac"
				}
			}), new asn1js.OctetString({ name: names.macSalt || "macSalt" }), new asn1js.Integer({
				optional: true,
				name: names.iterations || "iterations"
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
		(0, _pvutils.clearProps)(schema, ["mac", "macSalt", "iterations"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, MacData.schema({
			names: {
				mac: {
					names: {
						blockName: "mac"
					}
				},
				macSalt: "macSalt",
				iterations: "iterations"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for MacData");
		//endregion

		//region Get internal properties from parsed schema
		this.mac = new _DigestInfo2.default({ schema: asn1.result.mac });
		this.macSalt = asn1.result.macSalt;

		if ("iterations" in asn1.result) this.iterations = asn1.result.iterations.valueBlock.valueDec;
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		//region Construct and return new ASN.1 schema for this object
		const outputArray = [this.mac.toSchema(), this.macSalt];

		if ("iterations" in this) outputArray.push(new asn1js.Integer({ value: this.iterations }));

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
		const output = {
			mac: this.mac.toJSON(),
			macSalt: this.macSalt.toJSON()
		};

		if ("iterations" in this) output.iterations = this.iterations.toJSON();

		return output;
	}
	//**********************************************************************************
}
exports.default = MacData; //**************************************************************************************
//# sourceMappingURL=MacData.js.map