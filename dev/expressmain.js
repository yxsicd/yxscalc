



function loadScript(url) {
  var urlroot = "http://yxsicd.github.io/yxscalc";
  jQuery.getScript(urlroot + url);
}

function initScript() {

  var scripturl = [
    "/dev/initui.js",
    "/dev/express.js"
  ]

  for (var i in scripturl) {
    debugger;
    loadScript(scripturl[i]);
  }
}


initScript();