import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import Menu from './components/Menu';
import Lancamento from './components/Lancamento';
import Biografia from './components/Biografia';
import Galeria from './components/Galeria';
import Agenda from './components/Agenda';
import Footer from './components/Footer';
import { LanguageProvider } from './components/LangContext';

function App() {
  return (
    <LanguageProvider>
      <GlobalStyle/>
      <Header/>
      <Menu/>
      <Lancamento/>
      <Biografia/>
      <Galeria/>
      <Agenda/>
      <Footer/>
    </LanguageProvider>
  )
}

export default App;
