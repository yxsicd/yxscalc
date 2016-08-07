define("people", ["require", "exports"], function (require, exports) {
    "use strict";
    var Clock = (function () {
        function Clock(h, m) {
            this.hour = h;
            this.minute = m;
        }
        return Clock;
    }());
    exports.Clock = Clock;
});
define("mytest", ["require", "exports", "people"], function (require, exports, people_1) {
    "use strict";
    var c = new people_1.Clock(1, 2);
    function test(good) {
        console.log(c);
    }
    exports.test = test;
});
//# sourceMappingURL=yxs.js.map