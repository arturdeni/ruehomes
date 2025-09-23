// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Páginas que existen
import Home from "./pages/Home";
import Sell from "./pages/Sell";

// Estilos
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/components.css";

// Componente temporal para páginas que no existen
const ComingSoon = ({ pageName }) => (
  <div className="container py-20 text-center">
    <h1 className="text-4xl font-bold text-marron mb-4 font-primary">
      {pageName}
    </h1>
    <p className="text-marron-light mb-8 font-secondary">
      Página en construcción
    </p>
    <a href="/" className="btn btn-primary">
      Volver al inicio
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/propiedades"
            element={<ComingSoon pageName="Propiedades" />}
          />
          <Route
            path="/propiedad/:id"
            element={<ComingSoon pageName="Detalle de Propiedad" />}
          />
          <Route path="/vender" element={<Sell />} />
          <Route
            path="/tailored-services"
            element={<ComingSoon pageName="Servicios Premium" />}
          />
          <Route
            path="/la-agencia"
            element={<ComingSoon pageName="La Agencia" />}
          />
          <Route
            path="/contacto"
            element={<ComingSoon pageName="Contacto" />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="container py-20 text-center">
                <h1 className="text-4xl font-bold text-marron mb-4 font-primary">
                  404
                </h1>
                <p className="text-marron-light mb-8 font-secondary">
                  Página no encontrada
                </p>
                <a href="/" className="btn btn-primary">
                  Volver al inicio
                </a>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
