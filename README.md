# React Object Component

A helper for creating simple, declarative React components.  
It exposes a function `ReactObjectComponent`.  ReactObjectComponent
accepts a config object and returns a reusable component class.

## Usage

Using ReactObjectComponent, we will still create components in
.jsx files.  Consider the following example, which is a complete
.jsx file for creating a component called ExampleComponent.

```
// example-component.jsx
import React, { Component } from "react";
import {ReactObjectComponent} from "react-object-component"

export default ReactObjectComponent({
  "props" : [
    "someProp"
  ],
  "data" : {
    someNumber : 0
  },
  "methods" : {
    up : function(self) {
      self.someNumber++;
    },
    down : function(self) {
      self.someNumber--;
    }
  },
  "template" : function(self) {
    return (
      <div>
          <h2>I'm holding the state value {self.someNumber}
          and the prop {self.someProp}.
        </h2>
        <button
          type = "button"
          onClick = {self.up}
        >
          Add 1
        </button>
        <button
          type = "button"
          onClick = {self.down}
        >
          Subtract 1
        </button>
      </div>
    );
  }
});
```

Note that we still write the template using JSX notation, but there
are some important differences.  All props, state variables, and methods
exist in the same namespace and are all directly accessible on the
`self` object.  Props must be declared in the configuration object to
be accessible on `self`.

The result is a React component we can use in the ordinary way, such
as this.
```
import React, { Component } from "react";
import ExampleComponent from "./example-component.jsx"

class DemoApp extends Component {
  render() {
    return (
      <div>
        <div>
          <ExampleComponent someProp = "propValue"/>
        </div>
      </div>
    );
  }
}
export default DemoApp;
```
