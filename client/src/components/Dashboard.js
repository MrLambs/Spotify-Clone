import React, { useState, useEffect } from 'react'
import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'

import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientId: "6bb70ab259f9466f8a822f2af4a97349"
})
export default function Dashboard({ code }) {

    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [selectedTrack, setSelectedTrack] = useState()
    const [lyrics, setLyrics] = useState('')

    const chooseTrack = (track) => {
        setSelectedTrack(track)
        setSearch('')
        setLyrics('')
    }

    useEffect(() => {
        if (!selectedTrack) return

        axios.get('https://lambify.herokuapp.com/lyrics', {
            params: {
                track: selectedTrack.title,
                artist: selectedTrack.artist
            }
        })
            .then(res => {
                setLyrics(res.data.lyrics)
            })
    }, [selectedTrack])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        console.log(search)
        if (!search) return setSearchResults([])
        if (!accessToken) return
        let cancel = false

        spotifyApi
            .searchTracks(search)
            .then(res => {
                if (cancel) return
                setSearchResults(res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                }))
            })

        return () => cancel = true
    }, [search, accessToken])

    return (
        <Container className="d-flex flex-column py-2" style={{ height: '100vh' }}>
            <Form.Control
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
                {searchResults.map(track => (
                    <TrackSearchResult
                        track={track}
                        key={track.uri}
                        chooseTrack={chooseTrack}
                    />
                ))}
                {searchResults.length === 0 && (
                    <div className="text-center" style={{ whiteSpace: 'pre' }}>
                        {lyrics}
                    </div>
                )}
            </div>
            <div>
                <Player
                    accessToken={accessToken}
                    trackUri={selectedTrack?.uri}
                />
            </div>
        </Container>
    )
}
