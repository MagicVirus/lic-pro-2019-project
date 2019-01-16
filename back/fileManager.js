var fs = require('fs');

module.exports = {


  addEpisode(episode) {
     fs.writeFile('episodes/' + episode.id + '.json', JSON.stringify(episode), 'utf8', null);
 }
}
