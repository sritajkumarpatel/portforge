import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import config from './config.json';
import './index.css';

// The Editorial style is deliberately calm/text-first — force reduced motion for it
// regardless of the visitor's OS setting, on top of always respecting prefers-reduced-motion.
const reducedMotion = config.theme?.visualStyle === 'editorial' ? 'always' : 'user';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion={reducedMotion}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MotionConfig>
  </React.StrictMode>,
);
