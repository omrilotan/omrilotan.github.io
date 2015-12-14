var googlethat = (function __googlethat__() {
    var styles = [
            "#googlethat{",
            "position:absolute;",
            "z-index:9999;",
            "top:50px;",
            "left:10%;",
            "width:80%;",
            "outline:0;",
            "box-sizing:border-box;",
            "font-size:24px;",
            "line-height:50px;",
            "border:20px solid #fff;",
            "box-shadow:0 0 100px rgba(0,0,0,.3);",
            "border:0;",
            "padding:0 .5em 0 130px;",
            "background:#fff url(http://www.google.com/images/branding/googlelogo/2x/googlelogo_color_116x41dp.png) 10px bottom no-repeat;",
            "background-size:auto 42px;",
            "color:#000;",
            "opacity:1;",
            "transition:all .3s ease-in;",
            "}",
            "#googlethat.opaque{",
            "opacity:0;",
            "}",
            "a[target=\"googlethat\"]:after{",
            "display:inline-block;",
            "content:\"🔍\";",
            "vertical-align:top;",
            "font-size:.5em;",
            "line-height:1em;",
            "width:1em;",
            "text-align:center;",
            "border-radius:50%;",
            "}"
        ].join("");
    loadr("styles/text", styles);

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
            search(href);
        }
    });
}());