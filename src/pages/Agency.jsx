// src/pages/Agency.jsx
import AgencyHero from "../components/agency/AgencyHero";
import AgencyMarcosJan from "../components/agency/AgencyMarcosJan";
import AgencyAboutUs from "../components/agency/AgencyAboutUs";

const Agency = () => {
  return (
    <div className="agency-page">
      <AgencyHero />
      <AgencyMarcosJan />
      <AgencyAboutUs />

      <style jsx>{`
        .agency-page {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Agency;
