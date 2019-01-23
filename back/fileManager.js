var fs = require('fs');
const path = require('path');

module.exports = {

  addEpisode(episode) {
     fs.writeFile('episodes/' + episode.id + '.json', JSON.stringify(episode), 'utf8', null);
 },

 getEpisodes(dirname, onFileContent, onError) {
     fs.readdir(dirname, function(err, filenames) {
         if (err) {
             onError(err);
             return;
         }
         filenames.forEach(function(filename) {
             fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                 if (err) {
                     onError(err);
                     return;
                 }
                 onFileContent(filename, content);
             });
         });
     });
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
        fs.unlinkSync('episodes/' + uuid + '.json');
    }
}
