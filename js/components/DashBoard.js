var React = require('react');
var d3 = require('d3');
var ReactDOM = require('react-dom');

var DasbBoard = React.createClass({
    getInitialState: function() {
        "use strict";
        return {
            url : 'http://192.168.2.239:8080/furlenco-server/api/retrieveByEventForSite/2/',
            latlng: []
        }
    },
    componentDidMount: function() {
        "use strict";

    },
    clickHandle: function(e) {
        "use strict";
      console.log(e.target.dataset.section);
        var clicked = e.target.dataset.section;
        $.ajax({
            type: 'GET',
            url: this.state.url + clicked,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                this.setState({
                    latlng: data
                })

            }.bind(this),
            error: function (error) {
                console.log(error)
            }.bind(this)
        })
    },
    render: function () {
        var latlng = this.state.latlng.map(function(latlng){
            "use strict";
            return(<li> {latlng['metricValue']} </li>);
        });
        return (
            <div className='dashboard container'>
                <div className="row">
                <div className="left col m4">
                    <ul className="collection">
                        <li className="collection-item" onClick={this.clickHandle} data-section="latlng">Languages</li>
                        <li className="collection-item" onClick={this.clickHandle} data-section="country">Country</li>
                        <li className="collection-item" onClick={this.clickHandle} data-section="city">City</li>


                    </ul>
                </div>

                <div className="right col m8">

                </div>
                </div>
            </div>
        );
    }
});
module.exports = DasbBoard;
