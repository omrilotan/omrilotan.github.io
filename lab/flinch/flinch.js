/////////////////////
// Swipe detection //
/////////////////////
// *** Example: ***
// flinch(document.getElementById("tester"), {
//     "left": function () { alert("left") },
//     "right": function () { alert("right") },
//     "tap": function (event) { alert("tapped a " + event.target.tagName + " element") }
// }, {
//     mouseEvents: false,
//     preventDefault: true
// });

var flinch = (function __flinch__ (window) {
    "use strict";
    var getTarget = function _getTarget (event) {
            event = event || window.event;
            return event.target || event.srcElement;
        },
        preventDefault = function _preventDefault (event) {
            event = event || window.event;
            if (typeof event.preventDefault === "function") {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
            return event;
        },
        listen = function _listen (element, type, method) {
            element.addEventListener(type, method, false);
        },

        defaults = {
            options: {
                fingerCount   : 1,
                minLength     : 72,    // the shortest distance the user may swipe
                tapSensitivity: 22,    // within tap limits
                mouseEvents   : true,  // Include non-touch mouse events
                preventDefault: false
            },
            movements: {
                triggerElement: null,    // identify the triggering element
                startX        : 0,
                startY        : 0,
                curX          : 0,
                curY          : 0,
                swipeLength   : 0,
                swipeAngle    : null,
                swipeDirection: null
            },
            routines: {
                left : null,
                right: null,
                up   : null,
                down : null,
                tap  : null
            }
        },
        helpers = {
            caluculateAngle: function _caluculateAngle () {
                var X = this.movements.startX - this.movements.curX,
                    Y = this.movements.curY - this.movements.startY,
                    // Z = Math.round(Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2))), // distance rounded in pixels
                    r = Math.atan2(Y, X);    //angle in radians (Cartesian system)
                this.movements.swipeAngle = Math.round(r * 180 / Math.PI);    //angle in degrees
                if (this.movements.swipeAngle < 0) {
                    this.movements.swipeAngle = 360 - Math.abs(this.movements.swipeAngle);
                }
            },
            determineSwipeDirection: function _determineSwipeDirection () {
                if ((this.movements.swipeAngle <= 45) && (this.movements.swipeAngle >= 0)) {
                    this.movements.swipeDirection = "left";
                } else if ((this.movements.swipeAngle <= 360) && (this.movements.swipeAngle >= 315)) {
                    this.movements.swipeDirection = "left";
                } else if ((this.movements.swipeAngle >= 135) && (this.movements.swipeAngle <= 225)) {
                    this.movements.swipeDirection = "right";
                } else if ((this.movements.swipeAngle > 45) && (this.movements.swipeAngle < 135)) {
                    this.movements.swipeDirection = "down";
                } else {
                    this.movements.swipeDirection = "up";
                }
            },
            processingRoutine: function _processingRoutine (event) {
                if (typeof this.routines[this.movements.swipeDirection] === "function") {
                    this.routines[this.movements.swipeDirection](event);
                }
            }
        },
        gestures = {
            touchstart: function _touchstart (event, routines) {
                var target = getTarget(event);
                if (!!this.options.preventDefault) {
                    preventDefault(event);
                }
                this.options.fingerCount = this.options.fingerCount || event.touches.length;
                if (this.options.fingerCount === 1) {
                    this.movements.curX = this.movements.startX = event.touches[0].pageX;
                    this.movements.curY = this.movements.startY = event.touches[0].pageY;
                    this.movements.triggerElement = target;    // store the triggering element
                } else {
                    gestures.touchcancel.call(this, event);
                }
            },
            mousedown: function _mousedown (event, routines) {
                var target = getTarget(event);
                if (!!this.options.preventDefault) {
                    preventDefault(event);
                }
                this.options.fingerCount = 1;
                this.movements.curX = this.movements.startX = event.pageX;
                this.movements.curY = this.movements.startY = event.pageY;
                this.movements.triggerElement = target;    // store the triggering element
            },
            touchend: function _touchend (event) {
                if (!!this.options.preventDefault) {
                    preventDefault(event);
                }

                if (this.options.fingerCount === 1 && this.movements.curX !== 0) {

                    // determine the length of the swipe
                    this.movements.swipeLength = Math.round(Math.sqrt(Math.pow(this.movements.curX - this.movements.startX, 2) + Math.pow(this.movements.curY - this.movements.startY, 2)));
                    if (this.movements.swipeLength >= this.options.minLength) {
                        helpers.caluculateAngle.call(this);
                        helpers.determineSwipeDirection.call(this);
                        helpers.processingRoutine.call(this, event);
                        gestures.touchcancel.call(this, event);
                    } else if (this.movements.swipeLength <= this.options.tapSensitivity) {
                        gestures.touchcancel.call(this, event);
                        this.movements.swipeDirection = "tap";
                        helpers.processingRoutine.call(this, event);
                        gestures.touchcancel.call(this, event);
                    } else {
                        gestures.touchcancel.call(this, event);
                    }
                } else {
                    gestures.touchcancel.call(this, event);
                }
            },
            mouseup: function _mouseup (event) {
                gestures.touchend.call(this, event);
            },
            touchmove: function _touchmove (event) {
                if (!!this.options.preventDefault) {
                    preventDefault(event);
                }

                if (event.touches.length === 1) {
                    this.movements.curX = event.touches[0].pageX;
                    this.movements.curY = event.touches[0].pageY;
                } else {
                    gestures.touchcancel.call(this, event);
                }
            },
            mousemove: function _mousemove (event) {
                if (!!this.options.preventDefault) {
                    preventDefault(event);
                }

                this.movements.curX = event.pageX;
                this.movements.curY = event.pageY;
            },
            touchcancel: function _touchcancel () {
                this.movements = Object.create(defaults.movements);
            }
        };

    var TouchListener = function TouchListener (element, routines, options) {
        var key;
        this.element = element;
        this.routines = {};
        this.options = Object.create(defaults.options);
        this.movements = Object.create(defaults.movements);

        for (key in defaults.routines) {
            if (defaults.routines.hasOwnProperty(key)) {
                this.routines[key] = routines.hasOwnProperty(key) ? routines[key] : defaults.routines[key];
            }
        }
        for (key in defaults.options) {
            if (defaults.options.hasOwnProperty(key)) {
                this.options[key] = options.hasOwnProperty(key) ? options[key] : defaults.options[key];
            }
        }
        this.events = ["touchstart", "touchend", "touchmove", "touchcancel"];
        if (this.options.mouseEvents === true) {
            this.events.push.apply(this.events, ["mousedown", "mouseup", "mousemove"]);
        }
    };
    TouchListener.prototype.listen = function TouchListener$listen () {
        var that = this;
        this.method = function TouchListener$method (event) {
            if (typeof gestures[event.type] === "function") {
                gestures[event.type].call(that, event, that.routines);
            }
        };
        this.events.forEach(function listener (eventName) {
            listen(that.element, eventName, that.method);
        });
        return this;
    };

    return function flinch (element, routines, options) {
        var rub = new TouchListener(element, routines, options);
        return rub.listen();
    };
}(window));

