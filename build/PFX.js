"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _ContentInfo = require("./ContentInfo.js");

var _ContentInfo2 = _interopRequireDefault(_ContentInfo);

var _MacData = require("./MacData.js");

var _MacData2 = _interopRequireDefault(_MacData);

var _DigestInfo = require("./DigestInfo.js");

var _DigestInfo2 = _interopRequireDefault(_DigestInfo);

var _AlgorithmIdentifier = require("./AlgorithmIdentifier.js");

var _AlgorithmIdentifier2 = _interopRequireDefault(_AlgorithmIdentifier);

var _SignedData = require("./SignedData.js");

var _SignedData2 = _interopRequireDefault(_SignedData);

var _EncapsulatedContentInfo = require("./EncapsulatedContentInfo.js");

var _EncapsulatedContentInfo2 = _interopRequireDefault(_EncapsulatedContentInfo);

var _Attribute = require("./Attribute.js");

var _Attribute2 = _interopRequireDefault(_Attribute);

var _SignerInfo = require("./SignerInfo.js");

var _SignerInfo2 = _interopRequireDefault(_SignerInfo);

var _IssuerAndSerialNumber = require("./IssuerAndSerialNumber.js");

var _IssuerAndSerialNumber2 = _interopRequireDefault(_IssuerAndSerialNumber);

var _SignedAndUnsignedAttributes = require("./SignedAndUnsignedAttributes.js");

var _SignedAndUnsignedAttributes2 = _interopRequireDefault(_SignedAndUnsignedAttributes);

var _AuthenticatedSafe = require("./AuthenticatedSafe.js");

