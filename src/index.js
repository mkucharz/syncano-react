import Syncano from "syncano";

export class SyncanoReact {
  constructor(syncanoInstance, APIkey, component) {
    this.syncanoInstance = new Syncano({
      apiKey: APIkey,
      instance: syncanoInstance
    });

    if (component) {
      this.component = component
    }
    return this;
  }

  connectState(argNameInState, syncanoObjectDef) {

    let syncanoClass = syncanoObjectDef.syncanoClass;
    let dataObjectId = syncanoObjectDef.objectId;
    let component = this.component;

    this.syncanoInstance.class(syncanoClass).dataobject(dataObjectId).detail().then((dataObject) => {

      let args = {};
      args[argNameInState] = dataObject;
      component.setState(args);

      let channel = dataObject.channel;
      let realtime = this.syncanoInstance.channel(channel).watch();

      realtime.on('update', (data) => {
        args = {};
        args[argNameInState] = Object.assign(component.state[argNameInState], data);
        component.setState(args);
      });
    });
  }
}

export function Mixin(syncanoInstance, APIkey) {

  function connectState(argNameInState, syncanoObjectDef) {
    let syncano = new SyncanoReact(syncanoInstance, APIkey, this);

    syncano.connectState(argNameInState, syncanoObjectDef);
    return syncano;
  }
  return {
    connectState: connectState
  }
}
