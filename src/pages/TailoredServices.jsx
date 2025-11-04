// src/pages/TailoredServices.jsx
import TailoredHero from "../components/tailored-services/TailoredHero";
import TailoredMain from "../components/tailored-services/TailoredMain";
import TailoredContact from "../components/tailored-services/TailoredContact";

const TailoredServices = () => {
  return (
    <div className="tailored-services-page">
      <TailoredHero />
      <TailoredMain />
      <TailoredContact />

      <style jsx>{`
        .tailored-services-page {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default TailoredServices;
