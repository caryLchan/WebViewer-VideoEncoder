## Getting Started

This library abstracts the complex command-line usage of ffmpeg. In order to be able to use this module, make sure you have ffmpeg installed on your system (including all necessary encoding libraries like libmp3lame or libx264).  Instructions below.

### Install `home brew` for Mac

Paste this in Mac/Linux command window: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`<br />
Visit https://brew.sh/ for more details on homebrew

### Install `ffmpeg`

Paste this in Mac/Linux command window: `brew install ffmpeg`<br />
Visit https://ffmpeg.org/ for more details on ffmpeg

### After downloading or cloning this repo, install `node_modules`:

From the directory folder of this app in the Mac/Linux window, run: `npm install` to install all dependencies<br />

### Setup .env file:
Create a `.env` file with the key `PGDATA="SecretKey"`.
This will connect you to our PostgreSQL database.  Please email me if you do not have access.

### To boot up the server:

From the directory folder of this app in the Mac/Linux window, run: `npm run dev`

### To boot up the client:

From the directory folder of this app in the Mac/Linux window, run: `npm start`

### Usage

After running `npm run dev` to boot up the server and `npm start` to boot up the client, the web viewer should be have been launched on your browser from your `localhost:8080`.  There should be two demo videos `Big Buck Bunny` and `Iceland Waterfall`.  Each button will lead to the Video Player (defaulted to 480p quality) and a dropdown menu with options from: `4k, 1080p, 480p, 240p`.

### Upload Script

If you would like to "upload" a file (it actually won't upload it), however, it will encode it and save the video files into the public folder in the following formats: `4k, 1080p, 480p, 240p`.  It will also save an entry to the PostgreSQL DB for future viewing.

After the encoding is complete (takes awhile, especially because of the 4k video file), a button will be available to select the "uploaded" video.

***The file path to the video must be an absolute path in order for this APP to find, encode, and save the files for future viewing.  Inputting the title is also required!


Thanks and enjoy!