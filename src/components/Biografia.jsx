import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BackgroundBio from '../images/backgroundbio.jpg';
import { useLanguage } from './LangContext';

const Container = styled.div`
    background: linear-gradient(90deg, #0a0a0a, #161616, #222222, #2e2e2e, #3a3a3a, #2e2e2e, #222222, #161616, #0a0a0a);
    display: flex;
    justify-content: center;
`;

const ContainerImg = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    width: 100vw;
    height: auto;
    background-image: url(${BackgroundBio});
    background-size: auto 100%;
    background-position: center;
    background-repeat: repeat-x;
    text-align: center;
    font-family: monospace;
    color: #fff;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
    }

    @media (max-width: 768px) {
        max-width: 100vw;
        height: auto;
    }
`;

const BiografiaText = styled.div`
    position: relative;
    z-index: 1;
    padding: 2rem;
    font-size: 1.2rem;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 1rem;
    max-width: 40vw;
    color: #fff;

    @media (max-width: 768px) {
        font-size: 0.9rem;
        max-width: 90vw;
    }

    p {
        margin-bottom: 1.5rem;
    }
`;

const Contato = styled.div`
    margin-top: 2rem; 
    line-height: 1.5;
    text-align: left; 
`;

const Biografia = () => {
    const [paragrafos, setParagrafos] = useState([]);
    const [contato, setContato] = useState('');
    const { translate } = useLanguage();

    useEffect(() => {
        const fetchBiografia = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_ROUTE_BIO);
                const data = await response.json();
                const paragrafosBiografia = data.biografia.split('\n\n').map(async (paragrafo) => {
                    return await translate(paragrafo);
                });
                const traduzido = await Promise.all(paragrafosBiografia);
                setParagrafos(traduzido);
                setContato(await translate(data.contato));
            } catch (error) {
                console.error('Erro ao obter a biografia:', error);
            }
        };

        fetchBiografia();
    }, [translate]);

    return (
        <Container>
            <ContainerImg id="biografia">
                <BiografiaText>
                    {paragrafos.map((paragrafo, index) => (
                        <p key={index}>{paragrafo}</p>
                    ))}
                </BiografiaText>
                <Contato>
                    <p>{contato}</p>
                </Contato>
            </ContainerImg>
        </Container>
    );
};

export default Biografia;
