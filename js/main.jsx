var React = require('react');

var App = App || {} ;

App = React.createClass({

    componentDidMount: function() {
      $('button').on('click', function(e) {
          "use strict";
          var date = new Date();
          var title = document.title;
          console.log(title, e);

      });
        $('input').on('change', function(e) {
          "use strict";
          console.log(e.target);
      });
    },
   render : function () {
       return (
           <div><h1>Tada</h1>
           <button className="btn">Click</button>
               <input type="text"></input>
           </div>
       );
   }
});

React.render(
    <App/> ,document.body
);