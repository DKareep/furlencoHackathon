var React = require('react');
var ReactDOM = require('react-dom');
var LeftNav = React.createClass({
    componentDidMount: function() {
        "use strict";
        console.log('rada');
    },
    render: function () {
        return (
            <div className="sp-left-nav  p5">
                <div className="sp-left-profile-icon">
                    <div className="conta ">
                        <i className="material-icons cb ">insert_emoticon</i>
                    </div>
                </div>
                <div className="sp-left-chat-chart">
                    <div className="conta ">
                        <i className="material-icons cb ">chat_bubble</i>
                    </div>
                    <div className="conta ">
                        <i className="material-icons cb ">insert_chart</i>
                    </div>
                </div>
                <div className="sp-left-divider"></div>

                <div className="sp-left-setting-help">
                    <div className="conta ">
                        <i className="material-icons cb ">settings</i>
                    </div>
                    <div className="conta ">
                        <i className="material-icons cb ">help_outline</i>
                    </div>
                </div>
            </div>

        );
    }
});
module.exports = LeftNav;
