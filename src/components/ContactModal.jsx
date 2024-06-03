import React from 'react';
import styled from 'styled-components';
import gmailIcon from '../images/gmail.png';
import whatsappIcon from '../images/whatsapp.png';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: linear-gradient(90deg, #0a0a0a, #161616, #222222, #2e2e2e, #3a3a3a, #2e2e2e, #222222, #161616, #0a0a0a);
    padding: 3rem;
    border-radius: 0.5rem;
    color: #ccc;
    font-family: monospace;
    position: relative;
    font-size: 1.2rem;
    line-height: 2rem;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    color: #ccc;
    font-size: 1.5rem;
    cursor: pointer;
`;

const Link = styled.a`
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;

    &:hover {
        color: #ff1a1a;
    }

    img {
        width: 30px; 
        margin-right: 10px; 
    }
`;

const ContactModal = ({ onClose }) => {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>X</CloseButton>
                <p>
                    <Link href="mailto:gabrieldill73@gmail.com">
                        <img src={gmailIcon} alt="Gmail Icon" />
                        gabrieldill73@gmail.com
                    </Link>
                </p>
                <p>
                    <Link href="https://wa.me/54981053581" target="_blank" rel="noopener noreferrer">
                        <img src={whatsappIcon} alt="WhatsApp Icon" />
                        (54) 98105-3581
                    </Link>
                </p>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ContactModal;
