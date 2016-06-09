/**
 * Created by yxs on 2016/6/5.
 */
// 96312cf60f3e4fa5b0d326a17f40f0c1fe4962ae 
// token auth

//PUT /repos/:owner/:repo/contents/:path
/**
 * Created by yxs on 2016/6/5.
 */
// 96312cf60f3e4fa5b0d326a17f40f0c1fe4962ae 
// token auth

var gh = new GitHub({token: "96312cf60f3e4fa5b0d326a17f40f0c1fe4962ae"});
var nowreop = gh.getRepo("yxsicd", "yxslearn");

function writeData(reop, path, data) {
    var ts = new Date().valueOf() + "";
    reop.writeFile("master", path, data, ts, {"encode": true})
}

function readData(reop, path, callback) {
    var ts = new Date().valueOf() + "";
    reop.getContents("master", path, true).then(callback)
}

function zipString(str, callback) {
    var zip1 = new JSZip();
    zip1.file("base64", str);
    zip1.generateAsync({type: "base64", compression: "DEFLATE", compressionOptions: {level: 9}})
        .then(function (content) {
            var zip2 = new JSZip();
            zip2.file("base64", content);
            zip2.generateAsync({type: "base64", compression: "DEFLATE", compressionOptions: {level: 9}})
                .then(function (content2) {
                    callback ? callback(content2) : 0;
                });
        });
}

function unzipString(bash64String, callback) {
    new JSZip().loadAsync(bash64String, {"base64": true}).then(
        function (myzip) {
            console.log("unzip1",myzip);
            myzip.file("base64").async("string").then(function (d) {
                //console.log("base64: ", d)
                new JSZip().loadAsync(d, {"base64": true}).then(
                    function (nzip) {
                        console.log("unzip2",nzip)
                        nzip.file("base64").async("string").then(function (content) {
                            callback ? callback(content) : 0;
                        });
                    }
                )
            });
        }
    );
}

var zip = new JSZip();
var db = new loki("db.json");
var c_p = db.addCollection("people");
for (var i = 0; i < 100; i++) {
    c_p.insert({"name": "name" + i, "age": i})
}
var dbstr = db.serialize();

zipString(dbstr, function (d) {
    writeData(nowreop, "db/db.zip", d)
})
readData(nowreop, "db/db.zip", function (d) {
    console.log("data:", d);
    unzipString(d.data, function (c) {
        //console.log("json:", c);
        var db = new loki();
        db.loadJSON(c);
        console.log("db",db);
    });
});
