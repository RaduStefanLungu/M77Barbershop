import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage'
import RendezVous from './pages/RendezVous'
import AdminSystem from './pages/private/AdminSystem'
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>    
      
      <AuthProvider>

        <Header/>

        <Routes>

          <Route exact path="/" element={<HomePage/>} />

          <Route exact path='/rendez-vous' element={<RendezVous/>} />

          <Route exact path='/admin/rendez-vous' element={
            <PrivateRoute>
              <AdminSystem/>
            </PrivateRoute>
          } />

          <Route exact path='/admin/login' element={<Login/>} />

        </Routes>

        <Footer/>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
