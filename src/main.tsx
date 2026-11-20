import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {detectLite} from './lib/perf';
import './index.css';

if (detectLite()) document.documentElement.classList.add('lite');

createRoot(document.getElementById('root')!).render(<App />);
