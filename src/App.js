import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Soluciones from './components/Soluciones';
import Calculadora from './components/CalculadoraIntegral';
import Planes from './components/Planes';
import Testimonios from './components/Testimonios';
import FAQ from './components/FAQ';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard"; 



function LandingPage() {
  return (
    <div className="">
      <Navbar />
      <div className="container">
        <div className='pt-5'>
          <section id='home'>
            <Hero />
          </section>
        </div>
        <section id='servicios'>
          <Servicios />
        </section>
        <section id='soluciones'>
          <Soluciones />
        </section>
        <section id='demo-calculadora' className='py-5 bg-light'>
          <div className='container'>
            <Calculadora />
          </div>
        </section>
        <section id='planes'>
          <Planes />
        </section>
        <section id='testimonios'>
          <Testimonios />
        </section>
        <section id='faq'>
          <FAQ />
        </section>
        <section id='contacto'>
          <Contacto />
        </section>
      </div>
      <section id='footer'>
        <Footer />
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing normal */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard AdminLTE para la evaluación 3 */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


