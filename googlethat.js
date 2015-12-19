var googlethat = (function __googlethat__() {
    var search = function (href) {
        var start = href.indexOf("q=") + 2,
            end   = href.indexOf("&") > -1 ? href.indexOf("&") : href.length,
            value = href.substr(start, end - start),
            old   = document.getElementById("googlethat"),
            input = document.createElement("input"),
            val   = value.split(""),

            go    = function googlethatGo () {
                window.location.href = href;
            },
            next  = function next () {
                input.classList.remove("opaque");
                input.value += val.shift();
                input.focus();
                if (val.length) {
                    setTimeout(next, 50 * val.length / 2);
                } else {
                    setTimeout(go, 1000);
                }
            };
        if (old !== null) {
            old.parentNode.removeChild(old);
        }
        input.setAttribute("id", "googlethat");
        input.setAttribute("class", "opaque");
        input.value = "";
        document.body.appendChild(input);
        setTimeout(next, 200);
    };


    document.body.addEventListener("click", function googlethatListener (evt) {
        var target = evt.target;
        if (target.tagName.toUpperCase() === "A" &&
                typeof target.getAttribute("target") === "string" &&
                target.getAttribute("target").toUpperCase() === "GOOGLETHAT") {

            evt.preventDefault();
            var href = target.getAttribute("href");
            if (target.getAttribute("data-lucky") === "true") {
                href += "&btnI=I%27m+Feeling+Lucky";
            }
            search(href);
        }
    });
}());