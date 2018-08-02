# Declarative React Component

A helper for creating React components using a simpler, declarative
syntax.  The module exposes a function `DeclarativeReactComponent`.  DeclarativeReactComponent
accepts a config object and returns a reusable component class.

## Usage

Using DeclarativeReactComponent, we will still create components in
.jsx files.  Consider the following example, which is a complete
.jsx file for creating a component called ExampleComponent.

```
// example-component.jsx
import React, { Component } from "react";
import {DeclarativeReactComponent} from "declarative-react-component"

export default DeclarativeReactComponent({
  "props" : [
    "someProp"
  ],
  "data" : {
    someNumber : 0,
    someString : "room"
  },
  "methods" : {
    up : function() {
      this.someNumber++;
    },
    down : function() {
      this.someNumber--;
    },
    handleFormChange : function(newValue) {
      this.someString = newValue;
    }
  },
  "template" : function() {
    return (
      <div>
        <div>
          <h2>I'm holding the state value {this.someNumber} and the prop {this.someProp}.</h2>
          <button
            type = "button"
            onClick = {this.up}
          >Add 1</button>
          <button
            type = "button"
            onClick = {this.down}
          >Subtract 1</button>
        </div>
        <div>
          <h2>I'm also holding the string: {this.someString}</h2>
          <p>
            <input type = "text" value = {this.someString} onChange={(e)=>this.handleFormChange(e.target.value)}></input>
          </p>
        </div>
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

### DeclarativeReactComponent and configObject

The function `DeclarativeReactComponent` requires just one argument: the
configuration object, which henceforth we call `configObject`.

### props

The names of props must be declared in `configObject.props` as an
array of strings.  If a prop is not declared here, it will not be
available on `this`;

### data

The keys and values declared in `configObject.data` get transformed
into properties on the React component's `state` object, but this is
something you do not need to worry about.  It works automagically.  Any
change made to elements inside `data` will pass through and cause
re-rendering as they usually do in React.

### methods

Each method declared inside `configObject.methods` gets attached directly
to `this`.  Methods can mutate values from `configObject.data`
but they may not mutate values from `configObject.props`.

Actually, methods do not have direct access to the entire object. For
example, it is not possible for one method to overwrite another method.
Methods have access to read/write data and to read-only props, and they
can access anything explicitly passed in as an argument.

### template

The value of `configObject.template` should be a function much like
the usual `render` function in a React component class.  The primary
difference is that in our template function `this` refers to a limited
object that will only allow us to alter elements declared or defined
in the configObject.

## License

This project and its source code are released under the MIT license.
For details, see [LICENSE](LICENSE).
