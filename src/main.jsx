import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Stars from './Stars';

function papilloteBackground() {
  const root = createRoot(document.getElementById('back'));

  return new Promise((res, rej) => {
    root.render(
      <StrictMode>
        <Stars callback={res} />
      </StrictMode>,
    );
  });
}

window.papilloteBackground = papilloteBackground;
