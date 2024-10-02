// import { Banner } from "../components/banner";
// import { Card } from "../components/card";
import { lazy } from "react";

const LazyBanner = lazy(() => import("@/pages/home/components/banner/banner"));
const LazyCard = lazy(() => import("@/pages/home/components/card/Card"));
const HomePage = () => {
  return (
    <div>
      <LazyBanner></LazyBanner>
      <LazyCard></LazyCard>
    </div>
  );
};

export default HomePage;
