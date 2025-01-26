import { BrowserRouter, Routes, Route } from 'react-router'
import PlayerSelect from './PlayerSelect'
import Hexgrid from './Hexgrid'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayerSelect />} />
        <Route path="/hexgrid" element={<Hexgrid />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
