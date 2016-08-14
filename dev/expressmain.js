



function loadScript(scripturl) {
  if (!scripturl[loadScript.index]) {
    return;
  }
  var urlroot = "https://yxsicd.github.io/yxscalc";
  jQuery.getScript(urlroot + scripturl[loadScript.index], function () {
    loadScript.index++
    loadScript(scripturl);
  });
}

function loadCSS(url) {
  var urlroot = "https://yxsicd.github.io/yxscalc";
  jQuery.loadCSS(urlroot + url);
}

function initScript() {
  loadScript.index = 0;
  var scripturl = [
    "/3rd/vue.js",
    "/3rd/FileSaver.min.js",
    "/3rd/localforage.min.js",
    "/3rd/lodash.min.js",
    "/dev/express.js",
    "/dev/initui.js"
  ];
  loadScript(scripturl);
}

// <link rel="stylesheet" href="3rd/bootstrap-3.3.2-dist/css/bootstrap.min.css">
// <link rel="stylesheet" href="3rd/bootstrap-3.3.2-dist/css/bootstrap-theme.min.css">

function initCSS() {
  var cssurl = [
    "/3rd/bootstrap-3.3.2-dist/css/bootstrap.min.css",
    "/3rd/bootstrap-3.3.2-dist/css/bootstrap-theme.min.css"
  ]

  for (var i = 0; i < cssurl.length; i++) {
    loadCSS(cssurl[i]);
  }
}

function initui() {
  var rootdiv = document.createElement("div");
  document.body.appendChild(rootdiv)
  rootdiv.id = "div_root"


  jQuery(rootdiv).css({
    position: "absolute", top: "100px", left: "30px",
    "background-color": "white", "width": "90%", "height": "800px", "z-index": 1000
  })
}

function init() {
  initCSS();
  initui();
  jQuery("#div_root").load("https://yxsicd.github.io/yxscalc/index_kuaidi.html", initScript);
}

init();