"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _ContentInfo = require("./ContentInfo.js");

var _ContentInfo2 = _interopRequireDefault(_ContentInfo);

var _SafeContents = require("./SafeContents.js");

var _SafeContents2 = _interopRequireDefault(_SafeContents);

var _EnvelopedData = require("./EnvelopedData.js");

var _EnvelopedData2 = _interopRequireDefault(_EnvelopedData);

var _EncryptedData = require("./EncryptedData.js");

var _EncryptedData2 = _interopRequireDefault(_EncryptedData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC7292
 */
class AuthenticatedSafe {
	//**********************************************************************************
	/**
  * Constructor for AuthenticatedSafe class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {Array.<ContentInfo>}
   * @desc safeContents
   */
		this.safeContents = (0, _pvutils.getParametersValue)(parameters, "safeContents", AuthenticatedSafe.defaultValues("safeContents"));

		if ("parsedValue" in parameters)
			/**
    * @type {*}
    * @desc parsedValue
    */
			this.parsedValue = (0, _pvutils.getParametersValue)(parameters, "parsedValue", AuthenticatedSafe.defaultValues("parsedValue"));
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
			case "safeContents":
				return [];
			case "parsedValue":
				return {};
			default:
				throw new Error(`Invalid member name for AuthenticatedSafe class: ${memberName}`);
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
			case "safeContents":
				return memberValue.length === 0;
			case "parsedValue":
				return memberValue instanceof Object && Object.keys(memberValue).length === 0;
			default:
				throw new Error(`Invalid member name for AuthenticatedSafe class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * AuthenticatedSafe ::= SEQUENCE OF ContentInfo
  * -- Data if unencrypted
  * -- EncryptedData if password-encrypted
  * -- EnvelopedData if public key-encrypted
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [contentInfos]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Repeated({
				name: names.contentInfos || "",
				value: _ContentInfo2.default.schema()
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
		(0, _pvutils.clearProps)(schema, ["contentInfos"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, AuthenticatedSafe.schema({
			names: {
				contentInfos: "contentInfos"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AuthenticatedSafe");
		//endregion

		//region Get internal properties from parsed schema
		this.safeContents = Array.from(asn1.result.contentInfos, element => new _ContentInfo2.default({ schema: element }));
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
			value: Array.from(this.safeContents, element => element.toSchema())
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
			safeContents: Array.from(this.safeContents, element => element.toJSON())
		};
	}
	//**********************************************************************************
	parseInternalValues(parameters) {
		//region Check input data from "parameters" 
		if (parameters instanceof Object === false) return Promise.reject("The \"parameters\" must has \"Object\" type");

		if ("safeContents" in parameters === false) return Promise.reject("Absent mandatory parameter \"safeContents\"");

		if (parameters.safeContents instanceof Array === false) return Promise.reject("The \"parameters.safeContents\" must has \"Array\" type");

		if (parameters.safeContents.length !== this.safeContents.length) return Promise.reject("Length of \"parameters.safeContents\" must be equal to \"this.safeContents.length\"");
		//endregion 

		//region Initial variables 
		let sequence = Promise.resolve();
		//endregion

		//region Create value for "this.parsedValue.authenticatedSafe" 
		this.parsedValue = {
			safeContents: []
		};

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = this.safeContents.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				const _ref = _step.value;

				var _ref2 = _slicedToArray(_ref, 2);

				const index = _ref2[0];
				const content = _ref2[1];

				switch (content.contentType) {
					//region data 
					case "1.2.840.113549.1.7.1":
						{
							//region Check that we do have OCTETSTRING as "content"
							if (content.content instanceof asn1js.OctetString === false) return Promise.reject("Wrong type of \"this.safeContents[j].content\"");
							//endregion

							//region Check we have "constructive encoding" for AuthSafe content
							let authSafeContent = new ArrayBuffer(0);

							if (content.content.valueBlock.isConstructed) {
								var _iteratorNormalCompletion2 = true;
								var _didIteratorError2 = false;
								var _iteratorError2 = undefined;

								try {
									for (var _iterator2 = content.content.valueBlock.value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
										const contentValue = _step2.value;

										authSafeContent = (0, _pvutils.utilConcatBuf)(authSafeContent, contentValue.valueBlock.valueHex);
									}
								} catch (err) {
									_didIteratorError2 = true;
									_iteratorError2 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion2 && _iterator2.return) {
											_iterator2.return();
										}
									} finally {
										if (_didIteratorError2) {
											throw _iteratorError2;
										}
									}
								}
							} else authSafeContent = content.content.valueBlock.valueHex;
							//endregion

							//region Parse internal ASN.1 data
							const asn1 = asn1js.fromBER(authSafeContent);
							if (asn1.offset === -1) return Promise.reject("Error during parsing of ASN.1 data inside \"content.content\"");
							//endregion

							//region Finilly initialize initial values of "SafeContents" type
							this.parsedValue.safeContents.push({
								privacyMode: 0, // No privacy, clear data
								value: new _SafeContents2.default({ schema: asn1.result })
							});
							//endregion
						}
						break;
					//endregion 
					//region envelopedData 
					case "1.2.840.113549.1.7.3":
						{
							//region Initial variables
							const cmsEnveloped = new _EnvelopedData2.default({ schema: content.content });
							//endregion

							//region Check mandatory parameters
							if ("recipientCertificate" in parameters.safeContents[index] === false) return Promise.reject("Absent mandatory parameter \"recipientCertificate\" in \"parameters.safeContents[j]\"");

							const recipientCertificate = parameters.safeContents[index].recipientCertificate;

							if ("recipientKey" in parameters.safeContents[index] === false) return Promise.reject("Absent mandatory parameter \"recipientKey\" in \"parameters.safeContents[j]\"");

							// noinspection JSUnresolvedVariable
							const recipientKey = parameters.safeContents[index].recipientKey;
							//endregion

							//region Decrypt CMS EnvelopedData using first recipient information
							sequence = sequence.then(() => cmsEnveloped.decrypt(0, {
								recipientCertificate,
								recipientPrivateKey: recipientKey
							}));

							sequence = sequence.then(
							/**
        * @param {ArrayBuffer} result
        */
							result => {
								const asn1 = asn1js.fromBER(result);
								if (asn1.offset === -1) return Promise.reject("Error during parsing of decrypted data");

								this.parsedValue.safeContents.push({
									privacyMode: 2, // Public-key privacy mode
									value: new _SafeContents2.default({ schema: asn1.result })
								});

								return Promise.resolve();
							});
							//endregion
						}
						break;
					//endregion   
					//region encryptedData 
					case "1.2.840.113549.1.7.6":
						{
							//region Initial variables
							const cmsEncrypted = new _EncryptedData2.default({ schema: content.content });
							//endregion

							//region Check mandatory parameters
							if ("password" in parameters.safeContents[index] === false) return Promise.reject("Absent mandatory parameter \"password\" in \"parameters.safeContents[j]\"");

							const password = parameters.safeContents[index].password;
							//endregion

							//region Decrypt CMS EncryptedData using password
							sequence = sequence.then(() => cmsEncrypted.decrypt({
								password
							}), error => Promise.reject(error));
							//endregion

							//region Initialize internal data
							sequence = sequence.then(
							/**
        * @param {ArrayBuffer} result
        */
							result => {
								const asn1 = asn1js.fromBER(result);
								if (asn1.offset === -1) return Promise.reject("Error during parsing of decrypted data");

								this.parsedValue.safeContents.push({
									privacyMode: 1, // Password-based privacy mode
									value: new _SafeContents2.default({ schema: asn1.result })
								});

								return Promise.resolve();
							}, error => Promise.reject(error));
							//endregion
						}
						break;
					//endregion   
					//region default 
					default:
						throw new Error(`Unknown "contentType" for AuthenticatedSafe: " ${content.contentType}`);
					//endregion 
				}
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

		return sequence;
	}
	//**********************************************************************************
	makeInternalValues(parameters) {
		//region Check data in "parsedValue" 
		if ("parsedValue" in this === false) return Promise.reject("Please run \"parseValues\" first or add \"parsedValue\" manually");

		if (this.parsedValue instanceof Object === false) return Promise.reject("The \"this.parsedValue\" must has \"Object\" type");

		if (this.parsedValue.safeContents instanceof Array === false) return Promise.reject("The \"this.parsedValue.safeContents\" must has \"Array\" type");
		//endregion 

		//region Check input data from "parameters" 
		if (parameters instanceof Object === false) return Promise.reject("The \"parameters\" must has \"Object\" type");

		if ("safeContents" in parameters === false) return Promise.reject("Absent mandatory parameter \"safeContents\"");

		if (parameters.safeContents instanceof Array === false) return Promise.reject("The \"parameters.safeContents\" must has \"Array\" type");

		if (parameters.safeContents.length !== this.parsedValue.safeContents.length) return Promise.reject("Length of \"parameters.safeContents\" must be equal to \"this.parsedValue.safeContents\"");
		//endregion 

		//region Initial variables 
		let sequence = Promise.resolve();
		//endregion

		//region Create internal values from already parsed values 
		this.safeContents = [];

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = this.parsedValue.safeContents.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				const _ref3 = _step3.value;

				var _ref4 = _slicedToArray(_ref3, 2);

				const index = _ref4[0];
				const content = _ref4[1];

				//region Check current "content" value
				if ("privacyMode" in content === false) return Promise.reject("The \"privacyMode\" is a mandatory parameter for \"content\"");

				if ("value" in content === false) return Promise.reject("The \"value\" is a mandatory parameter for \"content\"");

				if (content.value instanceof _SafeContents2.default === false) return Promise.reject("The \"content.value\" must has \"SafeContents\" type");
				//endregion 

				switch (content.privacyMode) {
					//region No privacy 
					case 0:
						{
							const contentBuffer = content.value.toSchema().toBER(false);

							sequence = sequence.then(() => {
								this.safeContents.push(new _ContentInfo2.default({
									contentType: "1.2.840.113549.1.7.1",
									content: new asn1js.OctetString({ valueHex: contentBuffer })
								}));
							});
						}
						break;
					//endregion 
					//region Privacy with password
					case 1:
						{
							//region Initial variables
							const cmsEncrypted = new _EncryptedData2.default();

							const currentParameters = parameters.safeContents[index];
							currentParameters.contentToEncrypt = content.value.toSchema().toBER(false);
							//endregion

							//region Encrypt CMS EncryptedData using password
							sequence = sequence.then(() => cmsEncrypted.encrypt(currentParameters), error => Promise.reject(error));
							//endregion

							//region Store result content in CMS_CONTENT_INFO type
							sequence = sequence.then(() => {
								this.safeContents.push(new _ContentInfo2.default({
									contentType: "1.2.840.113549.1.7.6",
									content: cmsEncrypted.toSchema()
								}));
							}, error => Promise.reject(error));
							//endregion
						}
						break;
					//endregion 
					//region Privacy with public key
					case 2:
						{
							//region Initial variables
							const cmsEnveloped = new _EnvelopedData2.default();
							const contentToEncrypt = content.value.toSchema().toBER(false);
							//endregion

							//region Check mandatory parameters
							if ("encryptingCertificate" in parameters.safeContents[index] === false) return Promise.reject("Absent mandatory parameter \"encryptingCertificate\" in \"parameters.safeContents[i]\"");

							if ("encryptionAlgorithm" in parameters.safeContents[index] === false) return Promise.reject("Absent mandatory parameter \"encryptionAlgorithm\" in \"parameters.safeContents[i]\"");

							switch (true) {
								case parameters.safeContents[index].encryptionAlgorithm.name.toLowerCase() === "aes-cbc":
								case parameters.safeContents[index].encryptionAlgorithm.name.toLowerCase() === "aes-gcm":
									break;
								default:
									return Promise.reject(`Incorrect parameter "encryptionAlgorithm" in "parameters.safeContents[i]": ${parameters.safeContents[index].encryptionAlgorithm}`);
							}

							switch (true) {
								case parameters.safeContents[index].encryptionAlgorithm.length === 128:
								case parameters.safeContents[index].encryptionAlgorithm.length === 192:
								case parameters.safeContents[index].encryptionAlgorithm.length === 256:
									break;
								default:
									return Promise.reject(`Incorrect parameter "encryptionAlgorithm.length" in "parameters.safeContents[i]": ${parameters.safeContents[index].encryptionAlgorithm.length}`);
							}
							//endregion

							//region Making correct "encryptionAlgorithm" variable
							const encryptionAlgorithm = parameters.safeContents[index].encryptionAlgorithm;
							//endregion

							//region Append recipient for enveloped data
							cmsEnveloped.addRecipientByCertificate(parameters.safeContents[index].encryptingCertificate);
							//endregion

							//region Making encryption
							sequence = sequence.then(() => cmsEnveloped.encrypt(encryptionAlgorithm, contentToEncrypt));

							sequence = sequence.then(() => {
								this.safeContents.push(new _ContentInfo2.default({
									contentType: "1.2.840.113549.1.7.3",
									content: cmsEnveloped.toSchema()
								}));
							});
							//endregion
						}
						break;
					//endregion 
					//region default 
					default:
						return Promise.reject(`Incorrect value for "content.privacyMode": ${content.privacyMode}`);
					//endregion 
				}
			}
			//endregion 

			//region Return result of the function 
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		return sequence.then(() => this, error => Promise.reject(`Error during parsing: ${error}`));
		//endregion   
	}
	//**********************************************************************************
}
exports.default = AuthenticatedSafe; //**************************************************************************************
//# sourceMappingURL=AuthenticatedSafe.js.map