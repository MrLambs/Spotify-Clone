import React from 'react'
import { Container } from 'react-bootstrap'
import SpotifyIcon from '../icons/spotify.png'

const BASE_URL = "https://accounts.spotify.com/authorize"
const CLIENT_ID = "6bb70ab259f9466f8a822f2af4a97349"
const REDIRECT_URI = 'https://lambify-clone.netlify.app/'

const AUTH_URL = `${ BASE_URL }?client_id=${ CLIENT_ID }&response_type=code&redirect_uri=${ REDIRECT_URI }&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <a className='btn btn-success btn-lg' href={AUTH_URL}><img src={SpotifyIcon} alt="spotify" style={{ float: 'left', height: '30px' }} />&nbsp;Login with Spotify&nbsp;</a>
        </Container>
    )
}
