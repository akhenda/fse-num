import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { APIsProvider } from './api/provider';
import { Toaster } from './components/ui/sonner';
import App from './App';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APIsProvider>
      <App />
      <Toaster position="top-right" />
    </APIsProvider>
  </StrictMode>,
);
