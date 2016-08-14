



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


function initCSS() {
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

function initeditor() {
  var defaultline = 15;

  var editor = ace.edit("editor1");
  editor.setTheme("ace/theme/tomorrow_night_eighties");
  editor.session.setMode("ace/mode/javascript");
  editor.setOption("minLines", defaultline);
  editor.setOption("maxLines", defaultline);

  var src_1 = ace.edit("src_1");
  src_1.setTheme("ace/theme/tomorrow_night_eighties");
  src_1.session.setMode("ace/mode/text");
  src_1.setOption("minLines", defaultline);
  src_1.setOption("maxLines", defaultline);

  var src_2 = ace.edit("src_2");
  src_2.setTheme("ace/theme/tomorrow_night_eighties");
  src_2.session.setMode("ace/mode/text");
  src_2.setOption("minLines", defaultline);
  src_2.setOption("maxLines", defaultline);

  var output_1 = ace.edit("output_1");
  output_1.setTheme("ace/theme/tomorrow_night_eighties");
  output_1.session.setMode("ace/mode/text");
  //output_1.setAutoScrollEditorIntoView(true);
  output_1.setOption("minLines", defaultline);
  output_1.setOption("maxLines", defaultline);
}


function init() {
  initCSS();
  initScript();

  jQuery("#div_root").load("https://yxsicd.github.io/yxscalc/index_kuaidi.html", initeditor);


}

init();