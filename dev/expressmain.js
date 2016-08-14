



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
    "/dev/express.js"
  ]
  loadScript(scripturl);
}


function initCSS() {
  var cssurl = [
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
    position: "absolute", top: "0px", left: "0px",
    "background-color": "blue", "width": "500px", "height": "600px"
  })
}

function init() {
  initCSS();
  initui();
  jQuery("#div_root").load("https://yxsicd.github.io/yxscalc/index_kuaidi.html", initScript);
}

init();