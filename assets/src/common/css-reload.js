if (module.hot) {
    var hotEmitter = require("webpack/hot/emitter");
    hotEmitter.on("webpackHotUpdate", function (currentHash) {
        document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
            let url = new URL(link.href);
            url.searchParams.set('hash', Date.now());
            link.href = link.href.replace(url.toString());
        })
    })
}







