# Syncano-React - React wrapper for Syncano JS library

## Installation
 
```
npm install git+https://git@github.com/mkucharz/syncano-react.git
``` 

## Using mixin

```
import React from 'react';
import { Mixin } from 'syncano-react';

export default React.createClass({
  displayName: 'Test',

  mixins: [Mixin('dry-glitter-4206', '849d42539b5a3820fc7ee84243cb8a37a65824a5')],

  getInitialState() {
    return {color: null};
  },

  componentDidMount() {
    this.connectState('color', {syncanoClass: 'color', objectId: 1283});
  },

  render() {
    return (
      <div>
        <pre>{this.state.color ? JSON.stringify(this.state.color, null, 2) : 'No object'}</pre>
      </div>
    );
  }
});
```