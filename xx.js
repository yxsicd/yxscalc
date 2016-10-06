var _s = function (data, patharr, value) {
    patharr.reduce(function (pv, cv, index, arr) {
        pv[cv] ? 0 : pv[cv] = {};
        if (index == arr.length - 1) {
            pv[cv] = value;
        }
        return pv[cv];
    }, data)
}

var _g = function (data, patharr) {
    return patharr.reduce(function (pv, cv) {
        return pv[cv];
    }, data)
}