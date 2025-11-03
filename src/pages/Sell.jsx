// src/pages/Sell.jsx
import SellHero from "../components/sell/SellHero";
import SellingSection from "../components/sell/SellingSection";
import SellMetrics from "../components/sell/SellMetrics";
import SellAppraisal from "../components/sell/SellAppraisal";

const Sell = () => {
  return (
    <div className="sell-page">
      <SellHero />
      <SellingSection />
      <SellMetrics />
      <SellAppraisal />
      {/* Aquí irán más bloques que desarrollaremos luego */}

      <style jsx>{`
        .sell-page {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Sell;
