(function () {
    var okay = false;
    [].forEach.call(arguments, function (item) {
        okay = window.location.host === "" || ~window.location.host.indexOf(item) ? true : okay;
    });
    if (!okay) {
        window.location = "http://omrilotan.com";
    }
}("omrilotan.com", "localhost", "127.0.0.1"));

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

(function () {

    var bitBucketRepos = function (name, image, response) {
        var data  = JSON.parse(response),
            list  = document.createElement("ul"),
            repos = document.getElementById("repos");

        list.className = "repos";

        data.values.forEach(function(item) {
            var li     = document.createElement("li"),
                name   = document.createTextNode(item.name),
                img    = document.createElement("img"),
                anchor = document.createElement("a");

            img.src = item.links.avatar.href;
            anchor.href = item.links.html.href;;
            anchor.appendChild(name);
            li.appendChild(img);
            li.appendChild(anchor);
            list.appendChild(li);
        });

        repos.appendChild(list);
        repos.parentNode.removeAttribute("style");
    };

    var bitBucketProfile = function (response) {
        var data = JSON.parse(response);
        xhrCall(data.links.repositories.href, {
            method: "GET",
            async: true,
            headers: [
                { name: "Content-Type", value: "text/plain" }
            ],
            callback: function (response) {
                bitBucketRepos(data.display_name, data.links.avatar.href, response);
            }
        });



    };

    xhrCall("https://api.bitbucket.org/2.0/users/omrilotan", {
        method: "GET",
        async: true,
        headers: [{ name: "Content-Type", value: "text/plain" }],
        callback: bitBucketProfile
    });
}());

(function () {
    if (!window.console || !console.log) { return; }
    console.log("%cHey there, good to see you.\n\n%cFeel free to contact me at %comri@hamadgera.com%c\n\n\n",
        "font:normal 14px/18px monospace; color:#900;",
        "",
        "font:normal 12px/16px monospace; color:#ccc; background:#444; padding:.25em .5em; border-radius:3px;",
        "");
}());