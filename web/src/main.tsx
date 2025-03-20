import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { APIsProvider } from './api/provider';
import App from './App';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APIsProvider>
      <App />
    </APIsProvider>
  </StrictMode>,
);
