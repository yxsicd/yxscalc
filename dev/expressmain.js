

var urlroot = "http://yxsicd.github.io/yxscalc";


function loadScript(url) {
  jQuery.getScript(urlroot + url);
}

function initScript() {

  var scripturl = [
    "/dev/initui.js",
    "/dev/express.js"
  ]

  for (var i in scripturl) {
    loadScript(scripturl[i]);
  }


}
initScript();