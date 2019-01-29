var fs = require('fs');
const path = require('path');

module.exports = {

  addEpisode(episode) {

     fs.writeFile('episodes/' + episode.id + '.json', JSON.stringify(episode,null,2), 'utf8',  (err) => {
         if (err) return false;
     });
     return true;
 },

 getEpisodes(dirname) {

      data =[];

     fs.readdir(dirname, function(err, filenames) {
         if (err) {
             console.log("erreur reading directory");
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
     }

     fs.unlinkSync('episodes/' + uuid + '.json');

     fs.writeFile('episodes/' + episode.id + '.json', JSON.stringify(episode), 'utf8', null);

 },
    removeEpisode(uuid) {
        if(!fs.existsSync(file)) {
            return false;
        }
        fs.unlinkSync('episodes/' + uuid + '.json');

        return true;
    }
}
