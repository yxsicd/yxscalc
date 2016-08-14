

var urlroot = "http://yxsicd.github.io/yxscalc";

function loadscript() {
  jQuery.getScript(urlroot + "/dev/initui.js");
  jQuery.getScript(urlroot + "/dev/express.js");
}
loadscript();