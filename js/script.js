var fa = (function () {
    "use strict";
    var events = [];
    var search = [];
    var maxWidth = window.innerWidth;
    var maxHeight = window.innerHeight;
    var url = 'http://192.168.2.239:8080';
    var onClickAttachElements = [];

    var $document = $(document);


    var $body = $('body');
    var $window = $(window);
    var $button = $(document).find('button')[0];
    var $div = $(document).find('div')[0];
    var myTimeout;
    var innerHeight =  $window.innerHeight();
    var timer = null;
    var scrollY;
    setInterval(ApiCall, 20 * 1000);
    $document.mouseup(function () {
        getSelectedText();
    });
    $window.on('scroll', function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            scrollY= window.pageYOffset + innerHeight;


        }, 250)

    });
    $document.on('click', function (e) {
        var xValue = (e.pageX / maxWidth) * 100;
        var xPercentage = parseInt(xValue, 10);
        var yValue = (e.pageY / maxHeight) * 100;
        var yPercentage = parseInt(yValue, 10);
        if (xPercentage && yPercentage) {
            var heatMap = [xPercentage, yPercentage, maxWidth, maxHeight];
            console.log(heatMap, 'Heatmap');
            eventPusher('heatmap', heatMap);
        }
    });

    //$document.mouseenter(function (e) {
    //    myTimeout = setTimeout(function() {
    //        hover(e);
    //    }, 500);
    //}).mouseleave(function() {
    //    clearTimeout(myTimeout);
    //});
    function hover(e) {
        console.log(e.target);
    }

    function setOnClick() {

    }

    function eventPusher(metricName, metricValue) {
        var eventObject = {
            "login": "siteuser3",
            "adminId": 2,
            "metricName": metricName,
            "metricValue": metricValue,
            "actionTime": moment().unix() * 1000
        };
        return events.push(eventObject);
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
        if (events.length > 0) {
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
                },
                error: function (data) {
                    console.log(data)
                }
            })
        }
    }

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

    return {
        ApiCall: ApiCall,
        onClickAttach: onClickAttach
    }

})();

fa.onClickAttach(['div', 'button']);