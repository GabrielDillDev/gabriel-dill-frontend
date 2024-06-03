import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Gif from '../images/candle.gif';
import { useLanguage } from './LangContext';

const BackgroundContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    background: url(${Gif});
    background-size: cover;
    font-family: monospace;
    opacity: 0.8; 
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #000000, #000000);
    opacity: 0.8; 
    z-index: -1;
`;

const AgendaContainer = styled.div`
    color: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 60rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 1; 
`;

const Title = styled.h2`
    color: #fff;
    text-align: center;
    font-size: 3rem;
    margin-bottom: 2rem;
`;

const Event = styled.div`
    border-left: 4px solid #fff;
    padding: 1rem;
    margin-bottom: 1rem;
`;

const EventTitle = styled.h3`
    color: #fff;
    font-size: 2rem;
    margin-bottom: 0.5rem;
`;

const EventSubtitle = styled.p`
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

const EventDate = styled.p`
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

const Agenda = () => {
    const [events, setEvents] = useState([]);
    const [translatedTitle, setTranslatedTitle] = useState('');
    const [loading, setLoading] = useState(true); 
    const { translate } = useLanguage(); 
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_ROUTE_AGENDA);
                const eventsData = response.data.events;

                const dataLabel = await translate('Horário');
                const translatedEvents = await Promise.all(
                    eventsData.map(async (event) => {
                        const titulo = await translate(event.titulo);
                        const descricao = await translate(event.descricao);
                        const enderecoTraduzido = await translate('Endereço');
                        return { 
                            ...event, 
                            titulo, 
                            descricao, 
                            enderecoTraduzido,
                            data_evento_traduzida: dataLabel + ': ' + event.data_evento
                        };
                    })
                );

                setEvents(translatedEvents);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        };

        const fetchTitle = async () => {
            const translated = await translate('Eventos');
            setTranslatedTitle(translated);
        };

        const fetchData = async () => {
            await Promise.all([fetchEvents(), fetchTitle()]);
            setLoading(false);
        };

        fetchData();
    }, [translate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <BackgroundContainer>
            <Overlay />
            <AgendaContainer id="agenda">
                <Title>{translatedTitle}</Title>
                {events.map(event => (
                    <Event key={event.id}>
                        <EventTitle>{event.titulo}</EventTitle>
                        <EventSubtitle>{event.descricao}</EventSubtitle>
                        <EventDate>{event.data_evento_traduzida}</EventDate>
                        <EventDate>{event.enderecoTraduzido + ': ' + event.endereco}</EventDate>
                    </Event>
                ))}
            </AgendaContainer>
        </BackgroundContainer>
    );
};

export default Agenda;
