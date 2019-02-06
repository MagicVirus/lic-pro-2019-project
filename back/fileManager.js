var fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

module.exports = {

  addEpisode(name,code,note) {

      let episode = {
          id: uuidv1(),
          name: name,
          code: code,
          note: note,
      };

      fs.writeFile('episodes/' + episode.id + '.json', JSON.stringify(episode,null,2), 'utf8',  (err) => {
         if (err) return false;
     });

     return true;
 },

    getEpisodes(dirname) {
        //let data = [];
        return new Promise((resolve, reject) => {
            this.readEpisodes(dirname).then((fileNames) => {
                const p = fileNames.map((fileName) => {
                    return this.readEpisode(dirname, fileName);
                });
                Promise.all(p).then((episodes) => {
                    resolve(episodes);
                })
            });
        })
 },

 editEpisode(uuid, name, code, note) {

     var episode = {
         id: uuid,
         name: name,
         code: code,
         note: note,
     };

     if(fs.existsSync('episodes/' + uuid + '.json')) {
        fs.unlinkSync('episodes/' + uuid + '.json');
     }

      fs.writeFile('episodes/' + episode.id + '.json', JSON.stringify(episode,null,2), 'utf8',function(err) {
         if(err) return false;
     })

     return true;
 },
    removeEpisode(uuid) {

      return Promise(resolve, reject) => {
        if(!fs.exists('episodes/' + uuid + '.json')) {
            reject("Failed to delete this episode");
        }
        else {
            fs.unlink('episodes/' + uuid + '.json');
            resolve("Sucessfully deleted this episode");
        }

    }
},
