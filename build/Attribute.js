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
 * Class from RFC2986
 */
class Attribute {
	//**********************************************************************************
	/**
  * Constructor for Attribute class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {string}
   * @desc ObjectIdentifier for attribute (string representation)
   */
		this.type = (0, _pvutils.getParametersValue)(parameters, "type", Attribute.defaultValues("type"));
		/**
   * @type {Array}
   * @desc Any attribute values
   */
		this.values = (0, _pvutils.getParametersValue)(parameters, "values", Attribute.defaultValues("values"));
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
			case "type":
				return "";
			case "values":
				return [];
			default:
				throw new Error(`Invalid member name for Attribute class: ${memberName}`);
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
			case "type":
				return memberValue === "";
			case "values":
				return memberValue.length === 0;
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
  * Attribute { ATTRIBUTE:IOSet } ::= SEQUENCE {
  *    type   ATTRIBUTE.&id({IOSet}),
  *    values SET SIZE(1..MAX) OF ATTRIBUTE.&Type({IOSet}{@type})
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
   * @property {string} [type]
   * @property {string} [setName]
   * @property {string} [values]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.ObjectIdentifier({ name: names.type || "" }), new asn1js.Set({
				name: names.setName || "",
				value: [new asn1js.Repeated({
					name: names.values || "",
					value: new asn1js.Any()
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
		(0, _pvutils.clearProps)(schema, ["type", "values"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, Attribute.schema({
			names: {
				type: "type",
				values: "values"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for Attribute");
		//endregion

		//region Get internal properties from parsed schema
		this.type = asn1.result.type.valueBlock.toString();
		this.values = asn1.result.values;
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
			value: [new asn1js.ObjectIdentifier({ value: this.type }), new asn1js.Set({
				value: this.values
			})]
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
			type: this.type,
			values: Array.from(this.values, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
exports.default = Attribute; //**************************************************************************************
//# sourceMappingURL=Attribute.js.map