import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContactModal from './ContactModal.jsx';
import { useLanguage } from './LangContext';

const MenuContainer = styled.nav`
    background: linear-gradient(90deg, #0a0a0a, #161616, #222222, #2e2e2e, #3a3a3a, #2e2e2e, #222222, #161616, #0a0a0a);
    padding: 1rem;
    display: flex;
    justify-content: space-around;
`;

const MenuItem = styled.div`
    color: #FFFFFF;
    cursor: pointer;
    font-size: 1.2rem;
    transition: color 0.3s;

    @media (max-width: 48rem) {
        font-size: 1rem;
    }

    &:hover {
        color: #ff1a1a;
    }
`;

const Menu = () => {
    const [showModal, setShowModal] = useState(false);
    const { translate } = useLanguage();

    const [menuItems, setMenuItems] = useState({
        lancamento: 'Lançamento',
        biografia: 'Biografia',
        galeria: 'Galeria',
        agenda: 'Agenda',
        contato: 'Contato',
    });

    useEffect(() => {
        const translateMenuItems = async () => {
            setMenuItems({
                lancamento: await translate('Lançamento'),
                biografia: await translate('Biografia'),
                galeria: await translate('Galeria'),
                agenda: await translate('Eventos'),
                contato: await translate('Contato'),
            });
        };
        translateMenuItems();
    }, [translate]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const scrollToSection = (sectionId) => {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <MenuContainer>
                <MenuItem onClick={() => scrollToSection('lancamento')}>{menuItems.lancamento}</MenuItem>
                <MenuItem onClick={() => scrollToSection('biografia')}>{menuItems.biografia}</MenuItem>
                <MenuItem onClick={() => scrollToSection('galeria')}>{menuItems.galeria}</MenuItem>
                <MenuItem onClick={() => scrollToSection('agenda')}>{menuItems.agenda}</MenuItem>
                <MenuItem onClick={toggleModal}>{menuItems.contato}</MenuItem>
            </MenuContainer>
            <hr style={{ border: '0.0625rem solid #CCCCCC' }} />
            {showModal && <ContactModal onClose={toggleModal} />}
        </>
    );
};

export default Menu;
