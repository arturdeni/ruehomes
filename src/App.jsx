// src/App.jsx
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import WhatsAppButton from "./components/common/WhatsAppButton";

// Páginas que existen. Se cargan bajo demanda para que cada ruta solo
// descargue su propio código en vez del de toda la web.
const Home = lazy(() => import("./pages/Home"));
const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetailPage = lazy(() => import("./pages/PropertyDetailPage"));
const Sell = lazy(() => import("./pages/Sell"));
const TailoredServices = lazy(() => import("./pages/TailoredServices"));
const Agency = lazy(() => import("./pages/Agency"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// Estilos
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/components.css";

// Ocupa el alto del viewport mientras llega el código de la página,
// para que el footer no salte al aparecer el contenido
const PageFallback = () => <div style={{ minHeight: "100vh" }} />;

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
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <ScrollToTopButton />
      <WhatsAppButton />
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<Properties />} />
            <Route path="/propiedad/:id" element={<PropertyDetailPage />} />
            <Route path="/vender" element={<Sell />} />
            <Route path="/tailored-services" element={<TailoredServices />} />
            <Route path="/la-agencia" element={<Agency />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/politica-privacidad" element={<PrivacyPolicy />} />

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
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
