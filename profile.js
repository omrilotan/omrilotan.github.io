// https://bitbucket.org/account/omrilotan/avatar/32/

// {"username": "omrilotan", "website": "", "display_name": "Omri Lotan", "uuid": "{38295414-8005-43f3-889b-69d6275851b4}", "links": {"hooks": {"href": "https://api.bitbucket.org/2.0/users/omrilotan/hooks"}, "self": {"href": "https://api.bitbucket.org/2.0/users/omrilotan"}, "repositories": {"href": "https://api.bitbucket.org/2.0/repositories/omrilotan"}, "html": {"href": "https://bitbucket.org/omrilotan/"}, "followers": {"href": "https://api.bitbucket.org/2.0/users/omrilotan/followers"}, "avatar": {"href": "https://bitbucket.org/account/omrilotan/avatar/32/"}, "following": {"href": "https://api.bitbucket.org/2.0/users/omrilotan/following"}}, "created_on": "2014-08-13T04:04:35.303761+00:00", "location": "", "type": "user"}


var xhrCall = function xhrCall (url, options) {
    var XHR = new XMLHttpRequest();

    // OPTIONS       | PASSED THRU      |  DEFAULTS
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

var bitBucketRepos = function (name, image, response) {
    var data = JSON.parse(response);

    var list = document.createElement('ul');
    list.className = "repos";

    data.values.forEach(function(item) {
        var li     = document.createElement('li'),
            name   = document.createTextNode(item.name),
            img    = document.createElement('img'),
            anchor = document.createElement('a');

        img.src = item.links.avatar.href;
        anchor.href = item.links.html.href;;
        anchor.appendChild(name);
        li.appendChild(img);
        li.appendChild(anchor);
        list.appendChild(li);
    });

    document.getElementById('repos').appendChild(list);

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