(function () {
    console.log("%cYTpop: %crunning", "color:#000;", "color:#900;");

    var FSBtn  = document.querySelector(".ytp-fullscreen-button.ytp-button"),
        PopBtn = document.createElement("button"),
        style  = document.createElement("style");

    if (FSBtn === null) {
        return;
    }

    [
        ".ytp-popout-button { position:relative; float:right; }",
        ".ytp-popout-button:before,.ytp-popout-button:after { content:' '; width:40%; height:30%; border:3px solid #fff; position:absolute; }",
        ".ytp-popout-button:before { top:   20%; left: 10%; }",
        ".ytp-popout-button:after  { bottom:20%; right:10%; }"
    ].forEach(function(line){
        style.appendChild(document.createTextNode(line));
    });

    PopBtn.className = "ytp-popout-button ytp-button";
    PopBtn.onclick = function() {
        window.open([
            "https://youtube.com/embed/",
            window.location.search.substr(1, 256)
                .split("&")
                .map(function(e) {
                    return "v" === e.split("=")[0] ? e.split("=")[1] : void 0
                }).filter(function(e) {
                    return !!e
                })[0],
            "?autoplay=1"
            ].join(""),
            "YTpop",
            [
                "dependent=0",
                "dialog=0",
                "minimizable=0",
                "toolbar=0",
                "scrollbars=0",
                "location=0",
                "statusbar=0",
                "status=0",
                "personalbar=0",
                "menubar=0",
                "resizable=0",
                "centerscreen=1",
                "chrome=0",
                "height=" + (window.screen.availHeight || window.screen.height) / 2,
                "width=" + (window.screen.availWidth || window.screen.width) / 2
            ].join(","));
        while(window["player-api"].children.length) {
            window["player-api"].removeChild(window["player-api"].firstChild);
        }
    };

    FSBtn.parentNode.insertBefore(PopBtn, FSBtn);
    document.head.appendChild(style);
}());