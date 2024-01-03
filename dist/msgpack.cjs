var msgpack = require('@msgpack/msgpack');
var createDebug = require('debug');
var eventemitter3 = require('eventemitter3');
var WebSocketIpml = require('isomorphic-ws');
var sha256 = require('crypto-js/sha256.js');
var Base64 = require('crypto-js/enc-base64.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var createDebug__default = /*#__PURE__*/_interopDefaultLegacy(createDebug);
var WebSocketIpml__default = /*#__PURE__*/_interopDefaultLegacy(WebSocketIpml);
var sha256__default = /*#__PURE__*/_interopDefaultLegacy(sha256);
var Base64__default = /*#__PURE__*/_interopDefaultLegacy(Base64);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

exports.WebSocketOpCode = void 0;
(function (WebSocketOpCode) {
  /**
   * The initial message sent by obs-websocket to newly connected clients.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Hello"] = 0] = "Hello";
  /**
   * The message sent by a newly connected client to obs-websocket in response to a `Hello`.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Identify"] = 1] = "Identify";
  /**
   * The response sent by obs-websocket to a client after it has successfully identified with obs-websocket.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Identified"] = 2] = "Identified";
  /**
   * The message sent by an already-identified client to update identification parameters.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Reidentify"] = 3] = "Reidentify";
  /**
   * The message sent by obs-websocket containing an event payload.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Event"] = 5] = "Event";
  /**
   * The message sent by a client to obs-websocket to perform a request.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Request"] = 6] = "Request";
  /**
   * The message sent by obs-websocket in response to a particular request from a client.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["RequestResponse"] = 7] = "RequestResponse";
  /**
   * The message sent by a client to obs-websocket to perform a batch of requests.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["RequestBatch"] = 8] = "RequestBatch";
  /**
   * The message sent by obs-websocket in response to a particular batch of requests from a client.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["RequestBatchResponse"] = 9] = "RequestBatchResponse";
})(exports.WebSocketOpCode || (exports.WebSocketOpCode = {}));
/* eslint-disable no-bitwise, @typescript-eslint/prefer-literal-enum-member */
exports.EventSubscription = void 0;
(function (EventSubscription) {
  /**
   * Subcription value used to disable all events.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["None"] = 0] = "None";
  /**
   * Subscription value to receive events in the `General` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["General"] = 1] = "General";
  /**
   * Subscription value to receive events in the `Config` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Config"] = 2] = "Config";
  /**
   * Subscription value to receive events in the `Scenes` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Scenes"] = 4] = "Scenes";
  /**
   * Subscription value to receive events in the `Inputs` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Inputs"] = 8] = "Inputs";
  /**
   * Subscription value to receive events in the `Transitions` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Transitions"] = 16] = "Transitions";
  /**
   * Subscription value to receive events in the `Filters` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Filters"] = 32] = "Filters";
  /**
   * Subscription value to receive events in the `Outputs` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Outputs"] = 64] = "Outputs";
  /**
   * Subscription value to receive events in the `SceneItems` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["SceneItems"] = 128] = "SceneItems";
  /**
   * Subscription value to receive events in the `MediaInputs` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["MediaInputs"] = 256] = "MediaInputs";
  /**
   * Subscription value to receive the `VendorEvent` event.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Vendors"] = 512] = "Vendors";
  /**
   * Subscription value to receive events in the `Ui` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Ui"] = 1024] = "Ui";
  /**
   * Helper to receive all non-high-volume events.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["All"] = 2047] = "All";
  /**
   * Subscription value to receive the `InputVolumeMeters` high-volume event.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["InputVolumeMeters"] = 65536] = "InputVolumeMeters";
  /**
   * Subscription value to receive the `InputActiveStateChanged` high-volume event.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["InputActiveStateChanged"] = 131072] = "InputActiveStateChanged";
  /**
   * Subscription value to receive the `InputShowStateChanged` high-volume event.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["InputShowStateChanged"] = 262144] = "InputShowStateChanged";
  /**
   * Subscription value to receive the `SceneItemTransformChanged` high-volume event.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["SceneItemTransformChanged"] = 524288] = "SceneItemTransformChanged";
})(exports.EventSubscription || (exports.EventSubscription = {}));
/* eslint-enable no-bitwise, @typescript-eslint/prefer-literal-enum-member */
exports.RequestBatchExecutionType = void 0;
(function (RequestBatchExecutionType) {
  /**
   * Not a request batch.
   *
   * Initial OBS Version: 5.0.0
   */
  RequestBatchExecutionType[RequestBatchExecutionType["None"] = -1] = "None";
  /**
   * A request batch which processes all requests serially, as fast as possible.
   *
   * Note: To introduce artificial delay, use the `Sleep` request and the `sleepMillis` request field.
   *
   * Initial OBS Version: 5.0.0
   */
  RequestBatchExecutionType[RequestBatchExecutionType["SerialRealtime"] = 0] = "SerialRealtime";
  /**
   * A request batch type which processes all requests serially, in sync with the graphics thread. Designed to provide high accuracy for animations.
   *
   * Note: To introduce artificial delay, use the `Sleep` request and the `sleepFrames` request field.
   *
   * Initial OBS Version: 5.0.0
   */
  RequestBatchExecutionType[RequestBatchExecutionType["SerialFrame"] = 1] = "SerialFrame";
  /**
   * A request batch type which processes all requests using all available threads in the thread pool.
   *
   * Note: This is mainly experimental, and only really shows its colors during requests which require lots of
   * active processing, like `GetSourceScreenshot`.
   *
   * Initial OBS Version: 5.0.0
   */
  RequestBatchExecutionType[RequestBatchExecutionType["Parallel"] = 2] = "Parallel";
})(exports.RequestBatchExecutionType || (exports.RequestBatchExecutionType = {}));

/**
 * SHA256 Hashing.
 * @param  {string} [salt=''] salt.
 * @param  {string} [challenge=''] challenge.
 * @param  {string} msg Message to encode.
 * @returns {string} sha256 encoded string.
 */
function authenticationHashing (salt, challenge, msg) {
  var hash = Base64__default["default"].stringify(sha256__default["default"](msg + salt));
  return Base64__default["default"].stringify(sha256__default["default"](hash + challenge));
}

var _excluded = ["authentication", "rpcVersion"];
function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
var debug = createDebug__default["default"]('obs-websocket-js');
var OBSWebSocketError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(OBSWebSocketError, _Error);
  function OBSWebSocketError(code, message) {
    var _this;
    _this = _Error.call(this, message) || this;
    _this.code = void 0;
    _this.code = code;
    return _this;
  }
  return OBSWebSocketError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var BaseOBSWebSocket = /*#__PURE__*/function (_EventEmitter) {
  _inheritsLoose(BaseOBSWebSocket, _EventEmitter);
  function BaseOBSWebSocket() {
    var _this2;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _EventEmitter.call.apply(_EventEmitter, [this].concat(args)) || this;
    _this2._identified = false;
    _this2.internalListeners = new eventemitter3.EventEmitter();
    _this2.socket = void 0;
    return _this2;
  }
  BaseOBSWebSocket.generateMessageId = function generateMessageId() {
    return String(BaseOBSWebSocket.requestCounter++);
  };
  var _proto = BaseOBSWebSocket.prototype;
  /**
   * Connect to an obs-websocket server
   * @param url Websocket server to connect to (including ws:// or wss:// protocol)
   * @param password Password
   * @param identificationParams Data for Identify event
   * @returns Hello & Identified messages data (combined)
   */
  _proto.connect = function connect(url, password, identificationParams) {
    if (url === void 0) {
      url = 'ws://127.0.0.1:4455';
    }
    if (identificationParams === void 0) {
      identificationParams = {};
    }
    try {
      var _temp2 = function _temp2() {
        return _catch(function () {
          var connectionClosedPromise = _this3.internalEventPromise('ConnectionClosed');
          var connectionErrorPromise = _this3.internalEventPromise('ConnectionError');
          return Promise.resolve(Promise.race([function () {
            try {
              return Promise.resolve(_this3.createConnection(url)).then(function (hello) {
                _this3.emit('Hello', hello);
                return _this3.identify(hello, password, identificationParams);
              });
            } catch (e) {
              return Promise.reject(e);
            }
          }(),
          // Choose the best promise for connection error/close
          // In browser connection close has close code + reason,
          // while in node error event has these
          new Promise(function (resolve, reject) {
            void connectionErrorPromise.then(function (e) {
              if (e.message) {
                reject(e);
              }
            });
            void connectionClosedPromise.then(function (e) {
              reject(e);
            });
          })]));
        }, function (error) {
          return Promise.resolve(_this3.disconnect()).then(function () {
            throw error;
          });
        });
      };
      var _this3 = this;
      var _temp = function () {
        if (_this3.socket) {
          return Promise.resolve(_this3.disconnect()).then(function () {});
        }
      }();
      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Disconnect from obs-websocket server
   */
  ;
  _proto.disconnect = function disconnect() {
    try {
      var _this4 = this;
      if (!_this4.socket || _this4.socket.readyState === WebSocketIpml__default["default"].CLOSED) {
        return Promise.resolve();
      }
      var connectionClosedPromise = _this4.internalEventPromise('ConnectionClosed');
      _this4.socket.close();
      return Promise.resolve(connectionClosedPromise).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Update session parameters
   * @param data Reidentify data
   * @returns Identified message data
   */
  ;
  _proto.reidentify = function reidentify(data) {
    try {
      var _this5 = this;
      var identifiedPromise = _this5.internalEventPromise("op:" + exports.WebSocketOpCode.Identified);
      return Promise.resolve(_this5.message(exports.WebSocketOpCode.Reidentify, data)).then(function () {
        return identifiedPromise;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Send a request to obs-websocket
   * @param requestType Request name
   * @param requestData Request data
   * @returns Request response
   */
  ;
  _proto.call = function call(requestType, requestData) {
    try {
      var _this6 = this;
      var requestId = BaseOBSWebSocket.generateMessageId();
      var responsePromise = _this6.internalEventPromise("res:" + requestId);
      return Promise.resolve(_this6.message(exports.WebSocketOpCode.Request, {
        requestId: requestId,
        requestType: requestType,
        requestData: requestData
      })).then(function () {
        return Promise.resolve(responsePromise).then(function (_ref) {
          var requestStatus = _ref.requestStatus,
            responseData = _ref.responseData;
          if (!requestStatus.result) {
            throw new OBSWebSocketError(requestStatus.code, requestStatus.comment);
          }
          return responseData;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Send a batch request to obs-websocket
   * @param requests Array of Request objects (type and data)
   * @param options A set of options for how the batch will be executed
   * @param options.executionType The mode of execution obs-websocket will run the batch in
   * @param options.haltOnFailure Whether obs-websocket should stop executing the batch if one request fails
   * @returns RequestBatch response
   */
  ;
  _proto.callBatch = function callBatch(requests, options) {
    if (options === void 0) {
      options = {};
    }
    try {
      var _this7 = this;
      var requestId = BaseOBSWebSocket.generateMessageId();
      var responsePromise = _this7.internalEventPromise("res:" + requestId);
      return Promise.resolve(_this7.message(exports.WebSocketOpCode.RequestBatch, _extends({
        requestId: requestId,
        requests: requests
      }, options))).then(function () {
        return Promise.resolve(responsePromise).then(function (_ref2) {
          var results = _ref2.results;
          return results;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Cleanup from socket disconnection
   */
  ;
  _proto.cleanup = function cleanup() {
    if (!this.socket) {
      return;
    }
    this.socket.onopen = null;
    this.socket.onmessage = null;
    this.socket.onerror = null;
    this.socket.onclose = null;
    this.socket = undefined;
    this._identified = false;
    // Cleanup leftovers
    this.internalListeners.removeAllListeners();
  }
  /**
   * Create connection to specified obs-websocket server
   *
   * @private
   * @param url Websocket address
   * @returns Promise for hello data
   */;
  _proto.createConnection = function createConnection(url) {
    try {
      var _this8 = this;
      var connectionOpenedPromise = _this8.internalEventPromise('ConnectionOpened');
      var helloPromise = _this8.internalEventPromise("op:" + exports.WebSocketOpCode.Hello);
      _this8.socket = new WebSocketIpml__default["default"](url, _this8.protocol);
      _this8.socket.onopen = _this8.onOpen.bind(_this8);
      _this8.socket.onmessage = _this8.onMessage.bind(_this8);
      _this8.socket.onerror = _this8.onError.bind(_this8);
      _this8.socket.onclose = _this8.onClose.bind(_this8);
      return Promise.resolve(connectionOpenedPromise).then(function () {
        var _this8$socket;
        var protocol = (_this8$socket = _this8.socket) == null ? void 0 : _this8$socket.protocol;
        // Browsers don't autoclose on missing/wrong protocol
        if (!protocol) {
          throw new OBSWebSocketError(-1, 'Server sent no subprotocol');
        }
        if (protocol !== _this8.protocol) {
          throw new OBSWebSocketError(-1, 'Server sent an invalid subprotocol');
        }
        return helloPromise;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Send identify message
   *
   * @private
   * @param hello Hello message data
   * @param password Password
   * @param identificationParams Identification params
   * @returns Hello & Identified messages data (combined)
   */
  ;
  _proto.identify = function identify(_ref3, password, identificationParams) {
    var authentication = _ref3.authentication,
      rpcVersion = _ref3.rpcVersion,
      helloRest = _objectWithoutPropertiesLoose(_ref3, _excluded);
    if (identificationParams === void 0) {
      identificationParams = {};
    }
    try {
      var _this9 = this;
      // Set rpcVersion if unset
      var data = _extends({
        rpcVersion: rpcVersion
      }, identificationParams);
      if (authentication && password) {
        data.authentication = authenticationHashing(authentication.salt, authentication.challenge, password);
      }
      var identifiedPromise = _this9.internalEventPromise("op:" + exports.WebSocketOpCode.Identified);
      return Promise.resolve(_this9.message(exports.WebSocketOpCode.Identify, data)).then(function () {
        return Promise.resolve(identifiedPromise).then(function (identified) {
          _this9._identified = true;
          _this9.emit('Identified', identified);
          return _extends({
            rpcVersion: rpcVersion
          }, helloRest, identified);
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Send message to obs-websocket
   *
   * @private
   * @param op WebSocketOpCode
   * @param d Message data
   */
  ;
  _proto.message = function message(op, d) {
    try {
      var _this10 = this;
      if (!_this10.socket) {
        throw new Error('Not connected');
      }
      if (!_this10.identified && op !== 1) {
        throw new Error('Socket not identified');
      }
      return Promise.resolve(_this10.encodeMessage({
        op: op,
        d: d
      })).then(function (encoded) {
        _this10.socket.send(encoded);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Create a promise to listen for an event on internal listener
   * (will be cleaned up on disconnect)
   *
   * @private
   * @param event Event to listen to
   * @returns Event data
   */
  ;
  _proto.internalEventPromise = function internalEventPromise(event) {
    try {
      var _this11 = this;
      return Promise.resolve(new Promise(function (resolve) {
        _this11.internalListeners.once(event, resolve);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Websocket open event listener
   *
   * @private
   * @param e Event
   */
  ;
  _proto.onOpen = function onOpen(e) {
    debug('socket.open');
    this.emit('ConnectionOpened');
    this.internalListeners.emit('ConnectionOpened', e);
  }
  /**
   * Websocket message event listener
   *
   * @private
   * @param e Event
   */;
  _proto.onMessage = function onMessage(e) {
    try {
      var _this12 = this;
      return Promise.resolve(_catch(function () {
        return Promise.resolve(_this12.decodeMessage(e.data)).then(function (_ref4) {
          var op = _ref4.op,
            d = _ref4.d;
          debug('socket.message: %d %j', op, d);
          if (op === undefined || d === undefined) {
            return;
          }
          switch (op) {
            case exports.WebSocketOpCode.Event:
              {
                var eventType = d.eventType,
                  eventData = d.eventData;
                // @ts-expect-error Typescript just doesn't understand it
                _this12.emit(eventType, eventData);
                return;
              }
            case exports.WebSocketOpCode.RequestResponse:
            case exports.WebSocketOpCode.RequestBatchResponse:
              {
                var requestId = d.requestId;
                _this12.internalListeners.emit("res:" + requestId, d);
                return;
              }
            default:
              _this12.internalListeners.emit("op:" + op, d);
          }
        });
      }, function (error) {
        debug('error handling message: %o', error);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Websocket error event listener
   *
   * @private
   * @param e ErrorEvent
   */
  ;
  _proto.onError = function onError(e) {
    debug('socket.error: %o', e);
    var error = new OBSWebSocketError(-1, e.message);
    this.emit('ConnectionError', error);
    this.internalListeners.emit('ConnectionError', error);
  }
  /**
   * Websocket close event listener
   *
   * @private
   * @param e Event
   */;
  _proto.onClose = function onClose(e) {
    debug('socket.close: %s (%d)', e.reason, e.code);
    var error = new OBSWebSocketError(e.code, e.reason);
    this.emit('ConnectionClosed', error);
    this.internalListeners.emit('ConnectionClosed', error);
    this.cleanup();
  };
  _createClass(BaseOBSWebSocket, [{
    key: "identified",
    get: function get() {
      return this._identified;
    }
  }]);
  return BaseOBSWebSocket;
}(eventemitter3.EventEmitter);
BaseOBSWebSocket.requestCounter = 1;
// https://github.com/developit/microbundle/issues/531#issuecomment-575473024
// Not using ESM export due to it also being detected and breaking rollup based bundlers (vite)
if (typeof exports !== 'undefined') {
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
}

var OBSWebSocket = /*#__PURE__*/function (_BaseOBSWebSocket) {
  _inheritsLoose(OBSWebSocket, _BaseOBSWebSocket);
  function OBSWebSocket() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _BaseOBSWebSocket.call.apply(_BaseOBSWebSocket, [this].concat(args)) || this;
    _this.protocol = 'obswebsocket.msgpack';
    return _this;
  }
  var _proto = OBSWebSocket.prototype;
  _proto.encodeMessage = function encodeMessage(data) {
    try {
      return Promise.resolve(msgpack.encode(data));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.decodeMessage = function decodeMessage(data) {
    try {
      var _temp2 = function _temp2() {
        return msgpack.decode(data);
      };
      var _temp = function () {
        if (typeof Blob !== 'undefined' && data instanceof Blob) {
          return Promise.resolve(data.arrayBuffer()).then(function (_data$arrayBuffer) {
            data = _data$arrayBuffer;
          });
        }
      }();
      // Browsers provide Blob while node gives straight ArrayBuffer
      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return OBSWebSocket;
}(BaseOBSWebSocket);

exports.OBSWebSocketError = OBSWebSocketError;
exports["default"] = OBSWebSocket;
//# sourceMappingURL=msgpack.cjs.map
