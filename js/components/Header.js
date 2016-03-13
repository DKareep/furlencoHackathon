var React = require('react');
var ReactDOM = require('react-dom');
var Header = React.createClass({
    render: function () {
        return (
            <div>
            <nav className="header-nav">

                <a href="#" data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu"
                    ></i></a>

                <div className="sp-top-right-content-left-inbox-text">

                </div>

                <ul id="slide-out" className="side-nav">
                    <li className="fs"><a href="#!">First Sidebar Link</a></li>
                    <li><a href="#!">Second Sidebar Link</a></li>
                </ul>

                <div className="sp-top-right-content-right-inbox-text">
                    <div id="info-show-hide" className="infoicon"><a href="#" className="material-icons nav-link-fix">info</a></div>
                    <div className="material-icons notificon"><a className="material-icons nav-link-fix" href="#">notifications</a>
                    </div>

                    <i className=" cursor material-icons dropdown-button" data-beloworigin="true" data-activates='dropdown1'>more_vert</i>

                    <ul id='dropdown1' className='dropdown-content'>
                        <li><a href="#!">one</a></li>
                        <li><a href="#!">two</a></li>
                        <li className="divider"></li>
                        <li><a href="#!">three</a></li>
                    </ul>
                </div>
            </nav>
            </div>
        );
    }
});
module.exports = Header;
