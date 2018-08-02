const React = require("react");
const Component = React.Component;

module.exports.DeclarativeReactComponent = function(configObject) {
  var template = configObject.template;
  var methods = configObject.methods;
  var data = configObject.data;
  var configProps = configObject.props;
  var limitedSelf;
  var methodSelf;

  return class extends Component {
    constructor(props) {
      super(props);
      var self = this;
      limitedSelf = {};
      methodSelf = {};
      var dataKeys = Object.keys(configObject.data);
      this.state = {};
      for (let i = 0; i < dataKeys.length; i++) {
        (function(index){
          let name = dataKeys[index];
          self.state[name] = data[name];
          Object.defineProperty(limitedSelf,
            dataKeys[index],
            { set: function(val) {  self.setState( { [name] : val}); },
              get : function() {return self.state[dataKeys[index]] }
            }
          );
          Object.defineProperty(methodSelf,
            dataKeys[index],
            { set: function(val) {  self.setState( { [name] : val}); },
              get : function() {return self.state[dataKeys[index]] }
            }
          );

        })(i);
      }
      for (let i = 0; i < configProps.length; i++) {
        (function(index){
          let name = configProps[index];
          Object.defineProperty(limitedSelf,
            name,
            { set: function(val) {throw new Error("cannot change prop values")},
              get : function() {return self.props[name] }
            }
          );
          Object.defineProperty(methodSelf,
            name,
            { set: function(val) {throw new Error("cannot change prop values")},
              get : function() {return self.props[name] }
            }
          );
        })(i);
      }

      var methodKeys = Object.keys(configObject.methods);
      for (let i = 0; i < methodKeys.length; i++) {

        (function(index) {
          let theMethod = methods[methodKeys[index]];
          limitedSelf[methodKeys[index]] = (function(){
            return theMethod.apply(methodSelf, arguments);
          });
          Object.defineProperty(methodSelf,
            name,
            { set: function(val) {throw new Error("cannot change other methods here values")},
              get : function() {return limitedSelf[methodKeys[index]]}
            }
          );

        })(i);



      }

    }
    render() {
      return template.apply(limitedSelf, null);
    }
  }
}
