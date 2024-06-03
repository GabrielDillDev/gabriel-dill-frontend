import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from './LangContext';

const FooterContainer = styled.footer`
    background-color: #222;
    color: #fff;
    padding: 2rem 0;
    text-align: center;
`;

const FooterText = styled.p`
    font-size: 1rem;
`;

const FooterLink = styled.a`
    color: #fff;
    text-decoration: underline;

    &:hover {
        color: #ff0;
    }
`;

const Footer = () => {
    const { translate } = useLanguage();
    const [translatedText, setTranslatedText] = useState({
        direitosReservados: 'Todos os direitos reservados.',
        entreEmContato: 'Entre em contato:',
        entreVia: 'Entre em contato via',
        sigaRedes: 'Siga nas redes sociais:',
        cliqueAqui: 'Clique aqui',
    });

    useEffect(() => {
        const translateTexts = async () => {
            const translated = {
                direitosReservados: await translate('Todos os direitos reservados.'),
                entreEmContato: await translate('Entre em contato:'),
                entreVia: await translate('Entre em contato via'),
                sigaRedes: await translate('Siga nas redes sociais:'),
                cliqueAqui: await translate('Clique aqui'),
            };
            setTranslatedText(translated);
        };

        translateTexts();
    }, [translate]);

    return (
        <FooterContainer>
            <FooterText>
                &copy; 2024 Gabriel Dill. {translatedText.direitosReservados}
            </FooterText>
            <FooterText>
                {translatedText.entreEmContato} {' '}
                <FooterLink href="mailto:gabrieldill73@gmail.com">gabrieldill73@gmail.com</FooterLink>
            </FooterText>
            <FooterText>
                {translatedText.entreVia} WhatsApp: {' '}
                <FooterLink href="https://wa.me/5554981053581" target="_blank" rel="noopener noreferrer">{translatedText.cliqueAqui}</FooterLink>
            </FooterText>
            <FooterText>
                {translatedText.sigaRedes} {' '}
                <FooterLink href="https://www.youtube.com/@FoolGang" target="_blank" rel="noopener noreferrer">YouTube</FooterLink>{' '}
                <FooterLink href="https://www.instagram.com/dillgabriel/" target="_blank" rel="noopener noreferrer">Instagram</FooterLink>{' '}
            </FooterText>
        </FooterContainer>
    );
};

export default Footer;
