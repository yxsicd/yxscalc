var checker = {
  "1010": {
    "1001": {
      "type": "string",
      "pattern": "",
      "range": [0, 10]
    },
    "1002": {
      "type": "number",
      "pattern": "",
      "range": [0, 10]
    },
    "1003": {
      "type": "number",
      "pattern": "",
      "range": [0, 10]
    }
  }
};
var data = { "1001": "name0", "1002": "08", "1003": "x20", "1004": 0 };

function checkData(id, data, checker) {
  var onecheck = checker[id];
  var ret = {};

  for (var key in data) {
    var value = data[key];
    if (onecheck[key]) {
      if (onecheck[key]["pattern"] && !value.match(onecheck[key]["pattern"])) {
        ret.resid = id;
        ret.pid = key;
        ret.ruletype = "pattern";
        ret.value = value;
        ret.rulevalue = onecheck[key]["pattern"]
        return ret;
      }
      if (onecheck[key]["type"]) {
        var type = onecheck[key]["type"];
        if (type == "number") {
          if (isNaN(value)) {
            ret.resid = id;
            ret.pid = key;
            ret.ruletype = "type";
            ret.value = value;
            ret.rulevalue = type;
            return ret;
          }
        }
      }
      if (onecheck[key]["range"]) {
        var range = onecheck[key]["range"];
        if (value < range[0] || value > range[1]) {
          ret.resid = id;
          ret.pid = key;
          ret.ruletype = "range";
          ret.value = value;
          ret.rulevalue = onecheck[key]["range"];
          return ret;
        }
      }
    }

  }
}

checkData(1010, data, checker);
