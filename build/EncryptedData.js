"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _EncryptedContentInfo = require("./EncryptedContentInfo.js");

var _EncryptedContentInfo2 = _interopRequireDefault(_EncryptedContentInfo);

var _Attribute = require("./Attribute.js");

var _Attribute2 = _interopRequireDefault(_Attribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5652
 */
class EncryptedData {
	//**********************************************************************************
	/**
  * Constructor for EncryptedData class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {number}
   * @desc version
   */
		this.version = (0, _pvutils.getParametersValue)(parameters, "version", EncryptedData.defaultValues("version"));
		/**
   * @type {EncryptedContentInfo}
   * @desc encryptedContentInfo
   */
		this.encryptedContentInfo = (0, _pvutils.getParametersValue)(parameters, "encryptedContentInfo", EncryptedData.defaultValues("encryptedContentInfo"));

		if ("unprotectedAttrs" in parameters)
			/**
    * @type {Array.<Attribute>}
    * @desc unprotectedAttrs
    */
			this.unprotectedAttrs = (0, _pvutils.getParametersValue)(parameters, "unprotectedAttrs", EncryptedData.defaultValues("unprotectedAttrs"));
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
			case "version":
				return 0;
			case "encryptedContentInfo":
				return new _EncryptedContentInfo2.default();
			case "unprotectedAttrs":
				return [];
			default:
				throw new Error(`Invalid member name for EncryptedData class: ${memberName}`);
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
			case "version":
				return memberValue === 0;
			case "encryptedContentInfo":
				return _EncryptedContentInfo2.default.compareWithDefault("contentType", memberValue.contentType) && _EncryptedContentInfo2.default.compareWithDefault("contentEncryptionAlgorithm", memberValue.contentEncryptionAlgorithm) && _EncryptedContentInfo2.default.compareWithDefault("encryptedContent", memberValue.encryptedContent);
			case "unprotectedAttrs":
				return memberValue.length === 0;
			default:
				throw new Error(`Invalid member name for EncryptedData class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * EncryptedData ::= SEQUENCE {
  *    version CMSVersion,
  *    encryptedContentInfo EncryptedContentInfo,
  *    unprotectedAttrs [1] IMPLICIT UnprotectedAttributes OPTIONAL }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [version]
   * @property {string} [encryptedContentInfo]
   * @property {string} [unprotectedAttrs]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Integer({ name: names.version || "" }), _EncryptedContentInfo2.default.schema(names.encryptedContentInfo || {}), new asn1js.Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: [new asn1js.Repeated({
					name: names.unprotectedAttrs || "",
					value: _Attribute2.default.schema()
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
		(0, _pvutils.clearProps)(schema, ["version", "encryptedContentInfo", "unprotectedAttrs"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, EncryptedData.schema({
			names: {
				version: "version",
				encryptedContentInfo: {
					names: {
						blockName: "encryptedContentInfo"
					}
				},
				unprotectedAttrs: "unprotectedAttrs"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for EncryptedData");
		//endregion

		//region Get internal properties from parsed schema
		this.version = asn1.result.version.valueBlock.valueDec;
		this.encryptedContentInfo = new _EncryptedContentInfo2.default({ schema: asn1.result.encryptedContentInfo });

		if ("unprotectedAttrs" in asn1.result) this.unprotectedAttrs = Array.from(asn1.result.unprotectedAttrs, element => new _Attribute2.default({ schema: element }));
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

		outputArray.push(new asn1js.Integer({ value: this.version }));
		outputArray.push(this.encryptedContentInfo.toSchema());

		if ("unprotectedAttrs" in this) {
			outputArray.push(new asn1js.Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: Array.from(this.unprotectedAttrs, element => element.toSchema())
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
		const _object = {
			version: this.version,
			encryptedContentInfo: this.encryptedContentInfo.toJSON()
		};

		if ("unprotectedAttrs" in this) _object.unprotectedAttrs = Array.from(this.unprotectedAttrs, element => element.toJSON());

		return _object;
	}
	//**********************************************************************************
	/**
  * Create a new CMS Encrypted Data content
  * @param {Object} parameters Parameters neccessary for encryption
  * @returns {Promise}
  */
	encrypt(parameters) {
		//region Check for input parameters
		if (parameters instanceof Object === false) return Promise.reject("Parameters must have type \"Object\"");
		//endregion

		//region Get cryptographic engine
		const engine = (0, _common.getEngine)();
		if (typeof engine === "undefined") return Promise.reject("Unable to initialize cryptographic engine");
		//endregion

		//region Set "contentType" parameter
		parameters.contentType = "1.2.840.113549.1.7.1"; // "data"
		//endregion

		if ("encryptEncryptedContentInfo" in engine.subtle) {
			return engine.subtle.encryptEncryptedContentInfo(parameters).then(result => {
				this.encryptedContentInfo = result;
			});
		}

		return Promise.reject(`No support for "encryptEncryptedContentInfo" in current crypto engine ${engine.name}`);
	}
	//**********************************************************************************
	/**
  * Create a new CMS Encrypted Data content
  * @param {Object} parameters Parameters neccessary for encryption
  */
	decrypt(parameters) {
		//region Check for input parameters
		if (parameters instanceof Object === false) return Promise.reject("Parameters must have type \"Object\"");
		//endregion

		//region Get cryptographic engine
		const engine = (0, _common.getEngine)();
		if (typeof engine === "undefined") return Promise.reject("Unable to initialize cryptographic engine");
		//endregion

		//region Set "encryptedContentInfo" value
		parameters.encryptedContentInfo = this.encryptedContentInfo;
		//endregion

		if ("decryptEncryptedContentInfo" in engine.subtle) return engine.subtle.decryptEncryptedContentInfo(parameters);

		return Promise.reject(`No support for "decryptEncryptedContentInfo" in current crypto engine ${engine.name}`);
	}
	//**********************************************************************************
}
exports.default = EncryptedData; //**************************************************************************************
//# sourceMappingURL=EncryptedData.js.map