"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _AlgorithmIdentifier = require("./AlgorithmIdentifier.js");

var _AlgorithmIdentifier2 = _interopRequireDefault(_AlgorithmIdentifier);

var _RelativeDistinguishedNames = require("./RelativeDistinguishedNames.js");

var _RelativeDistinguishedNames2 = _interopRequireDefault(_RelativeDistinguishedNames);

var _Time = require("./Time.js");

var _Time2 = _interopRequireDefault(_Time);

var _RevokedCertificate = require("./RevokedCertificate.js");

var _RevokedCertificate2 = _interopRequireDefault(_RevokedCertificate);

var _Extensions = require("./Extensions.js");

var _Extensions2 = _interopRequireDefault(_Extensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
function tbsCertList(parameters = {}) {
	//TBSCertList  ::=  SEQUENCE  {
	//    version                 Version OPTIONAL,
	//                                 -- if present, MUST be v2
	//    signature               AlgorithmIdentifier,
	//    issuer                  Name,
	//    thisUpdate              Time,
	//    nextUpdate              Time OPTIONAL,
	//    revokedCertificates     SEQUENCE OF SEQUENCE  {
	//        userCertificate         CertificateSerialNumber,
	//        revocationDate          Time,
	//        crlEntryExtensions      Extensions OPTIONAL
	//        -- if present, version MUST be v2
	//    }  OPTIONAL,
	//    crlExtensions           [0]  EXPLICIT Extensions OPTIONAL
	//    -- if present, version MUST be v2
	//}

	/**
  * @type {Object}
  * @property {string} [blockName]
  * @property {string} [tbsCertListVersion]
  * @property {string} [signature]
  * @property {string} [issuer]
  * @property {string} [tbsCertListThisUpdate]
  * @property {string} [tbsCertListNextUpdate]
  * @property {string} [tbsCertListRevokedCertificates]
  * @property {string} [crlExtensions]
  */
	const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

	return new asn1js.Sequence({
		name: names.blockName || "tbsCertList",
		value: [new asn1js.Integer({
			optional: true,
			name: names.tbsCertListVersion || "tbsCertList.version",
			value: 2
		}), // EXPLICIT integer value (v2)
		_AlgorithmIdentifier2.default.schema(names.signature || {
			names: {
				blockName: "tbsCertList.signature"
			}
		}), _RelativeDistinguishedNames2.default.schema(names.issuer || {
			names: {
				blockName: "tbsCertList.issuer"
			}
		}), _Time2.default.schema(names.tbsCertListThisUpdate || {
			names: {
				utcTimeName: "tbsCertList.thisUpdate",
				generalTimeName: "tbsCertList.thisUpdate"
			}
		}), _Time2.default.schema(names.tbsCertListNextUpdate || {
			names: {
				utcTimeName: "tbsCertList.nextUpdate",
				generalTimeName: "tbsCertList.nextUpdate"
			}
		}, true), new asn1js.Sequence({
			optional: true,
			value: [new asn1js.Repeated({
				name: names.tbsCertListRevokedCertificates || "tbsCertList.revokedCertificates",
				value: new asn1js.Sequence({
					value: [new asn1js.Integer(), _Time2.default.schema(), _Extensions2.default.schema({}, true)]
				})
			})]
		}), new asn1js.Constructed({
			optional: true,
			idBlock: {
				tagClass: 3, // CONTEXT-SPECIFIC
				tagNumber: 0 // [0]
			},
			value: [_Extensions2.default.schema(names.crlExtensions || {
				names: {
					blockName: "tbsCertList.extensions"
				}
			})]
		}) // EXPLICIT SEQUENCE value
		]
	});
}
//**************************************************************************************
/**
 * Class from RFC5280
 */
class CertificateRevocationList {
	//**********************************************************************************
	/**
  * Constructor for Attribute class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {ArrayBuffer}
   * @desc tbs
   */
		this.tbs = (0, _pvutils.getParametersValue)(parameters, "tbs", CertificateRevocationList.defaultValues("tbs"));
		/**
   * @type {number}
   * @desc version
   */
		this.version = (0, _pvutils.getParametersValue)(parameters, "version", CertificateRevocationList.defaultValues("version"));
		/**
   * @type {AlgorithmIdentifier}
   * @desc signature
   */
		this.signature = (0, _pvutils.getParametersValue)(parameters, "signature", CertificateRevocationList.defaultValues("signature"));
		/**
   * @type {RelativeDistinguishedNames}
   * @desc issuer
   */
		this.issuer = (0, _pvutils.getParametersValue)(parameters, "issuer", CertificateRevocationList.defaultValues("issuer"));
		/**
   * @type {Time}
   * @desc thisUpdate
   */
		this.thisUpdate = (0, _pvutils.getParametersValue)(parameters, "thisUpdate", CertificateRevocationList.defaultValues("thisUpdate"));

		if ("nextUpdate" in parameters)
			/**
    * @type {Time}
    * @desc nextUpdate
    */
			this.nextUpdate = (0, _pvutils.getParametersValue)(parameters, "nextUpdate", CertificateRevocationList.defaultValues("nextUpdate"));

		if ("revokedCertificates" in parameters)
			/**
    * @type {Array.<RevokedCertificate>}
    * @desc revokedCertificates
    */
			this.revokedCertificates = (0, _pvutils.getParametersValue)(parameters, "revokedCertificates", CertificateRevocationList.defaultValues("revokedCertificates"));

		if ("crlExtensions" in parameters)
			/**
    * @type {Extensions}
    * @desc crlExtensions
    */
			this.crlExtensions = (0, _pvutils.getParametersValue)(parameters, "crlExtensions", CertificateRevocationList.defaultValues("crlExtensions"));

		/**
   * @type {AlgorithmIdentifier}
   * @desc signatureAlgorithm
   */
		this.signatureAlgorithm = (0, _pvutils.getParametersValue)(parameters, "signatureAlgorithm", CertificateRevocationList.defaultValues("signatureAlgorithm"));
		/**
   * @type {BitString}
   * @desc signatureValue
   */
		this.signatureValue = (0, _pvutils.getParametersValue)(parameters, "signatureValue", CertificateRevocationList.defaultValues("signatureValue"));
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
			case "tbs":
				return new ArrayBuffer(0);
			case "version":
				return 1;
			case "signature":
				return new _AlgorithmIdentifier2.default();
			case "issuer":
				return new _RelativeDistinguishedNames2.default();
			case "thisUpdate":
				return new _Time2.default();
			case "nextUpdate":
				return new _Time2.default();
			case "revokedCertificates":
				return [];
			case "crlExtensions":
				return new _Extensions2.default();
			case "signatureAlgorithm":
				return new _AlgorithmIdentifier2.default();
			case "signatureValue":
				return new asn1js.BitString();
			default:
				throw new Error(`Invalid member name for CertificateRevocationList class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * CertificateList  ::=  SEQUENCE  {
  *    tbsCertList          TBSCertList,
  *    signatureAlgorithm   AlgorithmIdentifier,
  *    signatureValue       BIT STRING  }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [signatureAlgorithm]
   * @property {string} [signatureValue]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "CertificateList",
			value: [tbsCertList(parameters), _AlgorithmIdentifier2.default.schema(names.signatureAlgorithm || {
				names: {
					blockName: "signatureAlgorithm"
				}
			}), new asn1js.BitString({ name: names.signatureValue || "signatureValue" })]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["tbsCertList", "tbsCertList.version", "tbsCertList.signature", "tbsCertList.issuer", "tbsCertList.thisUpdate", "tbsCertList.nextUpdate", "tbsCertList.revokedCertificates", "tbsCertList.extensions", "signatureAlgorithm", "signatureValue"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, CertificateRevocationList.schema());

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for CertificateRevocationList");
		//endregion

		//region Get internal properties from parsed schema
		// noinspection JSUnresolvedVariable
		this.tbs = asn1.result.tbsCertList.valueBeforeDecode;

		if ("tbsCertList.version" in asn1.result) this.version = asn1.result["tbsCertList.version"].valueBlock.valueDec;
		this.signature = new _AlgorithmIdentifier2.default({ schema: asn1.result["tbsCertList.signature"] });
		this.issuer = new _RelativeDistinguishedNames2.default({ schema: asn1.result["tbsCertList.issuer"] });
		this.thisUpdate = new _Time2.default({ schema: asn1.result["tbsCertList.thisUpdate"] });
		if ("tbsCertList.nextUpdate" in asn1.result) this.nextUpdate = new _Time2.default({ schema: asn1.result["tbsCertList.nextUpdate"] });
		if ("tbsCertList.revokedCertificates" in asn1.result) this.revokedCertificates = Array.from(asn1.result["tbsCertList.revokedCertificates"], element => new _RevokedCertificate2.default({ schema: element }));
		if ("tbsCertList.extensions" in asn1.result) this.crlExtensions = new _Extensions2.default({ schema: asn1.result["tbsCertList.extensions"] });

		this.signatureAlgorithm = new _AlgorithmIdentifier2.default({ schema: asn1.result.signatureAlgorithm });
		this.signatureValue = asn1.result.signatureValue;
		//endregion
	}
	//**********************************************************************************
	encodeTBS() {
		//region Create array for output sequence
		const outputArray = [];

		if (this.version !== CertificateRevocationList.defaultValues("version")) outputArray.push(new asn1js.Integer({ value: this.version }));

		outputArray.push(this.signature.toSchema());
		outputArray.push(this.issuer.toSchema());
		outputArray.push(this.thisUpdate.toSchema());

		if ("nextUpdate" in this) outputArray.push(this.nextUpdate.toSchema());

		if ("revokedCertificates" in this) {
			outputArray.push(new asn1js.Sequence({
				value: Array.from(this.revokedCertificates, element => element.toSchema())
			}));
		}

		if ("crlExtensions" in this) {
			outputArray.push(new asn1js.Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [this.crlExtensions.toSchema()]
			}));
		}
		//endregion

		return new asn1js.Sequence({
			value: outputArray
		});
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema(encodeFlag = false) {
		//region Decode stored TBS value
		let tbsSchema;

		if (encodeFlag === false) {
			if (this.tbs.length === 0) // No stored TBS part
				return CertificateRevocationList.schema();

			tbsSchema = asn1js.fromBER(this.tbs).result;
		}
		//endregion
		//region Create TBS schema via assembling from TBS parts
		else tbsSchema = this.encodeTBS();
		//endregion

		//region Construct and return new ASN.1 schema for this object
		return new asn1js.Sequence({
			value: [tbsSchema, this.signatureAlgorithm.toSchema(), this.signatureValue]
		});
		//endregion
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		const object = {
			tbs: (0, _pvutils.bufferToHexCodes)(this.tbs, 0, this.tbs.byteLength),
			signature: this.signature.toJSON(),
			issuer: this.issuer.toJSON(),
			thisUpdate: this.thisUpdate.toJSON(),
			signatureAlgorithm: this.signatureAlgorithm.toJSON(),
			signatureValue: this.signatureValue.toJSON()
		};

		if (this.version !== CertificateRevocationList.defaultValues("version")) object.version = this.version;

		if ("nextUpdate" in this) object.nextUpdate = this.nextUpdate.toJSON();

		if ("revokedCertificates" in this) object.revokedCertificates = Array.from(this.revokedCertificates, element => element.toJSON());

		if ("crlExtensions" in this) object.crlExtensions = this.crlExtensions.toJSON();

		return object;
	}
	//**********************************************************************************
	isCertificateRevoked(certificate) {
		//region Check that issuer of the input certificate is the same with issuer of this CRL
		if (this.issuer.isEqual(certificate.issuer) === false) return false;
		//endregion

		//region Check that there are revoked certificates in this CRL
		if ("revokedCertificates" in this === false) return false;
		//endregion

		//region Search for input certificate in revoked certificates array
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = this.revokedCertificates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				const revokedCertificate = _step.value;

				if (revokedCertificate.userCertificate.isEqual(certificate.serialNumber)) return true;
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

		return false;
	}
	//**********************************************************************************
	/**
  * Make a signature for existing CRL data
  * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
  * @param {string} [hashAlgorithm] Hashing algorithm. Default SHA-1
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
			this.signature = result.signatureAlgorithm;
			this.signatureAlgorithm = result.signatureAlgorithm;
		});
		//endregion

		//region Create TBS data for signing
		sequence = sequence.then(() => {
			this.tbs = this.encodeTBS().toBER(false);
		});
		//endregion

		//region Signing TBS data on provided private key
		sequence = sequence.then(() => engine.subtle.signWithPrivateKey(this.tbs, privateKey, parameters));

		sequence = sequence.then(result => {
			this.signatureValue = new asn1js.BitString({ valueHex: result });
		});
		//endregion

		return sequence;
	}
	//**********************************************************************************
	/**
  * Verify existing signature
  * @param {{[issuerCertificate]: Object, [publicKeyInfo]: Object}} parameters
  * @returns {*}
  */
	verify(parameters = {}) {
		//region Global variables
		let sequence = Promise.resolve();

		let subjectPublicKeyInfo = -1;

		const engine = (0, _common.getEngine)();
		//endregion

		//region Get information about CRL issuer certificate
		if ("issuerCertificate" in parameters) // "issuerCertificate" must be of type "Certificate"
			{
				subjectPublicKeyInfo = parameters.issuerCertificate.subjectPublicKeyInfo;

				// The CRL issuer name and "issuerCertificate" subject name are not equal
				if (this.issuer.isEqual(parameters.issuerCertificate.subject) === false) return Promise.resolve(false);
			}

		//region In case if there is only public key during verification
		if ("publicKeyInfo" in parameters) subjectPublicKeyInfo = parameters.publicKeyInfo; // Must be of type "PublicKeyInfo"
		//endregion

		if ("subjectPublicKey" in subjectPublicKeyInfo === false) return Promise.reject("Issuer's certificate must be provided as an input parameter");
		//endregion

		//region Check the CRL for unknown critical extensions
		if ("crlExtensions" in this) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.crlExtensions.extensions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					const extension = _step2.value;

					if (extension.critical) {
						// We can not be sure that unknown extension has no value for CRL signature
						if ("parsedValue" in extension === false) return Promise.resolve(false);
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
		}
		//endregion

		sequence = sequence.then(() => engine.subtle.verifyWithPublicKey(this.tbs, this.signatureValue, subjectPublicKeyInfo, this.signatureAlgorithm));

		return sequence;
	}
	//**********************************************************************************
}
exports.default = CertificateRevocationList; //**************************************************************************************
//# sourceMappingURL=CertificateRevocationList.js.map