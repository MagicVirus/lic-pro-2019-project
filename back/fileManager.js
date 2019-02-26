const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
const fse = require('fs-extra');
module.exports = {

  addEpisode: function (name, code, note) {

    return new Promise(async function (resolve, reject) {
      const episode = {
        id: uuidv1(),
        name: name,
        code: code,
        note: note,
      };
      const file = 'episodes/' + episode.id + '.json';
      const exists = await fse.pathExists(file);
      if (exists) {
        reject("Le fichier " + file + " existe déjà")
      } else {
        fse.writeJson(file, episode,{spaces :2})
          .then(() => {
            resolve("Le fichier " + file + " a bien été créer")
          })
          .catch(err => {
            resolve(err + " : Le fichier " + file + " n'a pas pu être créé")
          });
      }
    });
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
      console.log('test'  +  filename);
      fs.readFile(dirname + filename, function (err, content) {
        resolve(JSON.parse(content));
        if (err) reject('erreur');
      });
    });
  },

  editEpisode(uuid, name, code, note) {
    return new Promise(async function (resolve, reject) {
      const episode = {
        id: uuid,
        name: name,
        code: code,
        note: note,
      };
      const file = 'episodes/' + uuid + '.json';
      const exists = await fse.pathExists(file);
      if (exists) {
        await fse.remove(file).catch((err) => reject(err + " : Le fichier " + file + " n'a pas pu être supprimé"));
        fse.writeJson(file, episode)
          .then(() => {
            resolve("Le fichier " + file + " a bien été modifié")
          })
          .catch(err => {
            resolve(err + " : Le fichier " + file + " n'a pas été modifié")
          });
      } else {
        reject("Le fichier " + file + " n'existe pas")
      }

    });
  },

  getEpisode(uuid) {
    return new Promise(async function (resolve, reject) {
      const file = 'episodes/' + uuid + '.json';
      const exists = await fse.pathExists(file);
      if (exists) {
        const packageObj = await fse.readJson(file).catch((err) => reject(err + " : Le fichier " + file + " n'a pu être lu"));
        resolve(packageObj);
      } else {
        reject("Le fichier " + file + " n'existe pas")
      }
    });
  },
  removeEpisode: function (uuid) {
    return new Promise(async function (resolve, reject) {
      const file = 'episodes/' + uuid + '.json';
      const exists = await fse.pathExists(file);
      if (exists) {
        fse.remove(file)
          .then(() => resolve("Le fichier " + file + " a bien été supprimé"))
          .catch((err) => reject(err + " : Le fichier " + file + " n'a pas été supprimé"))
      } else {
        reject("Le fichier " + file + " n'existe pas")
      }
    });
  },
};