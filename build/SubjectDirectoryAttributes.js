"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _Attribute = require("./Attribute.js");

var _Attribute2 = _interopRequireDefault(_Attribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5280
 */
class SubjectDirectoryAttributes {
	//**********************************************************************************
	/**
  * Constructor for SubjectDirectoryAttributes class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {Array.<Attribute>}
   * @desc attributes
   */
		this.attributes = (0, _pvutils.getParametersValue)(parameters, "attributes", SubjectDirectoryAttributes.defaultValues("attributes"));
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
			case "attributes":
				return [];
			default:
				throw new Error(`Invalid member name for SubjectDirectoryAttributes class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * SubjectDirectoryAttributes ::= SEQUENCE SIZE (1..MAX) OF Attribute
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [utcTimeName] Name for "utcTimeName" choice
   * @property {string} [generalTimeName] Name for "generalTimeName" choice
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Repeated({
				name: names.attributes || "",
				value: _Attribute2.default.schema()
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
		(0, _pvutils.clearProps)(schema, ["attributes"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, SubjectDirectoryAttributes.schema({
			names: {
				attributes: "attributes"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for SubjectDirectoryAttributes");
		//endregion

		//region Get internal properties from parsed schema
		this.attributes = Array.from(asn1.result.attributes, element => new _Attribute2.default({ schema: element }));
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
			value: Array.from(this.attributes, element => element.toSchema())
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
			attributes: Array.from(this.attributes, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
exports.default = SubjectDirectoryAttributes; //**************************************************************************************
//# sourceMappingURL=SubjectDirectoryAttributes.js.map