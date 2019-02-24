var fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
const fse = require('fs-extra');
module.exports = {

    addEpisode: function (name, code, note) {

        let episode = {
            id: uuidv1(),
            name: name,
            code: code,
            note: note,
        };

        console.log(episode.id);

        fs.writeFile('episodes/' + episode.id + '.json', JSON.stringify(episode, null, 2), 'utf8', (err) => {
            if (err) return false;
        });
        return true;
    },

    getEpisodes(dirname) {
        return new Promise((resolve, reject) => {
            this.readEpisodes(dirname).then((fileNames) => {
                const p = fileNames.map((fileName) => {
                    return this.readEpisode(dirname, fileName);
                });
                Promise.all(p).then((episodes) => {
                    resolve(episodes);
                })
            });
        });
    },
    readEpisodes: function (dirname) {
        return new Promise(function (resolve, reject) {
            fs.readdir(dirname, function (err, filename) {
                resolve(filename);
                if (err) reject('erreur');
            });
        });
    },
    readEpisode: function (dirname, filename) {
        return new Promise(function (resolve, reject) {
            fs.readFile(dirname + filename, function (err, content) {
                resolve(JSON.parse(content));
                if (err) reject('erreur');
            });
        });
    },

    editEpisode(uuid, name, code, note) {

        var episode = {
            id: uuid,
            name: name,
            code: code,
            note: note,
        };

        if (fs.existsSync('episodes/' + uuid + '.json')) fs.unlinkSync('episodes/' + uuid + '.json');

        fs.writeFile('episodes/' + episode.id + '.json', JSON.stringify(episode, null, 2), 'utf8', function (err) {
            if (err) return false;
        });
        return true;
    },

    removeEpisode: function (uuid) {
        return new Promise(async function (resolve, reject) {
            const file = 'episodes/' + uuid + '.json';
            const exists = await fse.pathExists(file);
            if (exists){
                fse.remove(file)
                    .then(()=>resolve("Le fichier "+ file +" à bien été supprimé"))
                    .catch((err)=> reject(err + " : Le fichier "+ file +" n'a pas été supprimé"))
            }else {
                reject("Le fichier "+ file +" n'existe pas")
            }
        });
    },
};