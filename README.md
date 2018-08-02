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

### ReactObjectComponent and configObject

The function `ReactObjectComponent` requires just one argument: the
configuration object, which henceforth we call `configObject`.

### props

The names of props must be declared in `configObject.props` as an
array of strings.  If a prop is not declared here, it will not be
available on the `self` object.

### data

The keys and values declared in `configObject.data` get transformed
into properties on the React component's `state` object, but this is
something you do not need to worry about.  It works automagically.  Any
change made to elements inside `data` will pass through and cause
re-rendering as they usually do in React.

### methods

Each method declared inside `configObject.methods` must accept `self`
as its first argument.  Methods can mutate values from `configObject.data`
but they may not mutate values from `configObject.props`.  In particular,
we discourage any reference to `this` inside your methods.

### template

The value of `configObject.template` should be a function much like
the usual `render` function in a React component class.  The primary
difference is that template must accept `self` as its first argument
and all references to methods, props, and data should reference `self`.

In particular, we discourage any reference to `this` inside the
template function.  Everything referenced in the template function
should be declared or defined in the configObject.
