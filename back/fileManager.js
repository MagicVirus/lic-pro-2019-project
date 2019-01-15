module.exports = {

  addEpisode(episode) {
     db.data.push(episode);
     fs.writeFile('1.json', JSON.stringify(db), 'utf8', null);
 }
}
