var url = "/a/12/xx/b";
var urlp = "/a/{p1}/{p2}/b";

function isUrlMatchPattern(url, urlp) {
  var urlpret = urlp.replace(/{[^{}]*}/g, "/?([^/]*)");
  var valueMatch = url.match(urlpret);
  if (!valueMatch) { return null; }
  var patternMatch = urlp.match(urlpret);
  var pathMap = {};
  for (var i = 1; i < valueMatch.length; i++) {
    pathMap[patternMatch[i].replace(/({)|(})/g, "")] = valueMatch[i]
  }
  return pathMap;
}

isUrlMatchPattern(url, urlp);