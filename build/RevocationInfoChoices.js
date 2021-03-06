"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _CertificateRevocationList = require("./CertificateRevocationList.js");

var _CertificateRevocationList2 = _interopRequireDefault(_CertificateRevocationList);

var _OtherRevocationInfoFormat = require("./OtherRevocationInfoFormat.js");

var _OtherRevocationInfoFormat2 = _interopRequireDefault(_OtherRevocationInfoFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5652
 */
class RevocationInfoChoices {
	//**********************************************************************************
	/**
  * Constructor for RevocationInfoChoices class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {Array.<CertificateRevocationList>}
   * @desc crls
   */
		this.crls = (0, _pvutils.getParametersValue)(parameters, "crls", RevocationInfoChoices.defaultValues("crls"));
		/**
   * @type {Array.<OtherRevocationInfoFormat>}
   * @desc otherRevocationInfos
   */
		this.otherRevocationInfos = (0, _pvutils.getParametersValue)(parameters, "otherRevocationInfos", RevocationInfoChoices.defaultValues("otherRevocationInfos"));
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
			case "crls":
				return [];
			case "otherRevocationInfos":
				return [];
			default:
				throw new Error(`Invalid member name for RevocationInfoChoices class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * RevocationInfoChoices ::= SET OF RevocationInfoChoice
  *
  * RevocationInfoChoice ::= CHOICE {
  *    crl CertificateList,
  *    other [1] IMPLICIT OtherRevocationInfoFormat }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [crls]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Set({
			name: names.blockName || "",
			value: [new asn1js.Repeated({
				name: names.crls || "",
				value: new asn1js.Choice({
					value: [_CertificateRevocationList2.default.schema(), new asn1js.Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: [new asn1js.ObjectIdentifier(), new asn1js.Any()]
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
		(0, _pvutils.clearProps)(schema, ["crls"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, RevocationInfoChoices.schema({
			names: {
				crls: "crls"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RevocationInfoChoices");
		//endregion

		//region Get internal properties from parsed schema
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = asn1.result.crls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				const element = _step.value;

				if (element.idBlock.tagClass === 1) this.crls.push(new _CertificateRevocationList2.default({ schema: element }));else this.otherRevocationInfos.push(new _OtherRevocationInfoFormat2.default({ schema: element }));
			}

			//endregion
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
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		//region Create array for output set
		const outputArray = [];

		outputArray.push(...Array.from(this.crls, element => element.toSchema()));

		outputArray.push(...Array.from(this.otherRevocationInfos, element => {
			const schema = element.toSchema();

			schema.idBlock.tagClass = 3;
			schema.idBlock.tagNumber = 1;

			return schema;
		}));
		//endregion

		//region Construct and return new ASN.1 schema for this object
		return new asn1js.Set({
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
		return {
			crls: Array.from(this.crls, element => element.toJSON()),
			otherRevocationInfos: Array.from(this.otherRevocationInfos, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
exports.default = RevocationInfoChoices; //**************************************************************************************
//# sourceMappingURL=RevocationInfoChoices.js.map