var fa = (function () {
    "use strict";
    var events = [];

    var maxWidth = window.innerWidth;
    var maxHeight = window.innerHeight;
    var url = 'http://192.168.2.239:8080';
    var $document = $(document);
    var location = 'file:///Users/dkareep/Documents/projects/Portfolio/Furelenco/index.html';
    function setLocation(value) {
        return location = value;
    }
    var $window = $(window);
    var $input = $(document).find('input');

    var innerHeight = $window.innerHeight();
    var timer = null;
    var scrollY;
    setInterval(ApiCall, 10 * 1000);

    setInterval(pathName, 8 * 1000);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    function pathName() {
        var newLocation = window.location.href;
        if (newLocation !== location) {
            if (newLocation.indexOf('?ref=') > -1) {
                var refCode = newLocation.substr(newLocation.indexOf("?ref=") + 5).trim();
                eventPusher('ref', refCode);
            } else {
                var page = newLocation.substr(newLocation.indexOf("/index.html") + 11).trim();
                console.log(page);
                eventPusher('page', page);
            }
        }
    }

    function showPosition(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        var LatLng = position.coords.latitude + ',' + position.coords.longitude;
        eventPusher('latlng', LatLng);
    }

    $document.mouseup(function () {
        getSelectedText();
    });
    $window.on('scroll', function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            scrollY = window.pageYOffset + innerHeight;
            eventPusher('scrollMap', scrollY);
        }, 250)

    });

    $input.on('change keyup paste input', function (e) {
        var inputVal = e.target.value;
        if (inputVal.length > 6) {
            eventPusher('input', inputVal);
        }
    });
    $document.on('click', function (e) {
        var xValue = (e.pageX / maxWidth) * 100;
        var xPercentage = parseInt(xValue, 10);
        var yValue = (e.pageY / maxHeight) * 100;
        var yPercentage = parseInt(yValue, 10);

        if (e.target.nodeName !== 'BUTTON') {
            var button = $(e.target.nodeName).find('button' || 'div');
            if (button) {
                console.log(button.prevObject[0].id);
                eventPusher('click', button.prevObject[0].id);
            }
        }else {
            eventPusher('click',e.target.id);
        }
        if (xPercentage && yPercentage) {
            var heatMap = xPercentage + ',' + yPercentage + ',' + maxWidth + ',' + maxHeight;
            console.log(heatMap, 'Heatmap');
            eventPusher('heatmap', heatMap);
        }
    });
    function eventPusher(metricName, metricValue) {
        var eventObject = {
            "login": "siteuser3",
            "adminId": 2,
            "metricName": metricName,
            "metricValue": metricValue,
            "actionTime": moment().unix() * 1000
        };
        events.push(eventObject);
    }

    function getSelectedText() {
        if (window.getSelection) {
            var windowTrim = window.getSelection().toString().trim();
            if (windowTrim.length > 3) {
                //length shortened to 120 - db is set to 120 char
                var slicedWindow = windowTrim.slice(120);
                return eventPusher('select', slicedWindow);
            } else if (document.selection) {
                var DocumentTrim = document.selection.createRange().text.trim();
                if (DocumentTrim.length > 3) {
                    var slicedDocument = DocumentTrim.slice(120);
                    return eventPusher('select', slicedDocument);
                }
            }
            return '';
        }
    }

    function ApiCall() {

        $.ajax({
            type: 'POST',
            url: url + '/furlenco-server/api/addMetric',
            data: JSON.stringify({"request": events}),
            headers: {'Content-Type': 'application/json'},
            beforeSend: function () {
                console.log(events);
            },
            success: function (data) {
                console.log(data);
                events = [];
            },
            error: function (data) {
                console.log(data)
            }
        })
    }

    /*
     //button implementation without heatmap
     function buttOnClick(e) {
     eventPusher('click', e.target.id);
     }

     function onClickAttach(value) {
     value.map(function (val) {
     var $el = $document.find(val)[0];
     $el.addEventListener("click", function (e) {
     buttOnClick(e);
     });
     });
     }
     */
    return {
        ApiCall: ApiCall,
        setLocation: setLocation
        //onClickAttach: onClickAttach,
    }

})();

//fa.onClickAttach(['div', 'button']);
fa.setLocation('http://localhost:63342/Furelenco/index.html');