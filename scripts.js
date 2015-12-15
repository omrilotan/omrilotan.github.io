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
        var data = JSON.parse(response),
            list = document.createElement("ul");

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

        document.getElementById("repos").appendChild(list);

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