const fs = require('fs');
const Path = require('path');
const nodeID3 = require('node-id3');
const fse = require('fs-extra');

const podcast_dir = '/Users/YOUR_MAC_USERNAME/Music/iTunes/iTunes\ Media/Podcasts/';
const temp_dir = 'CREATE_TEMP_DIR';
const add_to_itunes_dir = '/Users/YOUR_MAC_USERNAME/Music/iTunes/iTunes\ Media/Automatically\ Add\ to\ iTunes.localized/';
const new_genre = 'Watch Podcast'

var times = [];

var podcasts = {}

var podcast_paths = readDirR(podcast_dir);
console.log(podcast_paths);

for (i = 0; i < podcast_paths.length; i++) {
	console.log(podcast_paths[i]);
	var edit_time = fs.statSync(podcast_paths[i]).mtime;
	times.push(edit_time);
	var filename = podcast_paths[i].replace(/^.*[\\\/]/, '')
	podcasts[edit_time] = {path: podcast_paths[i], filename: filename};
}

var top_10 = times.sort().slice(0,10);

top_10.forEach(time => {
	console.log(time);
	console.log(podcasts[time].filename);

	var podcastdetail = podcasts[time];

	if (podcasts[time].filename.match('mp3')) {
		var newFilename = 'aw-' + podcastdetail.filename;
		var newPath = temp_dir + newFilename;
		fse.copySync(podcastdetail.path, newPath);
		var tags = nodeID3.read(newPath);
		tags.genre = new_genre;
		nodeID3.write(tags,newPath);
		fse.copy(newPath,add_to_itunes_dir + newFilename);
	}
})


function readDirR(dir) {
    return fs.statSync(dir).isDirectory()
        ? Array.prototype.concat(...fs.readdirSync(dir).map(f => readDirR(Path.join(dir, f))))
        : dir;
}