var _AuthenticatedSafe2 = _interopRequireDefault(_AuthenticatedSafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC7292
 */
class PFX {
	//**********************************************************************************
	/**
  * Constructor for PFX class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {number}
   * @desc version
   */
		this.version = (0, _pvutils.getParametersValue)(parameters, "version", PFX.defaultValues("version"));
		/**
   * @type {ContentInfo}
   * @desc authSafe
   */
		this.authSafe = (0, _pvutils.getParametersValue)(parameters, "authSafe", PFX.defaultValues("authSafe"));

		if ("macData" in parameters)
			/**
    * @type {MacData}
    * @desc macData
    */
			this.macData = (0, _pvutils.getParametersValue)(parameters, "macData", PFX.defaultValues("macData"));

		if ("parsedValue" in parameters)
			/**
    * @type {*}
    * @desc parsedValue
    */
			this.parsedValue = (0, _pvutils.getParametersValue)(parameters, "parsedValue", PFX.defaultValues("parsedValue"));
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
				return 3;
			case "authSafe":
				return new _ContentInfo2.default();
			case "macData":
				return new _MacData2.default();
			case "parsedValue":
				return {};
			default:
				throw new Error(`Invalid member name for PFX class: ${memberName}`);
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
				return memberValue === PFX.defaultValues(memberName);
			case "authSafe":
				return _ContentInfo2.default.compareWithDefault("contentType", memberValue.contentType) && _ContentInfo2.default.compareWithDefault("content", memberValue.content);
			case "macData":
				return _MacData2.default.compareWithDefault("mac", memberValue.mac) && _MacData2.default.compareWithDefault("macSalt", memberValue.macSalt) && _MacData2.default.compareWithDefault("iterations", memberValue.iterations);
			case "parsedValue":
				return memberValue instanceof Object && Object.keys(memberValue).length === 0;
			default:
				throw new Error(`Invalid member name for PFX class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * PFX ::= SEQUENCE {
  *    version		INTEGER {v3(3)}(v3,...),
  *    authSafe	ContentInfo,
  *    macData    	MacData OPTIONAL
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
   * @property {string} [version]
   * @property {string} [authSafe]
   * @property {string} [macData]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Integer({ name: names.version || "version" }), _ContentInfo2.default.schema(names.authSafe || {
				names: {
					blockName: "authSafe"
				}
			}), _MacData2.default.schema(names.macData || {
				names: {
					blockName: "macData",
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
		(0, _pvutils.clearProps)(schema, ["version", "authSafe", "macData"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, PFX.schema({
			names: {
				version: "version",
				authSafe: {
					names: {
						blockName: "authSafe"
					}
				},
				macData: {
					names: {
						blockName: "macData"
					}
				}
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PFX");
		//endregion

		//region Get internal properties from parsed schema
		this.version = asn1.result.version.valueBlock.valueDec;
		this.authSafe = new _ContentInfo2.default({ schema: asn1.result.authSafe });

		if ("macData" in asn1.result) this.macData = new _MacData2.default({ schema: asn1.result.macData });
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		//region Construct and return new ASN.1 schema for this object
		const outputArray = [new asn1js.Integer({ value: this.version }), this.authSafe.toSchema()];

		if ("macData" in this) outputArray.push(this.macData.toSchema());

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
			version: this.version,
			authSafe: this.authSafe.toJSON()
		};

		if ("macData" in this) output.macData = this.macData.toJSON();

		return output;
	}
	//**********************************************************************************
	/**
  * Making ContentInfo from "parsedValue" object
  * @param {Object} parameters Parameters, specific to each "integrity mode"
  */
	makeInternalValues(parameters = {}) {
		//region Check mandatory parameter
		if (parameters instanceof Object === false) return Promise.reject("The \"parameters\" must has \"Object\" type");

		if ("parsedValue" in this === false) return Promise.reject("Please call \"parseValues\" function first in order to make \"parsedValue\" data");

		if ("integrityMode" in this.parsedValue === false) return Promise.reject("Absent mandatory parameter \"integrityMode\" inside \"parsedValue\"");
		//endregion

		//region Initial variables
		let sequence = Promise.resolve();
		//endregion

		//region Get a "crypto" extension
		const crypto = (0, _common.getCrypto)();
		if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object");
		//endregion

		//region Makes values for each particular integrity mode
		//region Check that we do have neccessary fields in "parsedValue" object
		if ("authenticatedSafe" in this.parsedValue === false) return Promise.reject("Absent mandatory parameter \"authenticatedSafe\" in \"parsedValue\"");
		//endregion

		switch (this.parsedValue.integrityMode) {
			//region HMAC-based integrity
			case 0:
				{
					//region Check additional mandatory parameters
					if ("iterations" in parameters === false) return Promise.reject("Absent mandatory parameter \"iterations\"");

					if ("pbkdf2HashAlgorithm" in parameters === false) return Promise.reject("Absent mandatory parameter \"pbkdf2HashAlgorithm\"");

					if ("hmacHashAlgorithm" in parameters === false) return Promise.reject("Absent mandatory parameter \"hmacHashAlgorithm\"");

					if ("password" in parameters === false) return Promise.reject("Absent mandatory parameter \"password\"");
					//endregion

					//region Initial variables
					const saltBuffer = new ArrayBuffer(64);
					const saltView = new Uint8Array(saltBuffer);

					(0, _common.getRandomValues)(saltView);

					const data = this.parsedValue.authenticatedSafe.toSchema().toBER(false);

					this.authSafe = new _ContentInfo2.default({
						contentType: "1.2.840.113549.1.7.1",
						content: new asn1js.OctetString({ valueHex: data })
					});
					//endregion

					//region Call current crypto engine for making HMAC-based data stamp
					const engine = (0, _common.getEngine)();

					if ("stampDataWithPassword" in engine.subtle === false) return Promise.reject(`No support for "stampDataWithPassword" in current engine "${engine.name}"`);

					sequence = sequence.then(() => engine.subtle.stampDataWithPassword({
						password: parameters.password,
						hashAlgorithm: parameters.hmacHashAlgorithm,
						salt: saltBuffer,
						iterationCount: parameters.iterations,
						contentToStamp: data
					}));
					//endregion

					//region Make "MacData" values
					sequence = sequence.then(result => {
						this.macData = new _MacData2.default({
							mac: new _DigestInfo2.default({
								digestAlgorithm: new _AlgorithmIdentifier2.default({
									algorithmId: (0, _common.getOIDByAlgorithm)({ name: parameters.hmacHashAlgorithm })
								}),
								digest: new asn1js.OctetString({ valueHex: result })
							}),
							macSalt: new asn1js.OctetString({ valueHex: saltBuffer }),
							iterations: parameters.iterations
						});
					}, error => Promise.reject(error));
					//endregion
					//endregion
				}
				break;
			//endregion
			//region publicKey-based integrity
			case 1:
				{
					//region Check additional mandatory parameters
					if ("signingCertificate" in parameters === false) return Promise.reject("Absent mandatory parameter \"signingCertificate\"");

					if ("privateKey" in parameters === false) return Promise.reject("Absent mandatory parameter \"privateKey\"");

					if ("hashAlgorithm" in parameters === false) return Promise.reject("Absent mandatory parameter \"hashAlgorithm\"");
					//endregion

					//region Making data to be signed
					// NOTE: all internal data for "authenticatedSafe" must be already prepared.
					// Thus user must call "makeValues" for all internal "SafeContent" value with appropriate parameters.
					// Or user can choose to use values from initial parsing of existing PKCS#12 data.

					const toBeSigned = this.parsedValue.authenticatedSafe.toSchema().toBER(false);
					//endregion

					//region Initial variables
					const cmsSigned = new _SignedData2.default({
						version: 1,
						encapContentInfo: new _EncapsulatedContentInfo2.default({
							eContentType: "1.2.840.113549.1.7.1", // "data" content type
							eContent: new asn1js.OctetString({ valueHex: toBeSigned })
						}),
						certificates: [parameters.signingCertificate]
					});
					//endregion

					//region Making additional attributes for CMS Signed Data
					//region Create a message digest
					sequence = sequence.then(() => crypto.digest({ name: parameters.hashAlgorithm }, new Uint8Array(toBeSigned)));
					//endregion

					//region Combine all signed extensions
					sequence = sequence.then(result => {
						//region Initial variables
						const signedAttr = [];
						//endregion

						//region contentType
						signedAttr.push(new _Attribute2.default({
							type: "1.2.840.113549.1.9.3",
							values: [new asn1js.ObjectIdentifier({ value: "1.2.840.113549.1.7.1" })]
						}));
						//endregion
						//region signingTime
						signedAttr.push(new _Attribute2.default({
							type: "1.2.840.113549.1.9.5",
							values: [new asn1js.UTCTime({ valueDate: new Date() })]
						}));
						//endregion
						//region messageDigest
						signedAttr.push(new _Attribute2.default({
							type: "1.2.840.113549.1.9.4",
							values: [new asn1js.OctetString({ valueHex: result })]
						}));
						//endregion

						//region Making final value for "SignerInfo" type
						cmsSigned.signerInfos.push(new _SignerInfo2.default({
							version: 1,
							sid: new _IssuerAndSerialNumber2.default({
								issuer: parameters.signingCertificate.issuer,
								serialNumber: parameters.signingCertificate.serialNumber
							}),
							signedAttrs: new _SignedAndUnsignedAttributes2.default({
								type: 0,
								attributes: signedAttr
							})
						}));
						//endregion
					}, error => Promise.reject(`Error during making digest for message: ${error}`));
					//endregion
					//endregion

					//region Signing CMS Signed Data
					sequence = sequence.then(() => cmsSigned.sign(parameters.privateKey, 0, parameters.hashAlgorithm));
					//endregion

					//region Making final CMS_CONTENT_INFO type
					sequence = sequence.then(() => {
						this.authSafe = new _ContentInfo2.default({
							contentType: "1.2.840.113549.1.7.2",
							content: cmsSigned.toSchema(true)
						});
					}, error => Promise.reject(`Error during making signature: ${error}`));
					//endregion
				}
				break;
			//endregion
			//region default
			default:
				return Promise.reject(`Parameter "integrityMode" has unknown value: ${parameters.integrityMode}`);
			//endregion
		}
		//endregion

		return sequence;
	}
	//**********************************************************************************
	parseInternalValues(parameters) {
		//region Check input data from "parameters" 
		if (parameters instanceof Object === false) return Promise.reject("The \"parameters\" must has \"Object\" type");

		if ("checkIntegrity" in parameters === false) parameters.checkIntegrity = true;
		//endregion 

		//region Initial variables 
		let sequence = Promise.resolve();
		//endregion 

		//region Get a "crypto" extension 
		const crypto = (0, _common.getCrypto)();
		if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object");
		//endregion 

		//region Create value for "this.parsedValue.authenticatedSafe" and check integrity 
		this.parsedValue = {};

		switch (this.authSafe.contentType) {
			//region data 
			case "1.2.840.113549.1.7.1":
				{
					//region Check additional mandatory parameters
					if ("password" in parameters === false) return Promise.reject("Absent mandatory parameter \"password\"");
					//endregion

					//region Integrity based on HMAC
					this.parsedValue.integrityMode = 0;
					//endregion

					//region Check that we do have OCTETSTRING as "content"
					if (this.authSafe.content instanceof asn1js.OctetString === false) return Promise.reject("Wrong type of \"this.authSafe.content\"");
					//endregion

					//region Check we have "constructive encoding" for AuthSafe content
					let authSafeContent = new ArrayBuffer(0);

					if (this.authSafe.content.valueBlock.isConstructed) {
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = this.authSafe.content.valueBlock.value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								const contentValue = _step.value;

								authSafeContent = (0, _pvutils.utilConcatBuf)(authSafeContent, contentValue.valueBlock.valueHex);
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
					} else authSafeContent = this.authSafe.content.valueBlock.valueHex;
					//endregion

					//region Parse internal ASN.1 data
					const asn1 = asn1js.fromBER(authSafeContent);
					if (asn1.offset === -1) return Promise.reject("Error during parsing of ASN.1 data inside \"this.authSafe.content\"");
					//endregion

					//region Set "authenticatedSafe" value
					this.parsedValue.authenticatedSafe = new _AuthenticatedSafe2.default({ schema: asn1.result });
					//endregion

					//region Check integrity
					if (parameters.checkIntegrity) {
						//region Check that "MacData" exists
						if ("macData" in this === false) return Promise.reject("Absent \"macData\" value, can not check PKCS#12 data integrity");
						//endregion

						//region Initial variables
						const hashAlgorithm = (0, _common.getAlgorithmByOID)(this.macData.mac.digestAlgorithm.algorithmId);
						if ("name" in hashAlgorithm === false) return Promise.reject(`Unsupported digest algorithm: ${this.macData.mac.digestAlgorithm.algorithmId}`);
						//endregion

						//region Call current crypto engine for verifying HMAC-based data stamp
						const engine = (0, _common.getEngine)();

						sequence = sequence.then(() => engine.subtle.verifyDataStampedWithPassword({
							password: parameters.password,
							hashAlgorithm: hashAlgorithm.name,
							salt: this.macData.macSalt.valueBlock.valueHex,
							iterationCount: this.macData.iterations,
							contentToVerify: authSafeContent,
							signatureToVerify: this.macData.mac.digest.valueBlock.valueHex
						}));
						//endregion

						//region Verify HMAC signature
						sequence = sequence.then(result => {
							if (result === false) return Promise.reject("Integrity for the PKCS#12 data is broken!");

							return Promise.resolve();
						}, error => Promise.reject(error));
						//endregion
					}
					//endregion
				}
				break;
			//endregion 
			//region signedData 
			case "1.2.840.113549.1.7.2":
				{
					//region Integrity based on signature using public key
					this.parsedValue.integrityMode = 1;
					//endregion

					//region Parse CMS Signed Data
					const cmsSigned = new _SignedData2.default({ schema: this.authSafe.content });
					//endregion

					//region Check that we do have OCTETSTRING as "content"
					if ("eContent" in cmsSigned.encapContentInfo === false) return Promise.reject("Absent of attached data in \"cmsSigned.encapContentInfo\"");

					if (cmsSigned.encapContentInfo.eContent instanceof asn1js.OctetString === false) return Promise.reject("Wrong type of \"cmsSigned.encapContentInfo.eContent\"");
					//endregion

					//region Create correct data block for verification
					let data = new ArrayBuffer(0);

					if (cmsSigned.encapContentInfo.eContent.idBlock.isConstructed === false) data = cmsSigned.encapContentInfo.eContent.valueBlock.valueHex;else {
						for (let i = 0; i < cmsSigned.encapContentInfo.eContent.valueBlock.value.length; i++) data = (0, _pvutils.utilConcatBuf)(data, cmsSigned.encapContentInfo.eContent.valueBlock.value[i].valueBlock.valueHex);
					}
					//endregion

					//region Parse internal ASN.1 data
					const asn1 = asn1js.fromBER(data);
					if (asn1.offset === -1) return Promise.reject("Error during parsing of ASN.1 data inside \"this.authSafe.content\"");
					//endregion

					//region Set "authenticatedSafe" value
					this.parsedValue.authenticatedSafe = new _AuthenticatedSafe2.default({ schema: asn1.result });
					//endregion

					//region Check integrity
					sequence = sequence.then(() => cmsSigned.verify({ signer: 0, checkChain: false })).then(result => {
						if (result === false) return Promise.reject("Integrity for the PKCS#12 data is broken!");

						return Promise.resolve();
					}, error => Promise.reject(`Error during integrity verification: ${error}`));
					//endregion
				}
				break;
			//endregion   
			//region default 
			default:
				return Promise.reject(`Incorrect value for "this.authSafe.contentType": ${this.authSafe.contentType}`);
			//endregion 
		}
		//endregion 

		//region Return result of the function 
		return sequence.then(() => this, error => Promise.reject(`Error during parsing: ${error}`));
		//endregion   
	}
	//**********************************************************************************
}
exports.default = PFX; //**************************************************************************************
//# sourceMappingURL=PFX.js.map