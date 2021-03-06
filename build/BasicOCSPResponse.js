"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _ResponseData = require("./ResponseData.js");

var _ResponseData2 = _interopRequireDefault(_ResponseData);

var _AlgorithmIdentifier = require("./AlgorithmIdentifier.js");

var _AlgorithmIdentifier2 = _interopRequireDefault(_AlgorithmIdentifier);

var _Certificate = require("./Certificate.js");

var _Certificate2 = _interopRequireDefault(_Certificate);

var _CertID = require("./CertID.js");

var _CertID2 = _interopRequireDefault(_CertID);

var _RelativeDistinguishedNames = require("./RelativeDistinguishedNames.js");

var _RelativeDistinguishedNames2 = _interopRequireDefault(_RelativeDistinguishedNames);

var _CertificateChainValidationEngine = require("./CertificateChainValidationEngine.js");

var _CertificateChainValidationEngine2 = _interopRequireDefault(_CertificateChainValidationEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC6960
 */
class BasicOCSPResponse {
	//**********************************************************************************
	/**
  * Constructor for BasicOCSPResponse class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {ResponseData}
   * @desc tbsResponseData
   */
		this.tbsResponseData = (0, _pvutils.getParametersValue)(parameters, "tbsResponseData", BasicOCSPResponse.defaultValues("tbsResponseData"));
		/**
   * @type {AlgorithmIdentifier}
   * @desc signatureAlgorithm
   */
		this.signatureAlgorithm = (0, _pvutils.getParametersValue)(parameters, "signatureAlgorithm", BasicOCSPResponse.defaultValues("signatureAlgorithm"));
		/**
   * @type {BitString}
   * @desc signature
   */
		this.signature = (0, _pvutils.getParametersValue)(parameters, "signature", BasicOCSPResponse.defaultValues("signature"));

		if ("certs" in parameters)
			/**
    * @type {Array.<Certificate>}
    * @desc certs
    */
			this.certs = (0, _pvutils.getParametersValue)(parameters, "certs", BasicOCSPResponse.defaultValues("certs"));
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
			case "tbsResponseData":
				return new _ResponseData2.default();
			case "signatureAlgorithm":
				return new _AlgorithmIdentifier2.default();
			case "signature":
				return new asn1js.BitString();
			case "certs":
				return [];
			default:
				throw new Error(`Invalid member name for BasicOCSPResponse class: ${memberName}`);
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
				{
					// noinspection OverlyComplexBooleanExpressionJS
					let comparisonResult = _ResponseData2.default.compareWithDefault("tbs", memberValue.tbs) && _ResponseData2.default.compareWithDefault("responderID", memberValue.responderID) && _ResponseData2.default.compareWithDefault("producedAt", memberValue.producedAt) && _ResponseData2.default.compareWithDefault("responses", memberValue.responses);

					if ("responseExtensions" in memberValue) comparisonResult = comparisonResult && _ResponseData2.default.compareWithDefault("responseExtensions", memberValue.responseExtensions);

					return comparisonResult;
				}
			case "signatureAlgorithm":
				return memberValue.algorithmId === "" && "algorithmParams" in memberValue === false;
			case "signature":
				return memberValue.isEqual(BasicOCSPResponse.defaultValues(memberName));
			case "certs":
				return memberValue.length === 0;
			default:
				throw new Error(`Invalid member name for BasicOCSPResponse class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * BasicOCSPResponse       ::= SEQUENCE {
  *    tbsResponseData      ResponseData,
  *    signatureAlgorithm   AlgorithmIdentifier,
  *    signature            BIT STRING,
  *    certs            [0] EXPLICIT SEQUENCE OF Certificate OPTIONAL }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [tbsResponseData]
   * @property {string} [signatureAlgorithm]
   * @property {string} [signature]
   * @property {string} [certs]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "BasicOCSPResponse",
			value: [_ResponseData2.default.schema(names.tbsResponseData || {
				names: {
					blockName: "BasicOCSPResponse.tbsResponseData"
				}
			}), _AlgorithmIdentifier2.default.schema(names.signatureAlgorithm || {
				names: {
					blockName: "BasicOCSPResponse.signatureAlgorithm"
				}
			}), new asn1js.BitString({ name: names.signature || "BasicOCSPResponse.signature" }), new asn1js.Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [new asn1js.Sequence({
					value: [new asn1js.Repeated({
						name: "BasicOCSPResponse.certs",
						value: _Certificate2.default.schema(names.certs || {})
					})]
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
		(0, _pvutils.clearProps)(schema, ["BasicOCSPResponse.tbsResponseData", "BasicOCSPResponse.signatureAlgorithm", "BasicOCSPResponse.signature", "BasicOCSPResponse.certs"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, BasicOCSPResponse.schema());

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for BasicOCSPResponse");
		//endregion

		//region Get internal properties from parsed schema
		this.tbsResponseData = new _ResponseData2.default({ schema: asn1.result["BasicOCSPResponse.tbsResponseData"] });
		this.signatureAlgorithm = new _AlgorithmIdentifier2.default({ schema: asn1.result["BasicOCSPResponse.signatureAlgorithm"] });
		this.signature = asn1.result["BasicOCSPResponse.signature"];

		if ("BasicOCSPResponse.certs" in asn1.result) this.certs = Array.from(asn1.result["BasicOCSPResponse.certs"], element => new _Certificate2.default({ schema: element }));
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

		outputArray.push(this.tbsResponseData.toSchema());
		outputArray.push(this.signatureAlgorithm.toSchema());
		outputArray.push(this.signature);

		//region Create array of certificates
		if ("certs" in this) {
			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [new asn1js.Sequence({
					value: Array.from(this.certs, element => element.toSchema())
				})]
			}));
		}
		//endregion
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
			tbsResponseData: this.tbsResponseData.toJSON(),
			signatureAlgorithm: this.signatureAlgorithm.toJSON(),
			signature: this.signature.toJSON()
		};

		if ("certs" in this) _object.certs = Array.from(this.certs, element => element.toJSON());

		return _object;
	}
	//**********************************************************************************
	/**
  * Get OCSP response status for specific certificate
  * @param {Certificate} certificate Certificate to be checked
  * @param {Certificate} issuerCertificate Certificate of issuer for certificate to be checked
  * @returns {Promise}
  */
	getCertificateStatus(certificate, issuerCertificate) {
		//region Initial variables
		let sequence = Promise.resolve();

		const result = {
			isForCertificate: false,
			status: 2 // 0 = good, 1 = revoked, 2 = unknown
		};

		const hashesObject = {};

		const certIDs = [];
		const certIDPromises = [];
		//endregion

		//region Create all "certIDs" for input certificates
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = this.tbsResponseData.responses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				const response = _step.value;

				const hashAlgorithm = (0, _common.getAlgorithmByOID)(response.certID.hashAlgorithm.algorithmId);
				if ("name" in hashAlgorithm === false) return Promise.reject(`Wrong CertID hashing algorithm: ${response.certID.hashAlgorithm.algorithmId}`);

				if (hashAlgorithm.name in hashesObject === false) {
					hashesObject[hashAlgorithm.name] = 1;

					const certID = new _CertID2.default();

					certIDs.push(certID);
					certIDPromises.push(certID.createForCertificate(certificate, {
						hashAlgorithm: hashAlgorithm.name,
						issuerCertificate
					}));
				}
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

		sequence = sequence.then(() => Promise.all(certIDPromises));
		//endregion

		//region Compare all response's "certIDs" with identifiers for input certificate
		sequence = sequence.then(() => {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.tbsResponseData.responses[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					const response = _step2.value;
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;

					try {
						for (var _iterator3 = certIDs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							const id = _step3.value;

							if (response.certID.isEqual(id)) {
								result.isForCertificate = true;

								try {
									switch (response.certStatus.idBlock.isConstructed) {
										case true:
											if (response.certStatus.idBlock.tagNumber === 1) result.status = 1; // revoked

											break;
										case false:
											switch (response.certStatus.idBlock.tagNumber) {
												case 0:
													// good
													result.status = 0;
													break;
												case 2:
													// unknown
													result.status = 2;
													break;
												default:
											}

											break;
										default:
									}
								} catch (ex) {}

								return result;
							}
						}
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

			return result;
		});
		//endregion

		return sequence;
	}
	//**********************************************************************************
	/**
  * Make signature for current OCSP Basic Response
  * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
  * @param {string} [hashAlgorithm="SHA-1"] Hashing algorithm. Default SHA-1
  * @returns {Promise}
  */
	sign(privateKey, hashAlgorithm = "SHA-1") {
		//region Initial checking
		//region Get a private key from function parameter
		if (typeof privateKey === "undefined") return Promise.reject("Need to provide a private key for signing");
		//endregion
		//endregion

		//region Initial variables
		let sequence = Promise.resolve();
		let parameters;

		const engine = (0, _common.getEngine)();
		//endregion

		//region Get a "default parameters" for current algorithm and set correct signature algorithm
		sequence = sequence.then(() => engine.subtle.getSignatureParameters(privateKey, hashAlgorithm));

		sequence = sequence.then(result => {
			parameters = result.parameters;
			this.signatureAlgorithm = result.signatureAlgorithm;
		});
		//endregion

		//region Create TBS data for signing
		sequence = sequence.then(() => {
			this.tbsResponseData.tbs = this.tbsResponseData.toSchema(true).toBER(false);
		});
		//endregion

		//region Signing TBS data on provided private key
		sequence = sequence.then(() => engine.subtle.signWithPrivateKey(this.tbsResponseData.tbs, privateKey, parameters));

		sequence = sequence.then(result => {
			this.signature = new asn1js.BitString({ valueHex: result });
		});
		//endregion

		return sequence;
	}
	//**********************************************************************************
	/**
  * Verify existing OCSP Basic Response
  * @param {Object} parameters Additional parameters
  * @returns {Promise}
  */
	verify(parameters = {}) {
		//region Initial variables
		let signerCert = null;

		let certIndex = -1;

		let sequence = Promise.resolve();

		let trustedCerts = [];

		const _this = this;

		const engine = (0, _common.getEngine)();
		//endregion

		//region Check amount of certificates
		if ("certs" in this === false) return Promise.reject("No certificates attached to the BasicOCSPResponce");
		//endregion

		//region Get input values
		if ("trustedCerts" in parameters) trustedCerts = parameters.trustedCerts;
		//endregion

		//region Aux functions
		/**
   * Check CA flag for the certificate
   * @param {Certificate} cert Certificate to find CA flag for
   * @returns {*}
   */
		function checkCA(cert) {
			//region Do not include signer's certificate
			if (cert.issuer.isEqual(signerCert.issuer) === true && cert.serialNumber.isEqual(signerCert.serialNumber) === true) return null;
			//endregion

			let isCA = false;

			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = cert.extensions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					const extension = _step4.value;

					if (extension.extnID === "2.5.29.19") // BasicConstraints
						{
							if ("cA" in extension.parsedValue) {
								if (extension.parsedValue.cA === true) isCA = true;
							}
						}
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			if (isCA) return cert;

			return null;
		}
		//endregion

		//region Get a "crypto" extension
		const crypto = (0, _common.getCrypto)();
		if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object");
		//endregion

		//region Find correct value for "responderID"
		switch (true) {
			case this.tbsResponseData.responderID instanceof _RelativeDistinguishedNames2.default:
				// [1] Name
				sequence = sequence.then(() => {
					var _iteratorNormalCompletion5 = true;
					var _didIteratorError5 = false;
					var _iteratorError5 = undefined;

					try {
						for (var _iterator5 = _this.certs.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
							const _ref = _step5.value;

							var _ref2 = _slicedToArray(_ref, 2);

							const index = _ref2[0];
							const certificate = _ref2[1];

							if (certificate.subject.isEqual(_this.tbsResponseData.responderID)) {
								certIndex = index;
								break;
							}
						}
					} catch (err) {
						_didIteratorError5 = true;
						_iteratorError5 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion5 && _iterator5.return) {
								_iterator5.return();
							}
						} finally {
							if (_didIteratorError5) {
								throw _iteratorError5;
							}
						}
					}
				});
				break;
			case this.tbsResponseData.responderID instanceof asn1js.OctetString:
				// [2] KeyHash
				sequence = sequence.then(() => Promise.all(Array.from(_this.certs, element => crypto.digest({ name: "sha-1" }, new Uint8Array(element.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex)))).then(results => {
					var _iteratorNormalCompletion6 = true;
					var _didIteratorError6 = false;
					var _iteratorError6 = undefined;

					try {
						for (var _iterator6 = _this.certs.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
							const _ref3 = _step6.value;

							var _ref4 = _slicedToArray(_ref3, 1);

							const index = _ref4[0];

							if ((0, _pvutils.isEqualBuffer)(results[index], _this.tbsResponseData.responderID.valueBlock.valueHex)) {
								certIndex = index;
								break;
							}
						}
					} catch (err) {
						_didIteratorError6 = true;
						_iteratorError6 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion6 && _iterator6.return) {
								_iterator6.return();
							}
						} finally {
							if (_didIteratorError6) {
								throw _iteratorError6;
							}
						}
					}
				}));
				break;
			default:
				return Promise.reject("Wrong value for responderID");
		}
		//endregion

		//region Make additional verification for signer's certificate
		sequence = sequence.then(() => {
			if (certIndex === -1) return Promise.reject("Correct certificate was not found in OCSP response");

			signerCert = this.certs[certIndex];

			return Promise.all(Array.from(_this.certs, element => checkCA(element))).then(promiseResults => {
				const additionalCerts = [];
				additionalCerts.push(signerCert);

				var _iteratorNormalCompletion7 = true;
				var _didIteratorError7 = false;
				var _iteratorError7 = undefined;

				try {
					for (var _iterator7 = promiseResults[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
						const promiseResult = _step7.value;

						if (promiseResult !== null) additionalCerts.push(promiseResult);
					}
				} catch (err) {
					_didIteratorError7 = true;
					_iteratorError7 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion7 && _iterator7.return) {
							_iterator7.return();
						}
					} finally {
						if (_didIteratorError7) {
							throw _iteratorError7;
						}
					}
				}

				const certChain = new _CertificateChainValidationEngine2.default({
					certs: additionalCerts,
					trustedCerts
				});

				return certChain.verify().then(verificationResult => {
					if (verificationResult.result === true) return Promise.resolve();

					return Promise.reject("Validation of signer's certificate failed");
				}, error => Promise.reject(`Validation of signer's certificate failed with error: ${error instanceof Object ? error.resultMessage : error}`));
			}, promiseError => Promise.reject(`Error during checking certificates for CA flag: ${promiseError}`));
		});
		//endregion

		sequence = sequence.then(() => engine.subtle.verifyWithPublicKey(this.tbsResponseData.tbs, this.signature, this.certs[certIndex].subjectPublicKeyInfo, this.signatureAlgorithm));

		return sequence;
	}
	//**********************************************************************************
}
exports.default = BasicOCSPResponse; //**************************************************************************************
//# sourceMappingURL=BasicOCSPResponse.js.map