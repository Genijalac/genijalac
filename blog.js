var fsx = require('fs-extra');
var fs = require('fs');
var DB = require('node-json-db');




var files = fsx.walkSync('database/');
console.log(files.length);
console.log("Svi dokumenti su pronađeni");
getLekcije();



function getLekcije() {
    for (var i = files.length - 1; i >= 0; i--) {
        var data = fs.readFileSync(files[i], 'utf-8');
        data = JSON.parse(data);
        console.log(data["data"]);
    }
}
