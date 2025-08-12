import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Forcaster from './pages/Forcaster.jsx';
import Navbar from './components/Navbar.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Premium from './pages/Premium.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forcaster" element={<Forcaster />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/premium' element={<Premium />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;