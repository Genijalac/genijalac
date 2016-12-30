var fsx = require('fs-extra');
var fs = require('fs');
var DB = require('node-json-db');
var yamlFront = require('yaml-front-matter');
var dev = true;
var assets = (!dev) ? 'src/assets/data' : 'DB';

// PRETRAŽUJE SVE FILOVE U DATABASE FOLDERU
var files = fsx.walkSync('database/');

(function kreirajLekcije() {
    for (var i = files.length - 1; i >= 0; i--) {
    	// ZA SVAKI FILE KONVERTIRA GA U JSON
        var data = yamlFront.loadFront(fs.readFileSync(files[i], 'utf-8'));
        console.log(files[i],'\n' ,data);
        // AKO FILE SADRŽI .yaml
        if (files[i].indexOf('.yaml') !== -1) {
            var url = '/' + data["predmet"].toLowerCase() + '/' + data["cjelina"].toLowerCase() + '/' + data["slag"].toLowerCase();
            var db = new DB(assets + url, true, false);
            db.push('/', data)
        }
    }
})();
