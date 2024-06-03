import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import instagramIcon from '../images/instagram.png';
import youtubeIcon from '../images/youtube.png';

const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background: linear-gradient(90deg, #0f0f0f, #1b1b1b, #272727, #333333, #3f3f3f, #333333, #272727, #1b1b1b, #0f0f0f);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const VideoFrame = styled.div`
    width: 80%;
    height: 80%;
    border-radius: 1.25rem;
    overflow: hidden;

    @media (max-width: 48rem) {
        height: 30rem;
    }
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px; 
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 1.25rem; 
`;

const IconLink = styled.a`
    margin: 0 10px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.2); 
    }
`;

const Icon = styled.img`
    width: 30px; 
    height: 30px;
`;

const Lancamento = () => {
    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_ROUTE_LANCAMENTO);
                const data = await response.json();
                const videoUrl = data.lancamento.videourl;
                const videoId = extractVideoId(videoUrl);
                setVideoId(videoId);
            } catch (error) {
                console.error('Erro ao obter a URL do vídeo:', error);
            }
        };

        fetchVideoUrl();
    }, []);

    const extractVideoId = (url) => {
        const regex = /[?&]([^=#]+)=([^&#]*)/g;
        let match;
        while ((match = regex.exec(url)) !== null) {
            if (match[1] === 'v') {
                return match[2];
            }
        }
        return null;
    };

    return (
        <VideoContainer id="lancamento">
            <IconContainer>
                <IconLink href="https://www.instagram.com/dillgabriel" target="_blank" rel="noopener noreferrer">
                    <Icon src={instagramIcon} alt="Instagram Icon" />
                </IconLink>
                <IconLink href="https://www.youtube.com/@FoolGang" target="_blank" rel="noopener noreferrer">
                    <Icon src={youtubeIcon} alt="YouTube Icon" />
                </IconLink>
            </IconContainer>
            {videoId && (
                <VideoFrame>
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Embedded YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </VideoFrame>
            )}
        </VideoContainer>
    );
};

export default Lancamento;
