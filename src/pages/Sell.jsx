// src/pages/Sell.jsx
import SellHero from "../components/sell/SellHero";
import SellingSection from "../components/sell/SellingSection";

const Sell = () => {
  return (
    <div className="sell-page">
      <SellHero />
      <SellingSection />
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
