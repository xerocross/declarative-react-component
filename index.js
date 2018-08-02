//import React, { Component } from "react";
const React = require("react");
const Component = React.Component;

module.exports.ReactObjectComponent = function(configObject) {
  var template = configObject.template;
  var methods = configObject.methods;
  var data = configObject.data;
  var configProps = configObject.props;

  return class extends Component {
    constructor(props) {
      super(props);
      var self = this;
      var dataKeys = Object.keys(configObject.data);
      this.state = {};
      for (let i = 0; i < dataKeys.length; i++) {
        (function(index){
          let name = dataKeys[index];
          self.state[name] = data[name];
          Object.defineProperty(self,
            dataKeys[index],
            { set: function(val) {  self.setState( { [name] : val}); },
              get : function() {return self.state[dataKeys[index]] }
            }
          );
        })(i);
      }
      var methodKeys = Object.keys(configObject.methods);
      for (let i = 0; i < methodKeys.length; i++) {
        self[methodKeys[i]] = function(index){
          let theMethod = methods[methodKeys[i]];
          return (function(){
            return theMethod(self);
          });
        }(i);
      }
      for (let i = 0; i < configProps.length; i++) {
        (function(index){
          let name = configProps[index];
          Object.defineProperty(self,
            name,
            { set: function(val) {},
              get : function() {return self.props[name] }
            }
          );
        })(i);
      }
    }
    render() {
      return template(this);
    }
  }
}
