(function (document) {
    var sheet = typeof document.styleSheets === "object" &&
            document.styleSheets.length > 0 ?
            document.styleSheets[0] :
            document.createElement("style");
        addCssRule = function loadr$_addRule (selector, rules) {
            if (typeof sheet.insertRule === "function") {
                sheet.insertRule(selector + "{" + rules + "}", 1);
            } else if (typeof sheet.addRule === "function") {
                sheet.addRule(selector, rules, 1);
            } else {
                sheet.appendChild(document.createTextNode(selector + "{" + rules + "}"));
            }
        };

    addCssRule("a.source[href*=\"github\"],a.source[href*=\"bitbucket\"]",
    "   display : block;  \
        position: fixed;  \
        z-index : 9999;   \
        top     : -25px;  \
        right   : -68px;  \
        padding : 0 50px; \
        margin  : 0;      \
        -webkit-transform       : rotate(45deg); \
           -moz-transform       : rotate(45deg); \
            -ms-transform       : rotate(45deg); \
             -o-transform       : rotate(45deg); \
                transform       : rotate(45deg); \
        -webkit-transform-origin: top left;      \
           -moz-transform-origin: top left;      \
            -ms-transform-origin: top left;      \
             -o-transform-origin: top left;      \
                transform-origin: top left;      \
        font           : normal 12px/24px monospace;   \
        background     : #4078c0;                      \
        color          : #fff;                         \
        text-decoration: none;                         \
        box-shadow     : 0 5px 10px rgba(0, 0, 0, .3); \
        text-shadow    : none;                         \
    ");
    addCssRule("a.source[href*=\"github\"]:before,a.source[href*=\"bitbucket\"]:before", "content: \"source\";");
}(document));