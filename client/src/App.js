import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage'
import RendezVous from './pages/RendezVous'
import AdminSystem from './pages/private/AdminSystem'
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>    
      
      <Header/>

      <Routes>

        <Route exact path="/" element={<HomePage/>} />

        <Route exact path='/rendez-vous' element={<RendezVous/>} />

        <Route exact path='/admin/rendez-vous' element={<AdminSystem/>} />

      </Routes>

      <Footer/>

    </BrowserRouter>
  );
}

export default App;
