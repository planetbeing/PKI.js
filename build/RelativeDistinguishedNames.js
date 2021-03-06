"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _AttributeTypeAndValue = require("./AttributeTypeAndValue.js");

var _AttributeTypeAndValue2 = _interopRequireDefault(_AttributeTypeAndValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5280
 */
class RelativeDistinguishedNames {
	//**********************************************************************************
	/**
  * Constructor for RelativeDistinguishedNames class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  * @property {Array.<AttributeTypeAndValue>} [typesAndValues] Array of "type and value" objects
  * @property {ArrayBuffer} [valueBeforeDecode] Value of the RDN before decoding from schema
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {Array.<AttributeTypeAndValue>}
   * @desc Array of "type and value" objects
   */
		this.typesAndValues = (0, _pvutils.getParametersValue)(parameters, "typesAndValues", RelativeDistinguishedNames.defaultValues("typesAndValues"));
		/**
   * @type {ArrayBuffer}
   * @desc Value of the RDN before decoding from schema
   */
		this.valueBeforeDecode = (0, _pvutils.getParametersValue)(parameters, "valueBeforeDecode", RelativeDistinguishedNames.defaultValues("valueBeforeDecode"));
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
			case "typesAndValues":
				return [];
			case "valueBeforeDecode":
				return new ArrayBuffer(0);
			default:
				throw new Error(`Invalid member name for RelativeDistinguishedNames class: ${memberName}`);
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
			case "typesAndValues":
				return memberValue.length === 0;
			case "valueBeforeDecode":
				return memberValue.byteLength === 0;
			default:
				throw new Error(`Invalid member name for RelativeDistinguishedNames class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * RDNSequence ::= Sequence OF RelativeDistinguishedName
  *
  * RelativeDistinguishedName ::=
  * SET SIZE (1..MAX) OF AttributeTypeAndValue
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName] Name for entire block
   * @property {string} [repeatedSequence] Name for "repeatedSequence" block
   * @property {string} [repeatedSet] Name for "repeatedSet" block
   * @property {string} [typeAndValue] Name for "typeAndValue" block
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Repeated({
				name: names.repeatedSequence || "",
				value: new asn1js.Set({
					value: [new asn1js.Repeated({
						name: names.repeatedSet || "",
						value: _AttributeTypeAndValue2.default.schema(names.typeAndValue || {})
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
		(0, _pvutils.clearProps)(schema, ["RDN", "typesAndValues"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, RelativeDistinguishedNames.schema({
			names: {
				blockName: "RDN",
				repeatedSet: "typesAndValues"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RelativeDistinguishedNames");
		//endregion

		//region Get internal properties from parsed schema
		if ("typesAndValues" in asn1.result) // Could be a case when there is no "types and values"
			this.typesAndValues = Array.from(asn1.result.typesAndValues, element => new _AttributeTypeAndValue2.default({ schema: element }));

		// noinspection JSUnresolvedVariable
		this.valueBeforeDecode = asn1.result.RDN.valueBeforeDecode;
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		//region Decode stored TBS value
		if (this.valueBeforeDecode.byteLength === 0) // No stored encoded array, create "from scratch"
			{
				return new asn1js.Sequence({
					value: [new asn1js.Set({
						value: Array.from(this.typesAndValues, element => element.toSchema())
					})]
				});
			}

		const asn1 = asn1js.fromBER(this.valueBeforeDecode);
		//endregion

		//region Construct and return new ASN.1 schema for this object
		return asn1.result;
		//endregion
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		return {
			typesAndValues: Array.from(this.typesAndValues, element => element.toJSON())
		};
	}
	//**********************************************************************************
	/**
  * Compare two RDN values, or RDN with ArrayBuffer value
  * @param {(RelativeDistinguishedNames|ArrayBuffer)} compareTo The value compare to current
  * @returns {boolean}
  */
	isEqual(compareTo) {
		if (compareTo instanceof RelativeDistinguishedNames) {
			if (this.typesAndValues.length !== compareTo.typesAndValues.length) return false;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.typesAndValues.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					const _ref = _step.value;

					var _ref2 = _slicedToArray(_ref, 2);

					const index = _ref2[0];
					const typeAndValue = _ref2[1];

					if (typeAndValue.isEqual(compareTo.typesAndValues[index]) === false) return false;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return true;
		}

		if (compareTo instanceof ArrayBuffer) return (0, _pvutils.isEqualBuffer)(this.valueBeforeDecode, compareTo);

		return false;
	}
	//**********************************************************************************
}
exports.default = RelativeDistinguishedNames; //**************************************************************************************
//# sourceMappingURL=RelativeDistinguishedNames.js.map