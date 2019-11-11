cheerio = require('cheerio')
$ = cheerio.load('<h2 class="title">Hello world</h2>')


// Horrible jquery replacement cludge!

var class2type = {};

var isWindow = function isWindow( obj ) {
  return obj != null && obj === obj.window;
};
var isFunction = function isFunction( obj ) {

  // Support: Chrome <=57, Firefox <=52
  // In some browsers, typeof returns "function" for HTML <object> elements
  // (i.e., `typeof document.createElement( "object" ) === "function"`).
  // We don't want to classify *any* DOM node as a function.
  return typeof obj === "function" && typeof obj.nodeType !== "number";
};

function toType( obj ) {
  if ( obj == null ) {
    return obj + "";
  }

  // Support: Android <=2.3 only (functionish RegExp)
  return typeof obj === "object" || typeof obj === "function" ?
    class2type[ toString.call( obj ) ] || "object" :
    typeof obj;
}

function isArrayLike( obj ) {

  // Support: real iOS 8.2 only (not reproducible in simulator)
  // `in` check used to prevent JIT error (gh-2145)
  // hasOwn isn't used here due to false negatives
  // regarding Nodelist length in IE
  var length = !!obj && "length" in obj && obj.length,
    type = toType( obj );

  if ( isFunction( obj ) || isWindow( obj ) ) {
    return false;
  }

  return type === "array" || length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

$.each = function (obj, callback) {
  var length, i = 0;

  if (isArrayLike(obj)) {
    length = obj.length;
    for (; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }

  return obj;
};
