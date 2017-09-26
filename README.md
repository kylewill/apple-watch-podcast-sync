# apple-watch-podcast-sync
a simple script to add podcasts to the Apple Watch.

This was a quick hack before a run. pull requests welcome. 

I wanted a way to listen to podcasts while on a run and Apple Watch only lets you sync music. This script finds the ten most recent podcasts downloaded to iTunes, makes a copy, and adds the copy back to iTunes. Those copies will be seen as Music files vs. Podcasts and now eligible to sync to the Apple Watch. To get them over to the phone you have to Update iCloud Music Library to have them sync. 

I add a genre called "Watch Podcast" and have a smart playlist in iTunes that puts them in one playlist. Then the phone syncs that playlist to the watch. 


## Getting Started

npm install to get the npm modules to change id3 tags. 

### Prerequisites

- Apple Watch
- Mac with iTunes installed
- iCloud Music Library (I think this requires Apple Music Subscription)
- Nodejs

### Installing

```
npm install
```

You'll need to edit the podcast directory (at least with your mac username) to find podcasts. Create a file to store the pre-updated mp3 copies. Update the add_to_itunes variable to your mac username. 

Optional: change the genre to something memorable for you (I use 'Watch Podcast').

#### On iTunes:

Create a smart playlist to add songs with the genre "Watch Podcast" to it. Or whatever genre you changes in the index.js file. 

#### On your iPhone:

Open the music app and make sure the Smart Playlist is set to download automatically. 

#### In the iPhone Watch App:

Go to Music > Playlists & Albums > Add Music...

Add the smart playlist


### Usage

From the directory with apple-watch-podcast-sync:

```
node index.js
```

It takes about a minute to do the tag updates and file copying. You should see the podcasts in your smart playlist now. 

After the podcasts show up in iTunes click: File > Library > Update iCloud Library

You should see the status in the top right show the mp3s are uploading. 

After that, check your iPhone to see if they're syncing to the playlist, and finally the Apple Watch app. 

now when your Apple Watch is charging the playlists will sync over!


### Known issues

Since these play as music files, all the benefits of podcasts don't work: no saved position, won't mark as listened in the podcast app, etc. 

Sometimes iTunes will mark a podcast as ineligible for iCloud Library. I suspect this has to do with the bitrate requirements for iCloud, and I'm considering adding a conversion option. 

You really should be careful using this unless you know enough to clean up the code. 
