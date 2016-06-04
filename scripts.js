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

    console.log("\n%cHey there, good to see you.\n%c\n",
        "font:normal 12px/16px monospace; color:#ccc; background:#444; padding:.5em 1em; border-radius:3px;",
        "");
}());

document.body.addEventListener("focus", function autohighlight (evt) {
    evt.target.getAttribute("autohighlight") !== null && evt.target.select();
}, true);