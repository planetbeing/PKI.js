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
 * Class from RFC6318
 */
class ECCCMSSharedInfo {
	//**********************************************************************************
	/**
  * Constructor for ECCCMSSharedInfo class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {AlgorithmIdentifier}
   * @desc keyInfo
   */
		this.keyInfo = (0, _pvutils.getParametersValue)(parameters, "keyInfo", ECCCMSSharedInfo.defaultValues("keyInfo"));

		if ("entityUInfo" in parameters)
			/**
    * @type {OctetString}
    * @desc entityUInfo
    */
			this.entityUInfo = (0, _pvutils.getParametersValue)(parameters, "entityUInfo", ECCCMSSharedInfo.defaultValues("entityUInfo"));

		/**
   * @type {OctetString}
   * @desc suppPubInfo
   */
		this.suppPubInfo = (0, _pvutils.getParametersValue)(parameters, "suppPubInfo", ECCCMSSharedInfo.defaultValues("suppPubInfo"));
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
			case "keyInfo":
				return new _AlgorithmIdentifier2.default();
			case "entityUInfo":
				return new asn1js.OctetString();
			case "suppPubInfo":
				return new asn1js.OctetString();
			default:
				throw new Error(`Invalid member name for ECCCMSSharedInfo class: ${memberName}`);
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
			case "keyInfo":
			case "entityUInfo":
			case "suppPubInfo":
				return memberValue.isEqual(ECCCMSSharedInfo.defaultValues(memberName));
			default:
				throw new Error(`Invalid member name for ECCCMSSharedInfo class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * ECC-CMS-SharedInfo  ::=  SEQUENCE {
  *    keyInfo      AlgorithmIdentifier,
  *    entityUInfo  [0] EXPLICIT OCTET STRING OPTIONAL,
  *    suppPubInfo  [2] EXPLICIT OCTET STRING }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [keyInfo]
   * @property {string} [entityUInfo]
   * @property {string} [suppPubInfo]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [_AlgorithmIdentifier2.default.schema(names.keyInfo || {}), new asn1js.Constructed({
				name: names.entityUInfo || "",
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				optional: true,
				value: [new asn1js.OctetString()]
			}), new asn1js.Constructed({
				name: names.suppPubInfo || "",
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				value: [new asn1js.OctetString()]
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
		(0, _pvutils.clearProps)(schema, ["keyInfo", "entityUInfo", "suppPubInfo"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, ECCCMSSharedInfo.schema({
			names: {
				keyInfo: {
					names: {
						blockName: "keyInfo"
					}
				},
				entityUInfo: "entityUInfo",
				suppPubInfo: "suppPubInfo"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for ECCCMSSharedInfo");
		//endregion

		//region Get internal properties from parsed schema
		this.keyInfo = new _AlgorithmIdentifier2.default({ schema: asn1.result.keyInfo });

		if ("entityUInfo" in asn1.result) this.entityUInfo = asn1.result.entityUInfo.valueBlock.value[0];

		this.suppPubInfo = asn1.result.suppPubInfo.valueBlock.value[0];
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		//region Create output array for sequence 
		const outputArray = [];

		outputArray.push(this.keyInfo.toSchema());

		if ("entityUInfo" in this) {
			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [this.entityUInfo]
			}));
		}

		outputArray.push(new asn1js.Constructed({
			idBlock: {
				tagClass: 3, // CONTEXT-SPECIFIC
				tagNumber: 2 // [2]
			},
			value: [this.suppPubInfo]
		}));
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
		const _object = {
			keyInfo: this.keyInfo.toJSON()
		};

		if ("entityUInfo" in this) _object.entityUInfo = this.entityUInfo.toJSON();

		_object.suppPubInfo = this.suppPubInfo.toJSON();

		return _object;
	}
	//**********************************************************************************
}
exports.default = ECCCMSSharedInfo; //**************************************************************************************
//# sourceMappingURL=ECCCMSSharedInfo.js.map