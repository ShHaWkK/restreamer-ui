import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import '@fontsource/dosis';
import '@fontsource/roboto';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';
import RestreamerUI from './RestreamerUI';

const defaultAddress = process.env.REACT_APP_DEFAULT_CORE_ADDRESS;
const origin = window.location.origin;
const hasDefault = typeof defaultAddress === 'string' && defaultAddress.length > 0;
let address = hasDefault ? defaultAddress : origin;

if (!hasDefault && window.location.pathname.endsWith('/ui/')) {
  address += window.location.pathname.replace(/ui\/$/, '');
}

const urlParams = new URLSearchParams(window.location.search.substring(1));
if (urlParams.has('address') === true) {
  address = urlParams.get('address') || address;
}

createRoot(document.getElementById('root')).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RestreamerUI address={address} />
    </ThemeProvider>
  </StyledEngineProvider>
);
