// src/pages/Agency.jsx
import AgencyHero from "../components/agency/AgencyHero";
import AgencyAboutUs from "../components/agency/AgencyAboutUs";
import AgencyClosing from "../components/agency/AgencyClosing";

const Agency = () => {
  return (
    <div className="agency-page">
      <AgencyHero />
      <AgencyAboutUs />
      <AgencyClosing />

      <style jsx>{`
        .agency-page {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Agency;
