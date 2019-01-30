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

     let data = [];

     fs.readdir(dirname, function(err, filenames) {
         if (err) {
             console.log("Error while reading directory");
             return false;
         }
         filenames.forEach(function(filename) {

             fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                 if (err) {
                     return false;
                 }
                 data.push(JSON.parse(content));

             });
         });
     });
     return data;

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
