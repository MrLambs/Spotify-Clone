# Spotify-Clone
Attempting to implement and improve upon Spotify features/functionality

### [Live Site](https://lambify-clone.netlify.app/)

[![lambify.gif](https://giphy.com/gifs/xLveavR9EPcYjqi4pz)](https://giphy.com/gifs/xLveavR9EPcYjqi4pz)

## Introduction
This was a challenge to see if I could implement Spotify authentication as well as a lyrics look up to improve upon the basic features already included with the Spotify Web Player.

## Setup
- Navigate to /server and add a .env file

```
REDIRECT_URI=https://localhost:3000/
CLIENT_ID=(YOUR_SPOTIFY_CLIENT_ID)
CLIENT_SECRET=(YOUR_SPOTIFY_CLIENT_SECRET)
PORT=5000
```
- Navigate to /client/components/useAuth
- Replace URL with 'localhost:5000'
- Navigate to /client/components/Dashboard
- Replace URL with 'localhost:5000'
- Run ```npm i && npm start```
