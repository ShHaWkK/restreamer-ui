import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import '@fontsource/dosis';
import '@fontsource/roboto';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';
import RestreamerUI from './RestreamerUI';

<<<<<<< HEAD
const defaultAddress = process.env.REACT_APP_DEFAULT_CORE_ADDRESS;
let address = window.location.protocol + '//' + window.location.host;

if (typeof defaultAddress === 'string' && defaultAddress.length > 0) {
        address = defaultAddress;
} else if (window.location.pathname.endsWith('/ui/')) {
        address += window.location.pathname.replace(/ui\/$/, '');
=======
// Détermine l'adresse par défaut à partir de la variable d'environnement
// fournie au build/au conteneur, avec repli sur l'origine actuelle
let address = process.env.REACT_APP_DEFAULT_CORE_ADDRESS || (window.location.protocol + '//' + window.location.host);
if (!address) {
  address = window.location.protocol + '//' + window.location.host;
}

// Si l'application est servie depuis /ui/, on enlève le suffixe pour cibler la racine Core
if (window.location.pathname.endsWith('/ui/')) {
  address += window.location.pathname.replace(/ui\/$/, '');
>>>>>>> origin/reastreamer-uiV2
}

const urlParams = new URLSearchParams(window.location.search.substring(1));
if (urlParams.has('address') === true) {
<<<<<<< HEAD
        address = urlParams.get('address');
=======
  // Le paramètre d'URL (si présent) reste prioritaire
  address = urlParams.get('address');
>>>>>>> origin/reastreamer-uiV2
}

createRoot(document.getElementById('root')).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RestreamerUI address={address} />
    </ThemeProvider>
  </StyledEngineProvider>
);
