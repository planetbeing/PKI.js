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
 * Class from RFC5480
 */
class ECPublicKey {
	//**********************************************************************************
	/**
  * Constructor for ECCPublicKey class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {ArrayBuffer}
   * @desc type
   */
		this.x = (0, _pvutils.getParametersValue)(parameters, "x", ECPublicKey.defaultValues("x"));
		/**
   * @type {ArrayBuffer}
   * @desc values
   */
		this.y = (0, _pvutils.getParametersValue)(parameters, "y", ECPublicKey.defaultValues("y"));
		/**
   * @type {string}
   * @desc namedCurve
   */
		this.namedCurve = (0, _pvutils.getParametersValue)(parameters, "namedCurve", ECPublicKey.defaultValues("namedCurve"));
		//endregion

		//region If input argument array contains "schema" for this object
		if ("schema" in parameters) this.fromSchema(parameters.schema);
		//endregion
		//region If input argument array contains "json" for this object
		if ("json" in parameters) this.fromJSON(parameters.json);
		//endregion
	}
	//**********************************************************************************
	/**
  * Return default values for all class members
  * @param {string} memberName String name for a class member
  */
	static defaultValues(memberName) {
		switch (memberName) {
			case "x":
			case "y":
				return new ArrayBuffer(0);
			case "namedCurve":
				return "";
			default:
				throw new Error(`Invalid member name for ECCPublicKey class: ${memberName}`);
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
			case "x":
			case "y":
				return (0, _pvutils.isEqualBuffer)(memberValue, ECPublicKey.defaultValues(memberName));
			case "namedCurve":
				return memberValue === "";
			default:
				throw new Error(`Invalid member name for ECCPublicKey class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		return new asn1js.RawData();
	}
	//**********************************************************************************
	/**
  * Convert ArrayBuffer into current class
  * @param {!ArrayBuffer} schema Special case: schema is an ArrayBuffer
  */
	fromSchema(schema) {
		//region Check the schema is valid
		if (schema instanceof ArrayBuffer === false) throw new Error("Object's schema was not verified against input data for ECPublicKey");

		const view = new Uint8Array(schema);
		if (view[0] !== 0x04) throw new Error("Object's schema was not verified against input data for ECPublicKey");
		//endregion

		//region Get internal properties from parsed schema
		let coordinateLength;

		switch (this.namedCurve) {
			case "1.2.840.10045.3.1.7":
				// P-256
				coordinateLength = 32;
				break;
			case "1.3.132.0.34":
				// P-384
				coordinateLength = 48;
				break;
			case "1.3.132.0.35":
				// P-521
				coordinateLength = 66;
				break;
			default:
				throw new Error(`Incorrect curve OID: ${this.namedCurve}`);
		}

		if (schema.byteLength !== coordinateLength * 2 + 1) throw new Error("Object's schema was not verified against input data for ECPublicKey");

		this.x = schema.slice(1, coordinateLength + 1);
		this.y = schema.slice(1 + coordinateLength, coordinateLength * 2 + 1);
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		return new asn1js.RawData({ data: (0, _pvutils.utilConcatBuf)(new Uint8Array([0x04]).buffer, this.x, this.y)
		});
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		let crvName = "";

		switch (this.namedCurve) {
			case "1.2.840.10045.3.1.7":
				// P-256
				crvName = "P-256";
				break;
			case "1.3.132.0.34":
				// P-384
				crvName = "P-384";
				break;
			case "1.3.132.0.35":
				// P-521
				crvName = "P-521";
				break;
			default:
		}

		return {
			crv: crvName,
			x: (0, _pvutils.toBase64)((0, _pvutils.arrayBufferToString)(this.x), true, true, false),
			y: (0, _pvutils.toBase64)((0, _pvutils.arrayBufferToString)(this.y), true, true, false)
		};
	}
	//**********************************************************************************
	/**
  * Convert JSON value into current object
  * @param {Object} json
  */
	fromJSON(json) {
		let coodinateLength = 0;

		if ("crv" in json) {
			switch (json.crv.toUpperCase()) {
				case "P-256":
					this.namedCurve = "1.2.840.10045.3.1.7";
					coodinateLength = 32;
					break;
				case "P-384":
					this.namedCurve = "1.3.132.0.34";
					coodinateLength = 48;
					break;
				case "P-521":
					this.namedCurve = "1.3.132.0.35";
					coodinateLength = 66;
					break;
				default:
			}
		} else throw new Error("Absent mandatory parameter \"crv\"");

		if ("x" in json) {
			const convertBuffer = (0, _pvutils.stringToArrayBuffer)((0, _pvutils.fromBase64)(json.x, true));

			if (convertBuffer.byteLength < coodinateLength) {
				this.x = new ArrayBuffer(coodinateLength);
				const view = new Uint8Array(this.x);
				const convertBufferView = new Uint8Array(convertBuffer);
				view.set(convertBufferView, 1);
			} else this.x = convertBuffer.slice(0, coodinateLength);
		} else throw new Error("Absent mandatory parameter \"x\"");

		if ("y" in json) {
			const convertBuffer = (0, _pvutils.stringToArrayBuffer)((0, _pvutils.fromBase64)(json.y, true));

			if (convertBuffer.byteLength < coodinateLength) {
				this.y = new ArrayBuffer(coodinateLength);
				const view = new Uint8Array(this.y);
				const convertBufferView = new Uint8Array(convertBuffer);
				view.set(convertBufferView, 1);
			} else this.y = convertBuffer.slice(0, coodinateLength);
		} else throw new Error("Absent mandatory parameter \"y\"");
	}
	//**********************************************************************************
}
exports.default = ECPublicKey; //**************************************************************************************
//# sourceMappingURL=ECPublicKey.js.map