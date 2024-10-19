import { Banner } from "../main-home-page/components/banner";
import { Card } from "../main-home-page/components/card";

// import { lazy } from "react";
// const LazyBanner = lazy(() => import("@/pages/home/components/banner/banner"));
// const LazyCard = lazy(() => import("@/pages/home/components/card/Card"));
const HomePage = () => {
  return (
    <div>
      <Banner />
      <Card />
    </div>
  );
};

export default HomePage;
