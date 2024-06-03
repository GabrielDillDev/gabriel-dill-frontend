import React, { useState } from 'react';
import styled from 'styled-components';
import Gif from '../images/candle.gif';
import Brasil from '../images/brasil.png';
import Usa from '../images/usa.png';
import Logo from '../images/logo.png';
import { useLanguage } from './LangContext'; 

const HeaderContainer = styled.header`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20vh;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${Gif});
        background-size: cover;
        opacity: 0.9;
        z-index: -1;
    }

    @media (max-width: 48rem) {
        flex-direction: column;
        align-items: flex-start;
        padding: 0.5rem;
        height: auto;
    }

    @media (min-width: 48rem) {
        height: 10vh;
    }
`;

const StyledFlagContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 1rem;

    @media (max-width: 48rem) {
        align-self: flex-end;
        position: absolute;
        top: 0;
        right: 1rem;
        margin: 1rem 0;
    }
`;

const StyledFlag = styled.img`
    height: 2rem;
    margin-right: 0.5rem;

    @media (max-width: 48rem) {
        margin-right: 0.5rem;
    }
`;

const StyledLogo = styled.img`
    height: 8rem;
    border-radius: 1rem;
    margin: 1rem;

    @media (max-width: 48rem) {
        height: 3.5rem;
        align-self: flex-start;
        margin-left: 0;
        margin-top: 0;
    }

    @media (min-width: 48rem) {
        height: 4rem;
    }
`;

const LanguageText = styled.span`
    color: white;
    font-family: monospace;
`;

const Header = () => {
    const [flag, setFlag] = useState(Brasil);
    const { toggleLanguage } = useLanguage(); 

    const toggleFlag = () => {
        toggleLanguage();
        setFlag(flag === Brasil ? Usa : Brasil);
    };

    return (
        <HeaderContainer>
            <StyledLogo src={Logo} alt="Logo" />
            <StyledFlagContainer onClick={toggleFlag}>
                <StyledFlag src={flag} alt="Bandeira" />
                <LanguageText>{flag === Brasil ? 'BR' : 'USA'}</LanguageText>
            </StyledFlagContainer>
        </HeaderContainer>
    );
};

export default Header;
