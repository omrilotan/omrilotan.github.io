(function () {
    var placed = false;
    [].forEach.call(arguments, function (item) {
        placed = window.location.host === "" || ~window.location.host.indexOf(item) ? true : placed;
    });
    if (!placed) {
        window.location = "http://omrilotan.com";
    }
}("omrilotan.com", "localhost", "127.0.0.1"));

(function () {
    if (!window.console || !console.log) { return; }

    console.log("%cHey there, good to see you.\n\n%cFeel free to contact me at %comri@hamadgera.com%c\n\n\n",
        "font:normal 14px/18px monospace; color:#900;",
        "",
        "font:normal 12px/16px monospace; color:#ccc; background:#444; padding:.25em .5em; border-radius:3px;",
        "");
}());

(function (collection) {
    [].forEach.call(collection, function (item) {
        item.addEventListener('focus', item.select);
    });
}(document.querySelectorAll("input[autohighlight], textarea[autohighlight]")));