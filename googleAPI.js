var googleAPI = (function __googleAPI__ (window, CLIENT_ID) {
    var clientAPI = 'https://apis.google.com/js/client.js?onload=googleapireadycallback',
        clientID  = CLIENT_ID,
        scopes = {

            // Add as needed
            calendar: 'https://www.googleapis.com/auth/calendar'
        },
        savedResult = {},
        listeners   = {},
        started     = [],
        ended       = [],

        // Functions:
        listen = function gAPI_listen (name, fn) {
            listeners[name] = listeners[name] || [];
            listeners[name].push(fn);
        },

        emit = function gAPI_emit (name) {
            ended.push(name);
            if (_.has(listeners, name)) {
                while (listeners[name].length) {
                    listeners[name].shift()(savedResult);
                }
            }
        },

        authorize = function gAPI_authorize (scope, fn) {
            if (indexOf(started, scope) === -1) {
                gapi.auth.authorize({
                    client_id: clientID,
                    scope: [ scopes.scope ],
                    immediate: false
                }, function (result) {
                    savedResult = result;
                    emit(scope);
                });
                started.push(scope);
            }
            if (indexOf(ended, scope) === -1) {
                listen(scope, fn);
            } else {
                fn(savedResult);
            }
        },

        load = function gAPI_load () {
            if (indexOf(started, 'load') === -1) {
                var script = document.createElement('script');

                script.src = clientAPI;
                script.onload = function () {
                    emit('load');
                };
                document.head.appendChild(script);
                started.push('load');
            }
            return indexOf(ended, 'load') !== -1;
        };

    // TODO: Auto get access token automagically
    window.googleapireadycallback = function noop () {};
    load();

    return function googleAPI (scope, fn) {
        var callback = function () {
            if (scopes.hasOwnProperty(scope)) {
                authorize(scope, fn);
            }
        };
        if (!load()) {
            listen('load', callback);
        } else {
            callback();
        }
    };
}(window, 'YOUR_CLIENT_ID'));