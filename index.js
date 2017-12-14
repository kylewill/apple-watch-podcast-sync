const fs = require('fs');
const Path = require('path');
const nodeID3 = require('node-id3');
const fse = require('fs-extra');

const podcast_dir = '/Users/YOUR_USERNAME/Music/iTunes/iTunes\ Media/Podcasts/';
const temp_dir = 'ADD_DIR';
const add_to_itunes_dir = '/Users/YOUR_USERNAME/Music/iTunes/iTunes\ Media/Automatically\ Add\ to\ iTunes.localized/';
const new_genre = 'Watch Podcast';


var times = [];

var podcasts = {}

var podcast_paths = readDirR(podcast_dir);


for (i = 0; i < podcast_paths.length; i++) {
    console.log(podcast_paths[i]);

    if (podcast_paths[i].match('mp3')) {
        var edit_time = new Date(fs.statSync(podcast_paths[i]).mtime).getTime();
        times.push(edit_time);
        var filename = podcast_paths[i].replace(/^.*[\\\/]/, '')
        podcasts[edit_time] = { path: podcast_paths[i], filename: filename };
    }
}


fs.appendFile(log_file, JSON.stringify(podcasts), (err) => {
    if (err) { console.log(err); }
});


var top_10 = times.sort(sortNumber).slice(0, 10);

console.log(JSON.stringify(top_10))


top_10.forEach(time => {

    var podcastdetail = podcasts[time];

    var newFilename = 'aw-' + podcastdetail.filename;
    var newPath = temp_dir + newFilename;
    fse.copySync(podcastdetail.path, newPath);
    var tags = nodeID3.read(newPath);
    tags.genre = new_genre;
    nodeID3.write(tags, newPath);
    fse.copy(newPath, add_to_itunes_dir + newFilename);

})


function sortNumber(a, b) {
    return b - a;
}

function readDirR(dir) {
    return fs.statSync(dir).isDirectory() ?
        Array.prototype.concat(...fs.readdirSync(dir).map(f => readDirR(Path.join(dir, f)))) :
        dir;
}
