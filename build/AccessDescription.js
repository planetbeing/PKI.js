"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _GeneralName = require("./GeneralName.js");

var _GeneralName2 = _interopRequireDefault(_GeneralName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5280
 */
class AccessDescription {
	//**********************************************************************************
	/**
  * Constructor for AccessDescription class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {string}
   * @desc The type and format of the information are specified by the accessMethod field. This profile defines two accessMethod OIDs: id-ad-caIssuers and id-ad-ocsp
   */
		this.accessMethod = (0, _pvutils.getParametersValue)(parameters, "accessMethod", AccessDescription.defaultValues("accessMethod"));
		/**
   * @type {GeneralName}
   * @desc The accessLocation field specifies the location of the information
   */
		this.accessLocation = (0, _pvutils.getParametersValue)(parameters, "accessLocation", AccessDescription.defaultValues("accessLocation"));
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
			case "accessMethod":
				return "";
			case "accessLocation":
				return new _GeneralName2.default();
			default:
				throw new Error(`Invalid member name for AccessDescription class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * AccessDescription  ::=  SEQUENCE {
  *    accessMethod          OBJECT IDENTIFIER,
  *    accessLocation        GeneralName  }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [accessMethod]
   * @property {string} [accessLocation]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.ObjectIdentifier({ name: names.accessMethod || "" }), _GeneralName2.default.schema(names.accessLocation || {})]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["accessMethod", "accessLocation"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, AccessDescription.schema({
			names: {
				accessMethod: "accessMethod",
				accessLocation: {
					names: {
						blockName: "accessLocation"
					}
				}
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AccessDescription");
		//endregion

		//region Get internal properties from parsed schema
		this.accessMethod = asn1.result.accessMethod.valueBlock.toString();
		this.accessLocation = new _GeneralName2.default({ schema: asn1.result.accessLocation });
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
			value: [new asn1js.ObjectIdentifier({ value: this.accessMethod }), this.accessLocation.toSchema()]
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
			accessMethod: this.accessMethod,
			accessLocation: this.accessLocation.toJSON()
		};
	}
	//**********************************************************************************
}
exports.default = AccessDescription; //**************************************************************************************
//# sourceMappingURL=AccessDescription.js.map