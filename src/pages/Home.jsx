// src/pages/Home.jsx - Versión refactorizada con componentes
import Hero from "../components/home/Hero";
import VentaSection from "../components/home/VentaSection";
import TailoredSection from "../components/home/TailoredSection";
import ValoresSection from "../components/home/ValoresSection";
import InstagramSection from "../components/home/InstagramSection";

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <VentaSection />
      <TailoredSection />
      <ValoresSection />
      <InstagramSection />

      <style jsx>{`
        .home-page {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Home;
