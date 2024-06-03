import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const GalleryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    background: linear-gradient(90deg, #0a0a0a, #161616, #222222, #2e2e2e, #3a3a3a, #2e2e2e, #222222, #161616, #0a0a0a);
    padding: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f0f0f0; 
    padding-top: 100%; 
`;

const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_ROUTE_IMAGES);
            setImages(response.data.images);
        } catch (error) {
            console.error('Erro ao buscar imagens:', error);
        }
    };

    return (
        <GalleryContainer id="galeria">
            {images.map((image, index) => (
                <ImageWrapper key={index}>
                    <Image src={image.imageUrl} alt={`Imagem ${index + 1}`} />
                </ImageWrapper>
            ))}
        </GalleryContainer>
    );
};

export default Gallery;
