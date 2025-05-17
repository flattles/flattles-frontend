import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import PlayerSelect from './PlayerSelect';
import PlayerHUD from './PlayerHUD';
import './App.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PlayerSelect />} />
      <Route path="/hud" element={<PlayerHUD />} />
    </Routes>
  </BrowserRouter>
);
