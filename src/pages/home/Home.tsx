import HeroBanner from "./heroBanner/HeroBanner";
import Trendig from "./trending/Trendig";
import Popular from "./popular/Popular";
import TopRated from "./TopRated/TopRated";
import "./home.scss";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trendig />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
