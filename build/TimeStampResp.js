"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _PKIStatusInfo = require("./PKIStatusInfo.js");

var _PKIStatusInfo2 = _interopRequireDefault(_PKIStatusInfo);

var _ContentInfo = require("./ContentInfo.js");

var _ContentInfo2 = _interopRequireDefault(_ContentInfo);

var _SignedData = require("./SignedData.js");

var _SignedData2 = _interopRequireDefault(_SignedData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC3161
 */
class TimeStampResp {
	//**********************************************************************************
	/**
  * Constructor for TimeStampResp class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {PKIStatusInfo}
   * @desc status
   */
		this.status = (0, _pvutils.getParametersValue)(parameters, "status", TimeStampResp.defaultValues("status"));

		if ("timeStampToken" in parameters)
			/**
    * @type {ContentInfo}
    * @desc timeStampToken
    */
			this.timeStampToken = (0, _pvutils.getParametersValue)(parameters, "timeStampToken", TimeStampResp.defaultValues("timeStampToken"));
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
			case "status":
				return new _PKIStatusInfo2.default();
			case "timeStampToken":
				return new _ContentInfo2.default();
			default:
				throw new Error(`Invalid member name for TimeStampResp class: ${memberName}`);
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
			case "status":
				return _PKIStatusInfo2.default.compareWithDefault("status", memberValue.status) && "statusStrings" in memberValue === false && "failInfo" in memberValue === false;
			case "timeStampToken":
				return memberValue.contentType === "" && memberValue.content instanceof asn1js.Any;
			default:
				throw new Error(`Invalid member name for TimeStampResp class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * TimeStampResp ::= SEQUENCE  {
  *    status                  PKIStatusInfo,
  *    timeStampToken          TimeStampToken     OPTIONAL  }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [status]
   * @property {string} [timeStampToken]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "TimeStampResp",
			value: [_PKIStatusInfo2.default.schema(names.status || {
				names: {
					blockName: "TimeStampResp.status"
				}
			}), _ContentInfo2.default.schema(names.timeStampToken || {
				names: {
					blockName: "TimeStampResp.timeStampToken",
					optional: true
				}
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
		(0, _pvutils.clearProps)(schema, ["TimeStampResp.status", "TimeStampResp.timeStampToken"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, TimeStampResp.schema());

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for TimeStampResp");
		//endregion

		//region Get internal properties from parsed schema
		this.status = new _PKIStatusInfo2.default({ schema: asn1.result["TimeStampResp.status"] });
		if ("TimeStampResp.timeStampToken" in asn1.result) this.timeStampToken = new _ContentInfo2.default({ schema: asn1.result["TimeStampResp.timeStampToken"] });
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

		outputArray.push(this.status.toSchema());
		if ("timeStampToken" in this) outputArray.push(this.timeStampToken.toSchema());
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
			status: this.status
		};

		if ("timeStampToken" in this) _object.timeStampToken = this.timeStampToken.toJSON();

		return _object;
	}
	//**********************************************************************************
	/**
  * Sign current TSP Response
  * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
  * @param {string} [hashAlgorithm] Hashing algorithm. Default SHA-1
  * @returns {Promise}
  */
	sign(privateKey, hashAlgorithm) {
		//region Check that "timeStampToken" exists
		if ("timeStampToken" in this === false) return Promise.reject("timeStampToken is absent in TSP response");
		//endregion

		//region Check that "timeStampToken" has a right internal format
		if (this.timeStampToken.contentType !== "1.2.840.113549.1.7.2") // Must be a CMS signed data
			return Promise.reject(`Wrong format of timeStampToken: ${this.timeStampToken.contentType}`);
		//endregion

		//region Sign internal signed data value
		const signed = new _ContentInfo2.default({ schema: this.timeStampToken.content });

		return signed.sign(privateKey, 0, hashAlgorithm);
		//endregion
	}
	//**********************************************************************************
	/**
  * Verify current TSP Response
  * @param {Object} verificationParameters Input parameters for verification
  * @returns {Promise}
  */
	verify(verificationParameters = { signer: 0, trustedCerts: [], data: new ArrayBuffer(0) }) {
		//region Check that "timeStampToken" exists
		if ("timeStampToken" in this === false) return Promise.reject("timeStampToken is absent in TSP response");
		//endregion

		//region Check that "timeStampToken" has a right internal format
		if (this.timeStampToken.contentType !== "1.2.840.113549.1.7.2") // Must be a CMS signed data
			return Promise.reject(`Wrong format of timeStampToken: ${this.timeStampToken.contentType}`);
		//endregion

		//region Verify internal signed data value
		const signed = new _SignedData2.default({ schema: this.timeStampToken.content });

		return signed.verify(verificationParameters);
		//endregion
	}
	//**********************************************************************************
}
exports.default = TimeStampResp; //**************************************************************************************
//# sourceMappingURL=TimeStampResp.js.map