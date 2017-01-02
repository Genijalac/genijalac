var fsx = require('fs-extra');
var fs = require('fs');
var DB = require('node-json-db');
var _ = require('underscore');
var yamlFront = require('yaml-front-matter');
var dev = false;
var assets = (!dev) ? 'src/assets/data' : 'DB';
var metaDB = new DB(assets + "/meta", true, false);
// PRETRAŽUJE SVE FILOVE U DATABASE FOLDERU
var files = fsx.walkSync('database/');
var dataStart = '/data/';
var objectRepresentation = [];
var predmeti = ["mat1", "mat2", "mat3", "mat4", "fiz2"];

(function kreirajLekcije() {
    for (var i = 0; i < files.length; i++) {
        // ZA SVAKI FILE KONVERTIRA GA U JSON
        var data = yamlFront.loadFront(fs.readFileSync(files[i], 'utf-8'));
        // AKO FILE SADRŽI .yaml
        if (files[i].indexOf('.yaml') !== -1) {

            var placeholder = files[i].split("\\");
            /// 1 - predmet , 2 - cjelina, 3 - lekicja, 4 - jedinica
            var predmetLink = placeholder[1].toLowerCase();
            var cjelinaLink = placeholder[2].toLowerCase().replace(/\s/gi, "-").replace(/ž/gi, "z").replace(/š/gi, "s").replace(/đ/gi, "d").replace(/č/gi, "c").replace(/ć/gi, "c");
            var lekcijaLink = placeholder[3].toLowerCase().replace(/\s/gi, "-").replace(/ž/gi, "z").replace(/š/gi, "s").replace(/đ/gi, "d").replace(/č/gi, "c").replace(/ć/gi, "c");
            var jedinicaLink = placeholder[4].toLowerCase().replace(/\s/gi, "-").replace(/ž/gi, "z").replace(/š/gi, "s").replace(/đ/gi, "d").replace(/č/gi, "c").replace(/ć/gi, "c").replace(".yaml", "");
            var url = '/' + predmetLink + '/' + cjelinaLink + '/' + lekcijaLink + '/' + jedinicaLink;
            var db = new DB(assets + url, true, false);
            db.push('/', data)

            var jedinicaMeta = { "jedinica": [data["naslov"], jedinicaLink], "tip": data["tip"] };
            var lekcijaMeta = { "lekcija": [placeholder[3], lekcijaLink] };
            var cjelinaMeta = { "cjelina": [placeholder[2], cjelinaLink], "data": [] };



            objectRepresentation.push({
                predmetLink: predmetLink,
                predmetName: placeholder[1],
                cjelinaLink: cjelinaLink,
                cjelinaName: placeholder[2],
                lekcijaLink: lekcijaLink,
                lekcijaName: placeholder[3],
                jedinicaLink: jedinicaLink,
                jedinicaName: data["naslov"],
                jedinicaTip: data["tip"],
                cjelinaMeta: cjelinaMeta,
                lekcijaMeta: lekcijaMeta,
                jedinicaMeta: jedinicaMeta

            })

            metaDB.push(dataStart + predmetLink, { "predmet": [predmetName(predmetLink), predmetLink], "cjeline": [] });
        }
    }
})();


for (var i = 0; i < predmeti.length; i++) {

    var jedinice = _.where(objectRepresentation, { "predmetLink": predmeti[i] });
    var shema = [];
    var grupiraneCjeline = _.groupBy(jedinice, 'cjelinaName')
    _.each(grupiraneCjeline, function(item, key, list) {
        var cjelina = { "cjelina": [key, key.toLowerCase().replace(/\s/gi, "-").replace(/ž/gi, "z")], data: [] };
        var lekcije = getLekcijeFromCjeline(item);
        _.each(lekcije, function(jedinice, imeLekcije) {
            cjelina["data"].push({ "lekcija": [imeLekcije, imeLekcije.toLowerCase().replace(/\s/gi, "-").replace(/ž/gi, "z")], data: getJediniceFromCjelineLekcije(jedinice) })
        })
        shema.push(cjelina)
    })
    metaDB.push(dataStart + predmeti[i] + '/cjeline', shema)
}

function getLekcijeFromCjeline(jedinice) {
    // jedinice koje su iz iste cjeline
    var grupirane = _.groupBy(jedinice, "lekcijaName");
    return grupirane;
}

function getJediniceFromCjelineLekcije(jedinice) {
    var data = [];
    _.each(jedinice, function(value, key) {
        data.push({ "jedinica": [value["jedinicaName"], value["jedinicaLink"]], "tip": value["jedinicaTip"] })
    })
    return data;
}

function predmetName(link) {
    switch (link) {
        case "mat1":
            return "Matematika 1";
            break;
        case "mat2":
            return "Matematika 2";
            break;
        case "mat3":
            return "Matematika 3";
            break;
        case "mat4":
            return "Matematika 4";
            break;
        case "fiz2":
            return "Fizika 2";
            break;
    }
}
