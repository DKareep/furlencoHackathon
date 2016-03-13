var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var Header = require('./components/Header');
var LeftNav = require('./components/LeftNav');
var DashBoard = require('./components/DashBoard');
var App = App || {} ;

App = React.createClass({

    componentDidMount: function() {

    },
   render : function () {
       return (
           <div className="sp-row-height ">
             <LeftNav />
               <Header />
               <DashBoard />

               </div>
       );
   }
});

ReactDOM.render(
    <App/> ,document.getElementById('#panel')
);