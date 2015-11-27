"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncanoReact = undefined;
exports.Mixin = Mixin;

var _syncano = require("syncano");

var _syncano2 = _interopRequireDefault(_syncano);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SyncanoReact = exports.SyncanoReact = (function () {
  function SyncanoReact(syncanoInstance, APIkey, component) {
    _classCallCheck(this, SyncanoReact);

    this.syncanoInstance = new _syncano2.default({
      apiKey: APIkey,
      instance: syncanoInstance
    });

    if (component) {
      this.component = component;
    }
    return this;
  }

  _createClass(SyncanoReact, [{
    key: "connectState",
    value: function connectState(argNameInState, syncanoObjectDef) {
      var _this = this;

      var syncanoClass = syncanoObjectDef.syncanoClass;
      var dataObjectId = syncanoObjectDef.objectId;
      var component = this.component;

      this.syncanoInstance.class(syncanoClass).dataobject(dataObjectId).detail().then(function (dataObject) {

        var args = {};
        args[argNameInState] = dataObject;
        component.setState(args);

        var channel = dataObject.channel;
        var realtime = _this.syncanoInstance.channel(channel).watch();

        realtime.on('update', function (data) {
          args = {};
          args[argNameInState] = Object.assign(component.state[argNameInState], data);
          component.setState(args);
        });
      });
    }
  }]);

  return SyncanoReact;
})();

function Mixin(syncanoInstance, APIkey) {

  function connectState(argNameInState, syncanoObjectDef) {
    var syncano = new SyncanoReact(syncanoInstance, APIkey, this);

    syncano.connectState(argNameInState, syncanoObjectDef);
    return syncano;
  }
  return {
    connectState: connectState
  };
}

//export class SyncanoReact {
//  constructor(syncanoInstance, APIkey, component) {
//    this.syncanoInstance = new Syncano({
//      apiKey: APIkey,
//      instance: syncanoInstance
//    });
//
//    if (component) {
//      this.component = component;
//    }
//    return this;
//  }
//
//  connectState(argNameInState, syncanoObjectDef) {
//    let syncanoClass = syncanoObjectDef.syncanoClass;
//    let dataObjectId = syncanoObjectDef.objectId;
//
//    let component = this.component;
//
//    let argInState = component.state[argNameInState];
//
//    console.log('xxx', component.state);
//
//    this.syncanoInstance.class(syncanoClass).dataobject(dataObjectId).detail().then((dataObject) => {
//      let args = {};
//
//      args[argNameInState] = dataObject;
//      this.component.setState(args);
//
//      let channel = dataObject.channel;
//      let realtime = this.syncanoInstance.channel(channel).watch();
//
//      realtime.on('update', (data) => {
//        args = {};
//        args[argNameInState] = Object.assign(component.state[argNameInState], data);
//        component.setState(args);
//      });
//    });
//  }
//}