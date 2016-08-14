



function loadScript(url) {
  var urlroot = "http://yxsicd.github.io/yxscalc";
  jQuery.getScript(urlroot + url);
}

function loadCSS(url) {
  var urlroot = "http://yxsicd.github.io/yxscalc";
  jQuery.loadCSS(urlroot + url);
}

function initScript() {

  var scripturl = [
    "/3rd/FileSaver.min.js",
    "/3rd/localforage.min.js",
    "/3rd/lodash.min.js",
    "/dev/initui.js",
    "/dev/express.js"
  ]

  for (var i = 0; i < scripturl.length; i++) {
    loadScript(scripturl[i]);
  }
}


function initCSS()
{ 
  var cssurl = [
    "/3rd/FileSaver.min.js",
    "/3rd/localforage.min.js",
    "/3rd/lodash.min.js",
    "/dev/initui.js",
    "/dev/express.js"
  ]

  for (var i = 0; i < cssurl.length; i++) {
    loadCSS(cssurl[i]);
  }
}

function init()
{ 
  initCSS();
  initScript();
}

init();