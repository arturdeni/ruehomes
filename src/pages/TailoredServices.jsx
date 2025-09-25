// src/pages/TailoredServices.jsx
import TailoredMain from "../components/tailored-services/TailoredMain";
import TailoredContact from "../components/tailored-services/TailoredContact";

const TailoredServices = () => {
  return (
    <div className="tailored-services-page">
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
