var xhrCall = function xhrCall (url, options) {
    var XHR = new XMLHttpRequest();

//  OPTIONS          | PASSED           |  DEFAULT
    options          = options          || {};
    options.async    = options.async    || false;
    options.method   = options.method   || "GET";
    options.callback = options.callback || function noop () {};
    options.headers  = options.headers  || [{ name: "Content-Type", value: "text/plain" }];

    XHR.open(options.method, url, options.async);
    options.headers.forEach(function (header) {
        XHR.setRequestHeader(header.name, header.value);
    });

    if (options.async === true) {
        XHR.onreadystatechange = function onreadystatechange () {
            if (XHR.readyState === 4 &&

                    // 200: ready, 0: localhost
                    (XHR.status === 200 || XHR.status === 0)) {
                options.callback(XHR.responseText);
            }
        };
    }
    XHR.send();
    if (options.async === false) {
        options.callback(XHR.responseText);
    }
};